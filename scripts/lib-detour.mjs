import sharp from "sharp";

const NEAR_WHITE = 238;
const INK = [23, 21, 15]; // #17150f — le noir chaud du site

/**
 * Détoure un logo pour l'afficher sur fond blanc.
 *
 * - `crop`      : { left, top, width, height } appliqué AVANT tout le reste
 * - `whiteToInk`: recolore en noir le blanc *restant après* détourage
 *                 (utile pour les logos pensés pour fond sombre, ex. HIRSCH Isolation).
 *                 À n'activer que si le logo n'a pas de blanc « utile » sur aplat
 *                 de couleur (sinon on casserait p.ex. la Tour Eiffel du PSG).
 *
 * Le fond blanc est retiré par propagation depuis les bords (flood fill), donc le
 * blanc à l'intérieur du logo est préservé.
 */
export async function detourer(input, { sharpOpts = {}, crop, whiteToInk = false } = {}) {
  let pipe = sharp(input, sharpOpts);
  if (crop) pipe = pipe.extract(crop);

  const pre = await pipe
    .resize({ height: 600, fit: "inside", withoutEnlargement: false })
    .ensureAlpha()
    .png()
    .toBuffer();

  const { data, info } = await sharp(pre).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  const at = (x, y) => (y * w + x) * c;
  const isNearWhite = (i) =>
    data[i] >= NEAR_WHITE && data[i + 1] >= NEAR_WHITE && data[i + 2] >= NEAR_WHITE;
  const isTransparent = (i) => data[i + 3] < 20;

  const corners = [at(0, 0), at(w - 1, 0), at(0, h - 1), at(w - 1, h - 1)];
  const alreadyTransparent = corners.every(isTransparent);

  if (!alreadyTransparent) {
    const visited = new Uint8Array(w * h);
    const stack = [];
    const push = (x, y) => {
      if (x < 0 || y < 0 || x >= w || y >= h) return;
      const p = y * w + x;
      if (visited[p]) return;
      const i = p * c;
      if (!isNearWhite(i) && !isTransparent(i)) return; // on bute sur le logo
      visited[p] = 1;
      stack.push(p);
    };

    for (let x = 0; x < w; x++) {
      push(x, 0);
      push(x, h - 1);
    }
    for (let y = 0; y < h; y++) {
      push(0, y);
      push(w - 1, y);
    }

    while (stack.length) {
      const p = stack.pop();
      data[p * c + 3] = 0;
      const x = p % w;
      const y = (p / w) | 0;
      push(x + 1, y);
      push(x - 1, y);
      push(x, y + 1);
      push(x, y - 1);
    }
  }

  if (whiteToInk) {
    for (let i = 0; i < data.length; i += c) {
      if (data[i + 3] > 40 && isNearWhite(i)) {
        data[i] = INK[0];
        data[i + 1] = INK[1];
        data[i + 2] = INK[2];
      }
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels: c } })
    .png()
    .trim({ threshold: 8 })
    .resize({ height: 200, fit: "inside" });
}
