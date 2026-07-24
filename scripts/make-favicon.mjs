import sharp from "sharp";
import path from "node:path";

const logo = path.join(process.cwd(), "public", "brand", "logo.png");

// 1) monogramme seul (on retire la bande "FENIKS STUDIOS")
const trimmed = await sharp(logo).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
const markH = Math.round(meta.height * 0.80);
const mark = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: meta.width, height: markH })
  .trim()
  .toBuffer();

// 2) rond blanc + monogramme doré, coins transparents
const SIZE = 512;
const R = SIZE / 2;
const circle = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
     <circle cx="${R}" cy="${R}" r="${R}" fill="#ffffff"/>
   </svg>`
);
const inner = Math.round(SIZE * 0.74);
const markResized = await sharp(mark)
  .resize({ width: inner, height: inner, fit: "inside" })
  .toBuffer();

const icon = await sharp(circle)
  .composite([{ input: markResized, gravity: "centre" }])
  .png()
  .toBuffer();

await sharp(icon).resize(512, 512).png().toFile(path.join(process.cwd(), "app", "icon.png"));
await sharp(icon).resize(180, 180).png().toFile(path.join(process.cwd(), "app", "apple-icon.png"));
console.log("favicon : rond blanc + monogramme doré -> app/icon.png + apple-icon.png");
