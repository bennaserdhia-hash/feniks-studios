/**
 * Cadre or + monogramme KF + libellé de catégorie, superposé aux miniatures.
 *
 * Les anciennes réalisations (récupérées de l'ancien site) ont cette déco
 * DÉJÀ INCRUSTÉE dans le fichier image. Les miniatures ajoutées via l'admin,
 * elles, sont des photos brutes : on redessine donc la déco en surcouche pour
 * qu'elles ressemblent aux autres. Le rendu n'est activé que si `work.overlay`
 * est vrai (posé par l'uploader) — voir lib/portfolio.ts.
 *
 * Purement décoratif : `pointer-events-none` pour ne pas gêner le survol/clic.
 * Positions en pourcentage → cohérent quel que soit le format (16:9, 2:3…).
 */
export default function ThumbFrame({ category }: { category?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* cadre or — couleur en style inline : la classe `border-gold/70` n'est
          pas toujours générée par le JIT Tailwind, alors que `var(--gold)` est
          bien émis dans :root. */}
      <div
        className="absolute inset-[3.5%] border"
        style={{ borderColor: "var(--gold)", opacity: 0.75 }}
      />

      {/* monogramme KF — recoloré en blanc via filtre (garde la transparence) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/monogram.png"
        alt=""
        aria-hidden
        className="absolute left-[5.5%] top-[6%] w-[5.5%] min-w-5 max-w-6"
        style={{ filter: "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
      />

      {/* libellé catégorie */}
      {category && (
        <div className="absolute left-[6%] bottom-[7%]">
          <span className="block h-px w-7 bg-gold mb-1.5" />
          <span className="font-display font-semibold uppercase tracking-[0.18em] text-white text-[9px] sm:text-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
            {category}
          </span>
        </div>
      )}
    </div>
  );
}
