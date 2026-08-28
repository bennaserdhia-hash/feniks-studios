import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { slugify } from "@/lib/portfolio";
import { getServiceClient } from "@/lib/supabase";

const MAX_BYTES = 12 * 1024 * 1024; // 12 Mo
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const BUCKET = "portfolio";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Image trop lourde (max 12 Mo)." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return Response.json(
      { error: "Format non supporté (JPG, PNG, WebP ou AVIF)." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Normalise en JPEG 1280x692 (ratio des miniatures existantes)
  let output: Buffer;
  try {
    output = await sharp(buffer)
      .resize(1280, 692, { fit: "cover", position: "centre" })
      .jpeg({ quality: 86, mozjpeg: true })
      .toBuffer();
  } catch {
    return Response.json({ error: "Image illisible." }, { status: 400 });
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "miniature";
  const filename = `${base}-${Date.now()}.jpg`;

  // En prod : upload vers Supabase Storage (le FS de Vercel est en lecture seule).
  const supabase = getServiceClient();
  if (supabase) {
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, output, { contentType: "image/jpeg", upsert: false });
    if (error) {
      return Response.json(
        { error: `Upload impossible (stockage) : ${error.message}` },
        { status: 500 }
      );
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    // overlay: true → photo brute, le cadre or + logo sont redessinés côté site.
    return Response.json({ url: data.publicUrl, overlay: true }, { status: 201 });
  }

  // Repli local (développement sans Supabase configuré).
  const dir = path.join(process.cwd(), "public", "portfolio");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), output);
  return Response.json({ url: `/portfolio/${filename}`, overlay: true }, { status: 201 });
}
