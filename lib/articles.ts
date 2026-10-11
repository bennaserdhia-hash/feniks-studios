import articles from "@/data/articles.json";
export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};
export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  category: string;
  cover: string;
  bodyImage: string;
  services: string[];
  sections: ArticleSection[];
  readingTime: string;
  updatedAt: string;
};
export const posts: Post[] = articles.map((article) => ({
  ...article,
  updatedAt: "2026-10-11",
  readingTime: `${Math.max(1, Math.ceil([article.excerpt, ...article.sections.flatMap((s) => [...s.paragraphs, ...(s.points ?? [])])].join(" ").split(/\s+/).length / 200))} min`,
}));
