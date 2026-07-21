"use client";

import { usePathname } from "next/navigation";

/** Masque le header/footer du site public sur les routes d'administration. */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
