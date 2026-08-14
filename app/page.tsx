import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import { Section, SectionHeading } from "@/components/Section";
import ServicesList from "@/components/ServicesList";
import WorkCard from "@/components/WorkCard";
import PostCard from "@/components/PostCard";
import Testimonials from "@/components/Testimonials";
import { services, posts, showreel2022 } from "@/lib/content";
import { getVideos } from "@/lib/portfolio";
import { IconArrow } from "@/components/Icons";

// ISR : la page se régénère au plus toutes les 60 s pour refléter
// automatiquement les changements du portfolio (Supabase / dashboard /admin).
export const revalidate = 60;

export default async function Home() {
  const works = await getVideos();
  return (
    <>
      <Hero />
      <Clients />

      {/* Manifesto */}
      <Section>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="reveal relative aspect-[4/5] rounded-2xl overflow-hidden border border-border order-2 md:order-1">
            <Image
              src="/photos/tournage.jpg"
              alt="L'équipe Feniks Studios en tournage — steadicam et prise de son"
              fill
              sizes="(max-width:768px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <p className="font-display text-sm uppercase tracking-widest text-gold">
                Depuis 2014
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <SectionHeading
              eyebrow="Agence de production audiovisuelle"
              title={
                <>
                  Comprendre votre entreprise{" "}
                  <span className="text-gold">avant de filmer quoi que ce soit.</span>
                </>
              }
              intro="Aujourd'hui, la vraie valeur d'une agence de production ne tient pas au matériel : elle tient à sa capacité à comprendre votre produit, votre histoire et ce qui fait votre âme — puis à en tirer un récit. C'est ce que nous faisons depuis 2014, en associant maîtrise du storytelling et exigence technique haut de gamme."
            />
          </div>
        </div>
      </Section>

      {/* Réalisations — editorial grid */}
      <Section className="border-t border-border">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading eyebrow="Nos réalisations" title="Les histoires qu'on nous a confiées" />
          <Link href="/realisations" className="btn btn-ghost reveal">
            Voir tout <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        {works.length > 0 && (
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <WorkCard work={works[0]} large />
            </div>
            <div className="grid gap-5">
              {works.slice(1, 3).map((w) => (
                <WorkCard key={w.id} work={w} />
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Services — editorial list */}
      <Section className="bg-surface/20 border-t border-border">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Nos prestations"
            title={<>Tout l'audiovisuel,<br />sous un même toit.</>}
          />
          <Link href="/agence" className="btn btn-ghost reveal">
            Découvrir l'agence <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="reveal relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-border mb-12 bg-ink">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={showreel2022.poster}
            preload="metadata"
          >
            <source src={showreel2022.mp4} type="video/mp4" />
          </video>
        </div>

        <ServicesList items={services.slice(0, 6)} />
      </Section>

      {/* Testimonials */}
      <Section className="border-t border-border">
        <div className="mb-14">
          <SectionHeading eyebrow="Ils nous font confiance" title="Avec eux, on fait mieux." />
        </div>
        <Testimonials />
      </Section>

      {/* Blog */}
      <Section className="bg-surface/20 border-t border-border">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SectionHeading eyebrow="Le blog" title="Devenez expert en audiovisuel" />
          <Link href="/blog" className="btn btn-ghost reveal">
            Tous les articles <IconArrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
