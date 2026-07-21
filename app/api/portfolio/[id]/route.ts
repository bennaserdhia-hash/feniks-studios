import { revalidatePath } from "next/cache";
import { updateVideo, deleteVideo, StorageReadOnlyError } from "@/lib/portfolio";

function readOnly(err: unknown) {
  return err instanceof StorageReadOnlyError
    ? Response.json({ error: err.message }, { status: 503 })
    : null;
}

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;

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

  if (title !== undefined && !title.trim()) {
    return Response.json({ error: "Le titre ne peut pas être vide." }, { status: 400 });
  }

  let updated;
  try {
    updated = await updateVideo(id, {
      ...(title !== undefined && { title: title.trim() }),
      ...(category !== undefined && { category: category.trim() }),
      ...(image !== undefined && { image: image.trim() }),
      ...(youtubeId !== undefined && { youtubeId: youtubeId.trim() }),
      ...(description !== undefined && { description: description.trim() }),
    });
  } catch (err) {
    const ro = readOnly(err);
    if (ro) return ro;
    throw err;
  }

  if (!updated) {
    return Response.json({ error: "Vidéo introuvable." }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/realisations/[id]", "page");

  return Response.json(updated);
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  let ok: boolean;
  try {
    ok = await deleteVideo(id);
  } catch (err) {
    const ro = readOnly(err);
    if (ro) return ro;
    throw err;
  }

  if (!ok) {
    return Response.json({ error: "Vidéo introuvable." }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/realisations");
  revalidatePath("/realisations/[id]", "page");

  return Response.json({ ok: true });
}
