/**
 * Sème (ou re-synchronise) la table Supabase `feniks_portfolio` à partir de
 * data/portfolio.json. Idempotent : un upsert par id, l'ordre du fichier
 * devient la position.
 *
 *   node scripts/seed-portfolio.mjs
 *
 * Nécessite SUPABASE_URL et SUPABASE_SECRET_KEY (lus depuis .env.local).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";

// Charge .env.local (simple, suffisant pour ce script).
async function loadEnv() {
  try {
    const raw = await readFile(path.join(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* pas de .env.local : on se contente de process.env */
  }
}

await loadEnv();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error(
    "❌ SUPABASE_URL et/ou SUPABASE_SECRET_KEY manquants (mets-les dans .env.local)."
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const videos = JSON.parse(
  await readFile(path.join(root, "data", "portfolio.json"), "utf8")
);

const rows = videos.map((v, i) => ({ id: v.id, position: i, data: v }));

const { error } = await supabase
  .from("feniks_portfolio")
  .upsert(rows, { onConflict: "id" });

if (error) {
  console.error("❌ Échec du seed :", error.message);
  process.exit(1);
}

console.log(`✅ ${rows.length} projets synchronisés dans feniks_portfolio.`);
