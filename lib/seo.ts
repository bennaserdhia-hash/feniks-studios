import type { Metadata } from "next";

export const SITE_URL = "https://www.feniksstudios.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  image = "/brand/social-share.png",
): Metadata {
  const fullTitle = `${title} | Feniks Studios`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: "Feniks Studios",
      locale: "fr_FR",
      type: "website",
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function conciseDescription(value: string, fallback: string) {
  const clean = value
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return fallback;
  if (clean.length <= 160) return clean;
  const sentence = clean.slice(0, 160).match(/^(.+[.!?])(?:\s|$)/)?.[1];
  return sentence || `${clean.slice(0, 156).replace(/\s+\S*$/, "")}…`;
}
