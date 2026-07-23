import sharp from "sharp";
import path from "node:path";

const logo = path.join(process.cwd(), "public", "brand", "logo.png");

// 1) rogner les marges transparentes du logo complet
const trimmed = await sharp(logo).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("logo rogné :", meta.width, "x", meta.height);

// 2) garder uniquement le monogramme (on retire la bande "FENIKS STUDIOS" en bas ~20%)
const markH = Math.round(meta.height * 0.80);
const mark = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: meta.width, height: markH })
  .trim()
  .toBuffer();
const mm = await sharp(mark).metadata();
console.log("monogramme :", mm.width, "x", mm.height);

// 3) composer sur un carré sombre (contraste dans l'onglet), avec marge
const SIZE = 512;
const inner = Math.round(SIZE * 0.84);
const markResized = await sharp(mark)
  .resize({ width: inner, height: inner, fit: "inside" })
  .toBuffer();

const icon = await sharp({
  create: {
    width: SIZE, height: SIZE, channels: 4,
    background: { r: 23, g: 21, b: 15, alpha: 1 }, // #17150f
  },
})
  .composite([{ input: markResized, gravity: "centre" }])
  .png()
  .toBuffer();

// app/icon.png = favicon auto (Next App Router) ; apple-icon.png pour iOS
await sharp(icon).resize(512, 512).png().toFile(path.join(process.cwd(), "app", "icon.png"));
await sharp(icon).resize(180, 180).png().toFile(path.join(process.cwd(), "app", "apple-icon.png"));
console.log("écrit : app/icon.png + app/apple-icon.png");
