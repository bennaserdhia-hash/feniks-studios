import { revalidatePath } from "next/cache";
import { getVideos, addVideo, StorageReadOnlyError } from "@/lib/portfolio";

export async function GET() {
  const videos = await getVideos();
  return Response.json(videos);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON invalide" }, { status: 400 });
  }

  const { title, category, image, youtubeId, description } = (body ?? {}) as Record<
    string,
    string | undefined
  >;

  if (!title?.trim()) {
    return Response.json({ error: "Le titre est obligatoire." }, { status: 400 });
  }
  if (!image?.trim()) {
    return Response.json({ error: "La miniature est obligatoire." }, { status: 400 });
  }

  let video;
  try {
    video = await addVideo({
      title: title.trim(),
      category: category?.trim() || "Vidéo",
      image: image.trim(),
      youtubeId: youtubeId?.trim() || "",
      description: description?.trim() || "",
      details: [],
    });
  } catch (err) {
    if (err instanceof StorageReadOnlyError) {
      return Response.json({ error: err.message }, { status: 503 });
    }
    throw err;
  }

  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/realisations/[id]", "page");

  return Response.json(video, { status: 201 });
}
