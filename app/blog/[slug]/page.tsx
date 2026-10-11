import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { servicePages } from "@/lib/services";
import { pageMetadata, absoluteUrl, ORGANIZATION_ID } from "@/lib/seo";
import { Section } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import PostCard from "@/components/PostCard";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);
  if (!post) return { title: "Article introuvable", robots: { index: false } };
  const metadata = pageMetadata(
    `/blog/${slug}`,
    post.seoTitle,
    post.excerpt,
    post.cover,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      modifiedTime: post.updatedAt,
    },
  };
}
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);
  if (!post) notFound();
  const related = posts
    .filter(
      (p) =>
        p.slug !== slug && p.services.some((s) => post.services.includes(s)),
    )
    .slice(0, 3);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: [absoluteUrl(post.cover)],
          dateModified: post.updatedAt,
          author: {
            "@type": "Organization",
            name: "Feniks Studios",
            url: absoluteUrl("/agence"),
          },
          publisher: { "@id": ORGANIZATION_ID },
          mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
          inLanguage: "fr-FR",
        }}
      />
      <Section className="!pt-12 !pb-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.25rem)] tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-muted">
            Par l’équipe Feniks Studios · {post.readingTime} de lecture · Mis à
            jour le <time dateTime={post.updatedAt}>11 octobre 2026</time>
          </p>
          <p className="text-xl text-foreground leading-relaxed mt-7">
            {post.excerpt}
          </p>
        </div>
      </Section>
      <Section className="!pt-0">
        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-video overflow-hidden rounded-xl mb-10">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          <nav
            aria-label="Sommaire de l’article"
            className="border-y border-border py-6 mb-10"
          >
            <p className="font-display font-semibold mb-3">Dans cet article</p>
            <ol className="space-y-2 list-decimal pl-5 text-muted">
              {post.sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${i + 1}`}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="prose-feniks text-lg text-muted leading-relaxed max-w-[70ch]">
            {post.sections.map((section, i) => (
              <section
                key={section.heading}
                id={`section-${i + 1}`}
                className="mb-12 scroll-mt-28"
              >
                <h2 className="font-display text-2xl md:text-3xl text-foreground font-bold leading-tight mb-5">
                  {section.heading}
                </h2>
                {section.paragraphs.map((text) => (
                  <p key={text} className="mb-5">
                    {text}
                  </p>
                ))}
                {section.points && (
                  <ul className="list-disc pl-6 space-y-3">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-2xl mb-5">
              Les prestations liées à ce sujet
            </h2>
            <ul className="space-y-3">
              {servicePages
                .filter((s) => post.services.includes(s.slug))
                .map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/prestations/${service.slug}`}
                      className="text-gold-ink underline underline-offset-4"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link href="/contact" className="btn btn-gold mt-7">
              Préparer votre projet vidéo
            </Link>
          </div>
        </div>
      </Section>
      <Section className="border-t border-border bg-surface/40">
        <h2 className="font-display text-2xl font-bold mb-8">
          Pour poursuivre votre lecture
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
