"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Observe tous les éléments `.reveal` et ajoute `.is-visible` quand ils
 * entrent dans le viewport. Gère aussi les éléments ajoutés APRÈS le montage
 * (ex. cartes affichées par un filtre) grâce à un MutationObserver — sinon
 * ces nouveaux éléments resteraient invisibles (opacité 0).
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));
    };

    observeAll(document);

    // Prend en charge les .reveal ajoutés dynamiquement (filtres, etc.)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList?.contains("reveal") && !el.classList.contains("is-visible")) {
            io.observe(el);
          }
          observeAll(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
