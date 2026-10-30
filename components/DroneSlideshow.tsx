"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { IconMapPin, IconPause, IconResume } from "./Icons";

type Slide = { image: string; alt: string; place: string; date: string };

const DURATION = 6500;
const FADE = 1400;

// Diaporama plein cadre d'ouverture. La barre de progression de la photo
// active pilote l'enchaînement (fin d'animation = photo suivante), ce qui
// garde la pause et le survol synchronisés sans minuterie.
export default function DroneSlideshow({
  slides,
  children,
}: {
  slides: Slide[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Le fondu enchaîné reste actif avec « réduire les animations » : seul le
  // recul de caméra (.drone-drift) est coupé, dans globals.css.
  const playing = !paused;
  const running = playing && !hovered;
  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const current = slides[index];

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Nos prises de vue aériennes"
      className="relative isolate mt-6 overflow-hidden bg-ink text-white h-[calc(100svh-10rem)] min-h-[580px] max-h-[920px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.image}
            aria-hidden={!active}
            className="absolute inset-0 -z-20 transition-opacity ease-out"
            style={{ opacity: active ? 1 : 0, transitionDuration: `${FADE}ms` }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={90}
              className={`object-cover ${active ? "drone-drift" : ""}`}
              style={
                active
                  ? {
                      animation: `drone-drift ${DURATION + FADE}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
                      animationPlayState: running ? "running" : "paused",
                    }
                  : undefined
              }
            />
          </div>
        );
      })}

      {/* Voile bas : le titre reste lisible sur le ciel comme sur la nuit */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />

      <div className="container-x relative flex h-full flex-col justify-end pb-8 md:pb-12">
        {children}

        <div className="mt-10 md:mt-14 flex flex-col-reverse gap-5 md:flex-row md:items-end md:justify-between">
          <p
            aria-live={playing ? "off" : "polite"}
            className="flex items-center gap-2 text-sm text-white/85"
          >
            <IconMapPin className="h-4 w-4 shrink-0 text-gold" />
            <span>
              {current.place}
              <span className="text-white/55"> · {current.date}</span>
            </span>
          </p>

          <div className="flex items-center gap-4">
            <ol className="flex flex-1 gap-1.5 md:flex-none">
              {slides.map((slide, i) => (
                <li key={slide.image} className="flex-1 md:flex-none">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Photo ${i + 1} sur ${slides.length} : ${slide.place}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group block w-full py-3 md:w-14"
                  >
                    <span className="relative block h-[2px] overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/45">
                      <span
                        className="absolute inset-0 origin-left bg-gold"
                        style={
                          i === index && playing
                            ? {
                                animation: `drone-progress ${DURATION}ms linear forwards`,
                                animationPlayState: running
                                  ? "running"
                                  : "paused",
                              }
                            : {
                                transform: `scaleX(${i < index || (i === index && !playing) ? 1 : 0})`,
                              }
                        }
                        onAnimationEnd={() => go(index + 1)}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={
                paused ? "Reprendre le diaporama" : "Mettre le diaporama en pause"
              }
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 text-white/85 transition-colors hover:border-gold hover:text-gold"
            >
              {paused ? (
                <IconResume className="h-4 w-4" />
              ) : (
                <IconPause className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
