import { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 120% at 50% -10%, rgba(222,178,103,0.14), transparent 55%)",
        }}
      />
      <div className="container-x">
        <p className="eyebrow reveal mb-5">{eyebrow}</p>
        <h1 className="reveal font-display font-extrabold tracking-tight leading-[1.02] text-[clamp(2.4rem,6vw,4.5rem)] max-w-4xl">
          {title}
        </h1>
        {intro && (
          <p className="reveal text-lg md:text-xl text-muted mt-6 max-w-2xl leading-relaxed">
            {intro}
          </p>
        )}
        <div className="gold-line mt-8 reveal" />
      </div>
    </section>
  );
}
