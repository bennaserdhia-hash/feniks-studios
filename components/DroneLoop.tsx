"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconPause, IconResume } from "./Icons";

type Props = {
  src: string;
  mobileSrc: string;
  poster: string;
  label: string;
  caption: string;
  className?: string;
};

// Boucle vidéo d'ambiance, muette. Chargée à l'approche de l'écran, mise en
// pause hors champ ; le bouton garde la main au visiteur.
export default function DroneLoop({
  src,
  mobileSrc,
  poster,
  label,
  caption,
  className = "",
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData || !host.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          if (!pausedRef.current) void player.current?.play().catch(() => {});
        } else player.current?.pause();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    if (next) player.current?.pause();
    else void player.current?.play().catch(() => {});
  }

  return (
    <div
      ref={host}
      className={`relative isolate overflow-hidden bg-ink ${className}`}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 680px"
        className="-z-20 object-cover"
      />
      {loaded && (
        <video
          ref={player}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-label={label}
        >
          <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="flex h-full items-end justify-between gap-4 p-4 md:p-5">
        <p className="text-xs md:text-sm text-white/85 leading-snug">{caption}</p>
        {loaded && (
          <button
            type="button"
            onClick={toggle}
            aria-label={paused ? "Reprendre la vidéo" : "Mettre la vidéo en pause"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 text-white/85 transition-colors hover:border-gold hover:text-gold"
          >
            {paused ? (
              <IconResume className="h-4 w-4" />
            ) : (
              <IconPause className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
