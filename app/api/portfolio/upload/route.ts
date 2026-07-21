import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { slugify } from "@/lib/portfolio";

const MAX_BYTES = 12 * 1024 * 1024; // 12 Mo
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

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

  // Normalise en JPEG 1280x692 (ratio des miniatures existantes ~768x415)
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
  const dir = path.join(process.cwd(), "public", "portfolio");
  await fs.mkdir(dir, { recursive: true });

  let name = `${base}.jpg`;
  let n = 2;
  while (
    await fs
      .access(path.join(dir, name))
      .then(() => true)
      .catch(() => false)
  ) {
    name = `${base}-${n++}.jpg`;
  }

  await fs.writeFile(path.join(dir, name), output);

  return Response.json({ url: `/portfolio/${name}` }, { status: 201 });
}
