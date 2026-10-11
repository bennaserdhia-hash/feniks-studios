import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/content";

export const metadata = pageMetadata(
  "/blog",
  "Conseils en vidéo d’entreprise",
  "Conseils pour préparer un film d’entreprise, un motion design ou une vidéo pour les réseaux sociaux. Explorez les formats, la création et la diffusion vidéo.",
);

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le blog"
        title="Conseils en vidéo d’entreprise"
        intro="Conseils, tendances et bonnes pratiques pour tirer le meilleur de la vidéo dans votre stratégie marketing."
      />

      <Section className="!pt-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
