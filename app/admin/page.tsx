"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThumbFrame from "@/components/ThumbFrame";

type Video = {
  id: string;
  title: string;
  category: string;
  image: string;
  youtubeId?: string;
  vimeoId?: string;
  description?: string;
  overlay?: boolean;
};

type Draft = Omit<Video, "id"> & { id?: string };

const EMPTY: Draft = {
  title: "",
  category: "",
  image: "",
  youtubeId: "",
  description: "",
};

const CATEGORIES = [
  "Couverture d'événement",
  "Publicité",
  "Motion design",
  "Reportage",
  "Film d'entreprise",
  "Vidéo produit",
  "Timelapse & drone",
  "Vidéo de présentation",
  "Vidéo corporate",
  "Vidéo de formation",
  "Vidéo de sensibilisation",
  "Film sportif",
];

/** Accepte une URL YouTube complète ou un identifiant, renvoie l'identifiant. */
function parseYoutube(input: string): string {
  const s = input.trim();
  if (!s) return "";
  const m = s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(s) ? s : s;
}

export default function AdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    setVideos(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const flash = (kind: "ok" | "err", msg: string) => {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const save = async () => {
    if (!draft) return;
    if (!draft.title.trim()) return flash("err", "Le titre est obligatoire.");
    if (!draft.image.trim()) return flash("err", "Ajoute une miniature.");

    setSaving(true);
    const editing = Boolean(draft.id);
    const res = await fetch(
      editing ? `/api/portfolio/${draft.id}` : "/api/portfolio",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      }
    );
    setSaving(false);

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Erreur" }));
      return flash("err", error ?? "Erreur lors de l'enregistrement.");
    }
    setDraft(null);
    await load();
    flash("ok", editing ? "Vidéo modifiée." : "Vidéo ajoutée.");
  };

  const remove = async (v: Video) => {
    if (!confirm(`Supprimer « ${v.title} » ?\n\nCette action est définitive.`)) return;
    const res = await fetch(`/api/portfolio/${v.id}`, { method: "DELETE" });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Suppression impossible." }));
      return flash("err", error ?? "Suppression impossible.");
    }
    await load();
    flash("ok", "Vidéo supprimée.");
  };

  return (
    <div className="min-h-screen bg-surface/50">
      {/* Barre du haut */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-display font-black text-lg">Portfolio</span>
            <span className="text-sm text-muted">
              {loading ? "…" : `${videos.length} vidéo${videos.length > 1 ? "s" : ""}`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/realisations" className="text-sm text-muted hover:text-gold-ink">
              Voir le site ↗
            </Link>
            <button onClick={() => setDraft({ ...EMPTY })} className="btn btn-gold !py-3 !px-5">
              + Ajouter une vidéo
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-muted">Chargement…</p>
        ) : videos.length === 0 ? (
          <div className="card p-14 text-center">
            <p className="font-display font-bold text-xl mb-2">Aucune vidéo</p>
            <p className="text-muted mb-6">Ajoute ta première réalisation.</p>
            <button onClick={() => setDraft({ ...EMPTY })} className="btn btn-gold">
              + Ajouter une vidéo
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <div key={v.id} className="card overflow-hidden group">
                <div className="relative aspect-video bg-surface-2">
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {v.overlay && <ThumbFrame category={v.category} />}
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-widest text-gold-ink font-display font-semibold">
                    {v.category}
                  </p>
                  <h3 className="font-display font-bold leading-tight mt-1">{v.title}</h3>
                  <p className="text-sm text-muted line-clamp-2 mt-1">
                    {v.description || <span className="italic text-muted-2">Pas de description</span>}
                  </p>
                  <p className="text-xs mt-2">
                    {v.youtubeId ? (
                      <span className="text-gold-ink">▶ YouTube · {v.youtubeId}</span>
                    ) : v.vimeoId ? (
                      <span className="text-gold-ink">▶ Vimeo · {v.vimeoId}</span>
                    ) : (
                      <span className="text-muted-2">Aucune vidéo liée</span>
                    )}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setDraft({ ...v })}
                      className="flex-1 text-sm font-display font-semibold py-2 rounded-lg border border-border hover:border-gold hover:text-gold-ink transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => remove(v)}
                      className="px-3 text-sm font-display font-semibold py-2 rounded-lg border border-border text-muted hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                      aria-label={`Supprimer ${v.title}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {draft && (
        <VideoForm
          draft={draft}
          setDraft={setDraft}
          onSave={save}
          saving={saving}
          categories={CATEGORIES}
          onError={(m) => flash("err", m)}
        />
      )}

      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm font-display font-semibold shadow-lg ${
            toast.kind === "ok" ? "bg-ink text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ---------------- Formulaire (modale) ---------------- */

function VideoForm({
  draft,
  setDraft,
  onSave,
  saving,
  categories,
  onError,
}: {
  draft: Draft;
  setDraft: (d: Draft | null) => void;
  onSave: () => void;
  saving: boolean;
  categories: string[];
  onError: (m: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/portfolio/upload", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Upload impossible" }));
      return onError(error ?? "Upload impossible.");
    }
    const { url, overlay } = await res.json();
    set({ image: url, overlay: Boolean(overlay) });
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={() => !saving && setDraft(null)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-black text-lg">
            {draft.id ? "Modifier la vidéo" : "Nouvelle vidéo"}
          </h2>
          <button
            onClick={() => setDraft(null)}
            className="text-muted hover:text-foreground text-2xl leading-none"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Miniature */}
          <div>
            <label className="block text-sm font-display font-semibold mb-2">
              Miniature <span className="text-gold-ink">*</span>
            </label>

            {draft.image ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border mb-3">
                <Image src={draft.image} alt="Aperçu" fill sizes="500px" className="object-cover" />
                {draft.overlay && <ThumbFrame category={draft.category} />}
                <button
                  onClick={() => set({ image: "" })}
                  className="absolute top-2 right-2 z-20 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold hover:bg-white"
                >
                  Changer
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-gold hover:bg-gold/5 transition-colors grid place-items-center text-muted mb-3"
              >
                {uploading ? (
                  "Envoi en cours…"
                ) : (
                  <span className="text-center px-4">
                    <span className="block text-2xl mb-1">＋</span>
                    <span className="text-sm">Choisir une image</span>
                    <span className="block text-xs text-muted-2 mt-1">
                      JPG, PNG ou WebP — recadrée automatiquement
                    </span>
                  </span>
                )}
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
                e.target.value = "";
              }}
            />
          </div>

          <Field
            label="Titre"
            required
            value={draft.title}
            onChange={(v) => set({ title: v })}
            placeholder="ex. KFC Foot 5 Cup - Le Five"
          />

          <div>
            <label className="block text-sm font-display font-semibold mb-2">Catégorie</label>
            <input
              list="categories"
              value={draft.category}
              onChange={(e) => set({ category: e.target.value })}
              placeholder="ex. Film d'entreprise"
              className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-gold bg-white"
            />
            <datalist id="categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-display font-semibold mb-2">
              Lien YouTube
            </label>
            <input
              value={draft.youtubeId ?? ""}
              onChange={(e) => set({ youtubeId: e.target.value })}
              onBlur={(e) => set({ youtubeId: parseYoutube(e.target.value) })}
              placeholder="Colle le lien YouTube complet"
              className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-gold bg-white"
            />
            <p className="text-xs text-muted-2 mt-1.5">
              Colle l&apos;URL entière — l&apos;identifiant est extrait automatiquement.
            </p>
          </div>

          <div>
            <label className="block text-sm font-display font-semibold mb-2">Description</label>
            <textarea
              value={draft.description ?? ""}
              onChange={(e) => set({ description: e.target.value })}
              rows={4}
              placeholder="En quelques phrases : le contexte du projet et l'objectif."
              className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-gold bg-white resize-y"
            />
          </div>
        </div>

        <div className="px-6 py-5 border-t border-border flex gap-3 justify-end">
          <button
            onClick={() => setDraft(null)}
            disabled={saving}
            className="px-5 py-3 rounded-full text-sm font-display font-semibold text-muted hover:text-foreground"
          >
            Annuler
          </button>
          <button onClick={onSave} disabled={saving || uploading} className="btn btn-gold !py-3">
            {saving ? "Enregistrement…" : draft.id ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-display font-semibold mb-2">
        {label} {required && <span className="text-gold-ink">*</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-gold bg-white"
      />
    </div>
  );
}
