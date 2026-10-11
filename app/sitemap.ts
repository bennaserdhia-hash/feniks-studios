import type { MetadataRoute } from "next";
import { posts } from "@/lib/content";
import { servicePages } from "@/lib/services";
import { getPublicVideos } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/seo";
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const videos = await getPublicVideos();
  const paths = [
    "/",
    "/agence",
    "/prestations",
    "/realisations",
    "/ia",
    "/tarifs",
    "/blog",
    "/contact",
    ...servicePages.map((s) => `/prestations/${s.slug}`),
    ...videos.map((v) => `/realisations/${v.id}`),
  ];
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path) })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
    })),
  ];
}
