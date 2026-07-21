/**
 * Stockage des réalisations (portfolio).
 *
 * Aujourd'hui : fichier JSON local (data/portfolio.json) — parfait en local.
 * En production (Vercel), le système de fichiers est en lecture seule :
 * il faudra brancher ce module sur une base (Supabase) ou un stockage objet.
 * Toute la logique passe par ce fichier, donc la migration ne touchera que lui.
 */

import fs from "node:fs/promises";
import path from "node:path";

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

export async function getVideos(): Promise<Video[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Video[]) : [];
  } catch {
    return [];
  }
}

/** Erreur explicite quand le stockage n'est pas inscriptible (hébergement en lecture seule). */
export class StorageReadOnlyError extends Error {
  constructor() {
    super(
      "Le stockage est en lecture seule sur cet hébergement : les modifications " +
        "ne peuvent pas être enregistrées. Il faut brancher une base de données " +
        "(voir README, section « Dashboard en production »)."
    );
    this.name = "StorageReadOnlyError";
  }
}

async function saveVideos(videos: Video[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(videos, null, 2) + "\n", "utf8");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    // EROFS/EACCES : disque en lecture seule (Vercel, conteneurs figés…)
    if (code === "EROFS" || code === "EACCES" || code === "EPERM") {
      throw new StorageReadOnlyError();
    }
    throw err;
  }
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
  const videos = await getVideos();
  let id = slugify(input.title);
  let n = 2;
  while (videos.some((v) => v.id === id)) id = `${slugify(input.title)}-${n++}`;

  const video: Video = { id, ...input };
  videos.unshift(video); // les nouveautés en premier
  await saveVideos(videos);
  return video;
}

export async function updateVideo(
  id: string,
  patch: Partial<Omit<Video, "id">>
): Promise<Video | null> {
  const videos = await getVideos();
  const i = videos.findIndex((v) => v.id === id);
  if (i === -1) return null;
  videos[i] = { ...videos[i], ...patch };
  await saveVideos(videos);
  return videos[i];
}

export async function deleteVideo(id: string): Promise<boolean> {
  const videos = await getVideos();
  const next = videos.filter((v) => v.id !== id);
  if (next.length === videos.length) return false;
  await saveVideos(next);
  return true;
}

/** Réordonne selon une liste d'ids. */
export async function reorderVideos(ids: string[]): Promise<Video[]> {
  const videos = await getVideos();
  const byId = new Map(videos.map((v) => [v.id, v]));
  const ordered = ids.map((i) => byId.get(i)).filter((v): v is Video => Boolean(v));
  // on garde en fin de liste ceux qui n'étaient pas dans ids
  for (const v of videos) if (!ids.includes(v.id)) ordered.push(v);
  await saveVideos(ordered);
  return ordered;
}
