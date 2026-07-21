import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const IN = path.join(process.cwd(), "public", "clients");
const OUT = path.join(process.cwd(), "public", "logos");
mkdirSync(OUT, { recursive: true });

// Logos retenus pour le bandeau "Ils nous font confiance"
const files = [
  "soccer-park", "agence-pgo", "edf", "ge-digital", "claridge",
  "splf", "mfr", "isc", "empreinte", "umma-2",
  "monde-proprete", "pharmacie", "habibis",
];

const WHITE = 236; // seuil : pixels plus clairs que ça => transparents

for (const name of files) {
  try {
    const src = path.join(IN, `${name}.png`);
    // 1) enlever le fond blanc -> transparent (manipulation brute des pixels)
    const { data, info } = await sharp(src)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r >= WHITE && g >= WHITE && b >= WHITE) {
        data[i + 3] = 0; // alpha 0
      }
    }
    // 2) rogner les marges transparentes puis normaliser la hauteur
    const out = path.join(OUT, `${name}.png`);
    await sharp(data, { raw: { width, height, channels } })
      .png()
      .trim({ threshold: 8 })
      .resize({ height: 200, fit: "inside", withoutEnlargement: false })
      .toFile(out);
    console.log(`✓ ${name}`);
  } catch (e) {
    console.log(`✗ ${name} — ${e.message}`);
  }
}
console.log("Terminé →", OUT);
