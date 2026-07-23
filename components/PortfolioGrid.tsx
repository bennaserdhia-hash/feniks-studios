"use client";

import { useMemo, useRef, useState } from "react";
import WorkCard from "./WorkCard";
import { Video } from "@/lib/portfolio";

export default function PortfolioGrid({ works }: { works: Video[] }) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    works.forEach((w) => counts.set(w.category, (counts.get(w.category) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [works]);

  const [active, setActive] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const shown = active ? works.filter((w) => w.category === active) : works;

  const select = (cat: string | null) => {
    setActive(cat);
    // ramène en haut de la grille pour toujours voir les résultats
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-9">
        {shown.map((w) => (
          <WorkCard key={w.id} work={w} instant={active !== null} />
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
