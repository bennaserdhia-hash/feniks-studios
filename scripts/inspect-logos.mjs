import sharp from "sharp";
import { readdirSync } from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "clients");
const files = readdirSync(dir).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));

for (const f of files) {
  try {
    const img = sharp(path.join(dir, f));
    const meta = await img.metadata();
    // sample the 4 corners (raw RGBA)
    const { data, info } = await img
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const px = (x, y) => {
      const i = (y * width + x) * channels;
      return [data[i], data[i + 1], data[i + 2], data[i + 3]];
    };
    const corners = [
      px(1, 1),
      px(width - 2, 1),
      px(1, height - 2),
      px(width - 2, height - 2),
    ];
    const avg = corners[0].map(
      (_, k) => Math.round(corners.reduce((s, c) => s + c[k], 0) / 4)
    );
    let kind;
    if (avg[3] < 20) kind = "TRANSPARENT";
    else if (avg[0] > 240 && avg[1] > 240 && avg[2] > 240) kind = "WHITE-bg";
    else kind = `COLOR-bg rgb(${avg[0]},${avg[1]},${avg[2]})`;
    console.log(
      `${f.padEnd(22)} ${String(meta.width)}x${meta.height} alpha=${meta.hasAlpha} corner→ ${kind}`
    );
  } catch (e) {
    console.log(`${f.padEnd(22)} ERROR ${e.message}`);
  }
}
