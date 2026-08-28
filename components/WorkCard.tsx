import Image from "next/image";
import Link from "next/link";
import { Video } from "@/lib/portfolio";
import { IconPlay } from "./Icons";
import ThumbFrame from "./ThumbFrame";

export default function WorkCard({
  work,
  large = false,
  instant = false,
  fillVertical = false,
}: {
  work: Video;
  large?: boolean;
  instant?: boolean;
  /** Dans la grille masonry : sur ≥sm la vignette verticale remplit sa cellule
   *  (2 lignes) pour des rangées alignées. Ailleurs elle garde son ratio 2:3. */
  fillVertical?: boolean;
}) {
  const hasVideo = Boolean(work.youtubeId || work.vimeoId);

  // NB : chaque classe `aspect-[…]` doit apparaître comme chaîne littérale
  // délimitée — sinon le scanner de Tailwind v4 ne génère pas la règle
  // (ex. `aspect-[2/3]` collé à un ${…} de template literal → non détecté,
  // vignette verticale sans hauteur = carte blanche sur l'accueil).
  const imgBox = work.vertical
    ? fillVertical
      ? "aspect-[2/3] sm:aspect-auto sm:flex-1 sm:min-h-0"
      : "aspect-[2/3]"
    : large
    ? "aspect-[16/9]"
    : "aspect-video";

  return (
    <article
      data-vertical={work.vertical ? "" : undefined}
      className={`${instant ? "group" : "reveal group"} flex flex-col h-full`}
    >
      <Link href={`/realisations/${work.id}`} className="flex flex-1 flex-col min-h-0">
        <div className={`relative overflow-hidden rounded-xl border border-border ${imgBox}`}>
          <Image
            src={work.image}
            alt={`${work.title} — ${work.category}`}
            fill
            sizes={large ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {work.overlay && <ThumbFrame category={work.category} />}
          <div className="absolute inset-0 z-20 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-500 grid place-items-center">
            {hasVideo && (
              <span className="h-14 w-14 rounded-full bg-white/90 backdrop-blur grid place-items-center text-gold-ink opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 shadow-lg">
                <IconPlay className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 px-1">
          <p className="text-[11px] uppercase tracking-widest text-gold-ink font-display font-semibold">
            {work.category}
          </p>
          <h3
            className={`font-display font-bold leading-tight mt-1 group-hover:text-gold-ink transition-colors line-clamp-2 min-h-[2.5em] ${
              large ? "text-xl" : "text-base"
            }`}
          >
            {work.title}
          </h3>
          {/* Hauteur fixe (2 lignes) : cartes uniformes → colonnes alignées, pas de décalage */}
          <p className="text-muted text-sm mt-1.5 leading-relaxed line-clamp-2 min-h-[3.25em]">
            {work.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
