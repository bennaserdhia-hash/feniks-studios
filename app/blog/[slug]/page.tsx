import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { Section } from "@/components/Section";
import { IconArrow } from "@/components/Icons";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-10 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 120% at 50% -10%, rgba(222,178,103,0.14), transparent 55%)",
          }}
        />
        <div className="container-x max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors mb-8"
          >
            <IconArrow className="h-4 w-4 rotate-180" /> Retour au blog
          </Link>
          <div className="flex items-center gap-3 text-xs mb-5">
            <span className="text-gold uppercase tracking-widest font-display font-semibold">
              {post.category}
            </span>
            <span className="text-muted-2">•</span>
            <span className="text-muted-2">{post.readingTime} de lecture</span>
          </div>
          <h1 className="font-display font-extrabold tracking-tight leading-[1.08] text-[clamp(2rem,5vw,3.25rem)]">
            {post.title}
          </h1>
        </div>
      </section>

      <Section className="!pt-6">
        <div className="max-w-3xl mx-auto">
          <article className="prose-feniks space-y-6 text-muted leading-relaxed text-lg">
            <p className="text-foreground text-xl font-display">{post.excerpt}</p>
            <p>
              La vidéo n'est plus une option : c'est le format qui capte l'attention, crée de
              l'émotion et transforme la manière dont votre audience perçoit votre marque.
              Dans cet article, nous explorons les leviers concrets à activer.
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground pt-4">
              Un format qui capte l'attention
            </h2>
            <p>
              Les études le confirment : un message porté par la vidéo est retenu bien plus
              longtemps qu'un texte ou une image. Le mouvement, le son et le rythme créent une
              expérience immersive qui installe durablement votre message.
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground pt-4">
              De l'idée à la diffusion
            </h2>
            <p>
              La réussite d'un projet vidéo tient à la cohérence entre l'objectif marketing,
              le message et sa réalisation. C'est précisément le rôle d'un partenaire
              audiovisuel : traduire vos enjeux en un contenu qui performe.
            </p>
            <blockquote className="border-l-2 border-gold pl-6 italic text-foreground/90">
              « Entre expertise technique et créativité, il faut être force de proposition.
              Avec la bonne équipe, on fait mieux. »
            </blockquote>
            <p>
              Vous avez un projet en tête ? Parlons-en. Nous vous aiderons à définir le format
              le plus pertinent et à le produire avec exigence.
            </p>
          </article>

          <div className="card mt-12 p-8 text-center">
            <p className="eyebrow mb-3">Un projet vidéo ?</p>
            <h3 className="font-display text-2xl font-extrabold mb-5">
              Mettons votre histoire en images.
            </h3>
            <Link href="/contact" className="btn btn-gold">
              Demander un devis <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <h2 className="font-display text-2xl font-bold mb-8">À lire aussi</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card p-6 group"
            >
              <span className="text-gold text-xs uppercase tracking-widest font-display font-semibold">
                {p.category}
              </span>
              <h3 className="font-display font-bold mt-3 leading-snug group-hover:text-gold-light transition-colors">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
