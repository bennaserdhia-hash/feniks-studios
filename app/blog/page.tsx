import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Marketing vidéo",
  description:
    "Nos articles pour devenir expert en audiovisuel : storytelling, motion design, stratégie digitale, engagement et réseaux sociaux.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le blog"
        title={
          <>
            Devenez expert en <span className="text-gradient-gold">audiovisuel</span>
          </>
        }
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
