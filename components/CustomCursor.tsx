"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur signature Feniks : un anneau doré qui suit la souris avec un léger
 * retard, et un point doré en son centre. Identique partout, sans effet au survol.
 *
 * Ne s'active que sur pointeur fin (souris) et si l'utilisateur n'a pas demandé
 * à réduire les animations. Sinon : curseur système, rien ne change.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      // l'anneau rattrape le point en douceur
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const setOpacity = (value: string) => {
      if (dot.current) dot.current.style.opacity = value;
      if (ring.current) ring.current.style.opacity = value;
    };
    const onLeave = () => setOpacity("0");
    const onEnter = () => setOpacity("1");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fk-cursor-dot" aria-hidden="true" />
      <div ref={ring} className="fk-cursor-ring" aria-hidden="true" />
    </>
  );
}
