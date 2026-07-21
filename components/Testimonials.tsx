"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/content";
import { IconArrow } from "./Icons";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (dir: number) =>
    setI((v) => (v + dir + testimonials.length) % testimonials.length);

  return (
    <div className="reveal grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
      {/* Photo */}
      <div className="relative h-36 w-36 md:h-52 md:w-52 shrink-0 mx-auto md:mx-0">
        <div className="absolute -inset-2 rounded-full border border-gold/25" />
        {t.photo && (
          <Image
            src={t.photo}
            alt={t.name}
            fill
            sizes="208px"
            className="rounded-full object-cover grayscale-[0.2]"
          />
        )}
      </div>

      {/* Quote */}
      <div>
        <div className="font-display text-6xl leading-none text-gold/30 mb-2" aria-hidden>
          &ldquo;
        </div>
        <blockquote className="text-xl md:text-[1.7rem] font-display font-medium leading-snug text-foreground/95">
          {t.quote}
        </blockquote>
        <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-display font-bold text-lg">{t.name}</p>
            <p className="text-sm text-gold">{t.role}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Précédent"
              className="h-11 w-11 rounded-full border border-border grid place-items-center text-muted hover:text-gold hover:border-gold/50 transition-colors"
            >
              <IconArrow className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Suivant"
              className="h-11 w-11 rounded-full border border-border grid place-items-center text-muted hover:text-gold hover:border-gold/50 transition-colors"
            >
              <IconArrow className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-1.5 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Témoignage ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${
                idx === i ? "w-8 bg-gold" : "w-4 bg-border hover:bg-muted-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
