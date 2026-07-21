import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
        {title}
      </h2>
      <div className={`gold-line mt-6 ${center ? "mx-auto" : ""}`} />
      {intro && <p className="text-muted mt-6 text-lg leading-relaxed">{intro}</p>}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
