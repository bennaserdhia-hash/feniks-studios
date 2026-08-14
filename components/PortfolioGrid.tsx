"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import WorkCard from "./WorkCard";
import { Video } from "@/lib/portfolio";

// Espacement vertical entre cartes (équiv. gap-y-9 = 2.25rem)
const ROW_GAP = 36;

export default function PortfolioGrid({ works }: { works: Video[] }) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    works.forEach((w) => counts.set(w.category, (counts.get(w.category) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [works]);

  const [active, setActive] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = active ? works.filter((w) => w.category === active) : works;

  // Masonry : chaque cellule occupe autant de « micro-lignes » (1px) que sa
  // hauteur réelle → les cartes remontent et comblent le vide laissé par les
  // vignettes verticales, sans casser l'ordre.
  const relayout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cells = Array.from(grid.children) as HTMLElement[];
    const desktop = window.matchMedia("(min-width: 640px)").matches;

    // Reset (sert aussi de mesure). Sur mobile on s'arrête là : flux normal
    // avec gap-y, les 2 Shorts sont déjà côte à côte via col-span.
    grid.style.gridAutoRows = "";
    grid.style.rowGap = "";
    cells.forEach((c) => (c.style.gridRowEnd = ""));
    if (!desktop) return;

    // Hauteur naturelle d'une carte horizontale = 1 ligne.
    let unit = 0;
    for (const cell of cells) {
      const card = cell.firstElementChild as HTMLElement | null;
      if (card && !card.hasAttribute("data-vertical")) {
        unit = card.getBoundingClientRect().height;
        break;
      }
    }
    if (!unit) return;

    // Lignes de hauteur fixe : une verticale occupe 2 lignes → rangées
    // parfaitement alignées, aucun décalage cumulé en descendant.
    grid.style.gridAutoRows = `${unit}px`;
    grid.style.rowGap = `${ROW_GAP}px`;
    for (const cell of cells) {
      const vertical = cell.firstElementChild?.hasAttribute("data-vertical");
      cell.style.gridRowEnd = vertical ? "span 2" : "span 1";
    }
  }, []);

  useLayoutEffect(() => {
    relayout();
  }, [relayout, shown.length, active]);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(relayout);
    };
    window.addEventListener("resize", onResize);
    // recalcule quand les polices sont prêtes (la hauteur du texte peut bouger)
    document.fonts?.ready.then(relayout).catch(() => {});
    // et après le chargement des images (au cas où une hauteur change)
    const grid = gridRef.current;
    const imgs = grid ? Array.from(grid.querySelectorAll("img")) : [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", relayout, { once: true });
    });
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [relayout, shown.length]);

  const select = (cat: string | null) => {
    setActive(cat);
    requestAnimationFrame(() => {
      const y = topRef.current?.getBoundingClientRect().top ?? 0;
      if (y < 0) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-10">
        <FilterChip label={`Tout (${works.length})`} on={!active} onClick={() => select(null)} />
        {categories.map(([cat, n]) => (
          <FilterChip
            key={cat}
            label={`${cat} (${n})`}
            on={active === cat}
            onClick={() => select(cat)}
          />
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9 items-stretch"
      >
        {shown.map((w) => (
          // Sur mobile : cartes horizontales en pleine largeur (col-span-2),
          // vignettes verticales à mi-largeur → les deux Shorts côte à côte.
          // Dès sm : toutes les cartes occupent une colonne.
          <div key={w.id} className={w.vertical ? "col-span-1" : "col-span-2 sm:col-span-1"}>
            <WorkCard work={w} instant={active !== null} fillVertical />
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-display font-semibold uppercase tracking-wide transition-colors ${
        on
          ? "bg-ink text-white border-ink"
          : "border-border text-muted hover:border-gold hover:text-gold-ink"
      }`}
    >
      {label}
    </button>
  );
}
