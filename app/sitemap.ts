import type { MetadataRoute } from "next";
import { posts } from "@/lib/content";

const BASE = "https://feniksstudios.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/agence", "/realisations", "/blog", "/contact"].map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  const blog = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blog];
}
