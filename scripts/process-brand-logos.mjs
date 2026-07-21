import { mkdirSync } from "node:fs";
import path from "node:path";
import { detourer } from "./lib-detour.mjs";

const IN = path.join(process.cwd(), "public", "brandsrc");
const OUT = path.join(process.cwd(), "public", "logos");
mkdirSync(OUT, { recursive: true });

const jobs = [
  { src: "kfc.svg", out: "kfc", opts: { sharpOpts: { density: 400 } } },
  { src: "psg.png", out: "psg" },
  { src: "aljazeera.svg", out: "aljazeera", opts: { sharpOpts: { density: 400 } } },
  { src: "ajplus.svg", out: "ajplus", opts: { sharpOpts: { density: 400 } } },
  { src: "sochaux.svg", out: "sochaux", opts: { sharpOpts: { density: 400 } } },
  // Version dorée sur fond transparent (le carré doré d'origine est retiré)
  { src: "sandaya-gold.svg", out: "sandaya", opts: { sharpOpts: { density: 400 } } },
  {
    // Logo pensé pour fond sombre : on isole le mot-symbole (sans le rond
    // "HIRSCH GRUPPE") puis on recolore "Isolation" (blanc) en noir.
    src: "hirsch.png",
    out: "hirsch",
    opts: {
      crop: { left: 0, top: 0, width: 2880, height: 709 },
      whiteToInk: true,
    },
  },
  { src: "burgeraddict.png", out: "burger-addict" },
];

for (const { src, out, opts } of jobs) {
  try {
    const pipeline = await detourer(path.join(IN, src), opts);
    await pipeline.toFile(path.join(OUT, `${out}.png`));
    console.log(`✓ ${out}`);
  } catch (e) {
    console.log(`✗ ${out} — ${e.message}`);
  }
}
console.log("Terminé →", OUT);
