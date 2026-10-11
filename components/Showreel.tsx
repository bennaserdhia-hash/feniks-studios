"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconPlay } from "./Icons";

type Props = {
  src: string;
  fullSrc?: string;
  poster: string;
  title: string;
  className?: string;
  autoPlayOnDesktop?: boolean;
};
export default function Showreel({
  src,
  fullSrc,
  poster,
  title,
  className = "aspect-video",
  autoPlayOnDesktop = false,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [manual, setManual] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (
      !autoPlayOnDesktop ||
      !host.current ||
      !matchMedia(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setLoaded(true);
      else player.current?.pause();
    });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [autoPlayOnDesktop]);
  function playManually() {
    setManual(true);
    setLoaded(true);
  }
  return (
    <div
      ref={host}
      className={`relative overflow-hidden bg-surface-2 ${className}`}
    >
      <Image
        src={poster}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {loaded && (
        <video
          ref={player}
          key={manual ? "manual" : "preview"}
          className="absolute inset-0 h-full w-full object-cover"
          controls={manual}
          autoPlay
          muted={!manual}
          loop={!manual}
          playsInline
          preload="none"
          poster={poster}
          aria-label={title}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={manual && fullSrc ? fullSrc : src} type="video/mp4" />
          Votre navigateur ne peut pas lire cette vidéo.{" "}
          <a href={fullSrc || src}>Ouvrir le film</a>.
        </video>
      )}
      {!manual && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 bg-gradient-to-t from-black/60 to-transparent">
          <button
            type="button"
            onClick={playManually}
            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm"
          >
            <IconPlay className="h-4 w-4" /> Lire le showreel
          </button>
          {loaded && (
            <button
              type="button"
              className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-foreground"
              onClick={() => {
                if (player.current?.paused)
                  void player.current.play().catch(() => {});
                else player.current?.pause();
              }}
            >
              {playing ? "Pause" : "Reprendre"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
