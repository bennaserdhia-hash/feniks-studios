/**
 * Rature humaine : tracée à main levée, légèrement inclinée (elle remonte
 * vers la droite) et volontairement hésitante — micro-irrégularités,
 * épaisseur variable, petits débordements aux extrémités.
 *
 * Le SVG s'étire sur la largeur du mot ; les tracés sont pensés pour rester
 * naturels une fois étirés.
 */

export type StrikeVariant = "hesitante" | "inclinee" | "repassee" | "plume";

export function HandStrike({
  variant = "hesitante",
  className = "",
  tilt = -1.2,
}: {
  variant?: StrikeVariant;
  className?: string;
  /** inclinaison supplémentaire en degrés (négatif = remonte vers la droite) */
  tilt?: number;
}) {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      className={`pointer-events-none absolute left-[-4%] top-1/2 w-[108%] ${className}`}
      viewBox="0 0 100 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        height: "0.62em",
        overflow: "visible",
        transform: `translateY(-50%) rotate(${tilt}deg)`,
      }}
    >
      {/* Trait unique qui remonte, avec de petites hésitations */}
      {variant === "hesitante" && (
        <path
          d="M-1.5,11.9 C6,11.2 11,10.4 17,10.7 C24,11.1 29,9.6 36,9.4
             C43,9.2 47,10.1 54,9.2 C61,8.3 65,7.1 72,7.2
             C79,7.3 84,6.2 90,5.9 C94,5.7 98,5.2 101.5,4.6"
          strokeWidth={3.1}
          {...line}
        />
      )}

      {/* Même esprit, inclinaison plus marquée */}
      {variant === "inclinee" && (
        <path
          d="M-1.5,13.4 C7,12.4 13,11.9 20,11.2 C28,10.4 33,9.9 41,8.9
             C49,7.9 54,7.6 62,6.6 C70,5.6 75,5.2 83,4.2
             C89,3.5 95,3.0 101.5,2.3"
          strokeWidth={3.1}
          {...line}
        />
      )}

      {/* Repassée deux fois — le geste le plus « humain » */}
      {variant === "repassee" && (
        <>
          <path
            d="M-1.5,11.6 C6,10.9 12,10.2 19,10.4 C27,10.7 32,9.3 40,9.1
               C48,8.9 53,9.6 61,8.6 C69,7.6 74,6.8 82,6.6
               C89,6.4 95,5.6 101.5,4.9"
            strokeWidth={2.9}
            {...line}
          />
          <path
            d="M-0.5,12.9 C8,12.6 14,11.4 22,11.7 C30,12.0 35,10.4 43,10.3
               C51,10.2 55,11.0 63,9.9 C71,8.8 76,8.2 84,7.8
               C90,7.5 96,6.9 100.5,6.3"
            strokeWidth={2.1}
            opacity={0.62}
            {...line}
          />
        </>
      )}

      {/* Trait plein, épais au centre et affiné aux extrémités */}
      {variant === "plume" && (
        <path
          d="M-1.5,12.6
             C7,11.6 13,11.0 21,10.4 C29,9.8 34,9.6 42,8.8
             C50,8.0 56,7.4 64,6.6 C72,5.8 78,5.2 86,4.4
             C92,3.8 97,3.4 101.5,2.9
             L101.5,4.6 C97,5.1 92,5.6 86,6.3
             C78,7.2 72,7.8 64,8.6 C56,9.4 50,10.0 42,10.9
             C34,11.8 29,12.0 21,12.7 C13,13.4 7,13.9 -1.5,14.6 Z"
          fill="currentColor"
          stroke="none"
        />
      )}
    </svg>
  );
}

/** Mot rayé : <StruckWord variant="hesitante">filmons</StruckWord> */
export function StruckWord({
  children,
  variant = "hesitante",
  strikeClassName = "text-gold",
  tilt,
}: {
  children: React.ReactNode;
  variant?: StrikeVariant;
  strikeClassName?: string;
  tilt?: number;
}) {
  return (
    <span className={`relative inline-block ${strikeClassName}`}>
      {/* le mot reste en noir plein — seule la rature est dorée */}
      <span className="text-foreground">{children}</span>
      <HandStrike variant={variant} tilt={tilt} />
    </span>
  );
}
