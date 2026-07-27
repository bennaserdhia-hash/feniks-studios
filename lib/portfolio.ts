/**
 * Stockage des réalisations (portfolio).
 *
 * Source de vérité : table Supabase `feniks_portfolio` (voir lib/supabase.ts).
 * Repli : si Supabase n'est pas configuré (clé absente), on lit le fichier
 * data/portfolio.json en LECTURE SEULE — le site affiche donc toujours les
 * projets, même sans base. Les écritures, elles, exigent Supabase.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { getServiceClient, PORTFOLIO_TABLE } from "./supabase";

export type Video = {
  id: string;
  title: string;
  category: string;
  image: string;
  /** Identifiant YouTube (ex. "tTpOtJEhMIU") */
  youtubeId?: string;
  /** Identifiant Vimeo, pour les quelques projets hébergés là-bas */
  vimeoId?: string;
  /** Accroche affichée sous la vignette */
  description?: string;
  /** Paragraphes complémentaires (contexte, objectifs) */
  details?: string[];
  /** Libellé d'origine, plus précis que la catégorie regroupée */
  categoryLabel?: string;
  /** Ancien champ libre, conservé pour le dashboard */
  client?: string;
  videoUrl?: string;
};

/** URL de visionnage de la vidéo, ou null si le projet n'en a pas. */
export function watchUrl(v: Video): string | null {
  if (v.youtubeId) return `https://www.youtube.com/watch?v=${v.youtubeId}`;
  if (v.vimeoId) return `https://vimeo.com/${v.vimeoId}`;
  return v.videoUrl || null;
}

/** URL d'intégration (lecteur embarqué). */
export function embedUrl(v: Video): string | null {
  if (v.youtubeId) return `https://www.youtube-nocookie.com/embed/${v.youtubeId}`;
  if (v.vimeoId) return `https://player.vimeo.com/video/${v.vimeoId}`;
  return null;
}

const FILE = path.join(process.cwd(), "data", "portfolio.json");

/** Lecture du fichier JSON local (repli / seed). */
async function readFileVideos(): Promise<Video[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Video[]) : [];
  } catch {
    return [];
  }
}

/** Erreur explicite quand aucune base inscriptible n'est disponible. */
export class StorageReadOnlyError extends Error {
  constructor() {
    super(
      "Le stockage est en lecture seule : la base Supabase n'est pas configurée " +
        "(variables SUPABASE_URL / SUPABASE_SECRET_KEY). Les modifications ne " +
        "peuvent pas être enregistrées."
    );
    this.name = "StorageReadOnlyError";
  }
}

type Row = { id: string; position: number; data: Video };

export async function getVideos(): Promise<Video[]> {
  const supabase = getServiceClient();
  if (!supabase) return readFileVideos();

  const { data, error } = await supabase
    .from(PORTFOLIO_TABLE)
    .select("id, position, data")
    .order("position", { ascending: true });

  if (error) {
    console.error("[portfolio] lecture Supabase échouée, repli JSON:", error.message);
    return readFileVideos();
  }
  // Si la table est vide (pas encore semée), on retombe sur le JSON.
  if (!data || data.length === 0) return readFileVideos();

  return (data as Row[]).map((r) => ({ ...r.data, id: r.id }));
}

export function slugify(input: string): string {
  return (
    input
      .normalize("NFD")
      .replace(/\p{M}/gu, "") // retire les accents (é -> e)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "video"
  );
}

export async function addVideo(input: Omit<Video, "id">): Promise<Video> {
  const supabase = getServiceClient();
  if (!supabase) throw new StorageReadOnlyError();

  const existing = await getVideos();
  let id = slugify(input.title);
  let n = 2;
  while (existing.some((v) => v.id === id)) id = `${slugify(input.title)}-${n++}`;

  const video: Video = { id, ...input };
  // Nouveautés en tête : position inférieure au minimum actuel.
  const minPos = existing.length
    ? await getMinPosition(supabase)
    : 0;

  const { error } = await supabase
    .from(PORTFOLIO_TABLE)
    .insert({ id, position: minPos - 1, data: video });

  if (error) throw new Error(error.message);
  return video;
}

async function getMinPosition(
  supabase: NonNullable<ReturnType<typeof getServiceClient>>
): Promise<number> {
  const { data } = await supabase
    .from(PORTFOLIO_TABLE)
    .select("position")
    .order("position", { ascending: true })
    .limit(1);
  return data && data.length ? (data[0] as { position: number }).position : 0;
}

export async function updateVideo(
  id: string,
  patch: Partial<Omit<Video, "id">>
): Promise<Video | null> {
  const supabase = getServiceClient();
  if (!supabase) throw new StorageReadOnlyError();

  const { data: current, error: readErr } = await supabase
    .from(PORTFOLIO_TABLE)
    .select("data")
    .eq("id", id)
    .maybeSingle();
  if (readErr) throw new Error(readErr.message);
  if (!current) return null;

  const next: Video = { ...(current.data as Video), ...patch, id };
  const { error } = await supabase
    .from(PORTFOLIO_TABLE)
    .update({ data: next, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return next;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) throw new StorageReadOnlyError();

  const { error, count } = await supabase
    .from(PORTFOLIO_TABLE)
    .delete({ count: "exact" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
}

/** Réordonne selon une liste d'ids. */
export async function reorderVideos(ids: string[]): Promise<Video[]> {
  const supabase = getServiceClient();
  if (!supabase) throw new StorageReadOnlyError();

  // Position = index dans la liste fournie.
  await Promise.all(
    ids.map((id, i) =>
      supabase.from(PORTFOLIO_TABLE).update({ position: i }).eq("id", id)
    )
  );
  return getVideos();
}
