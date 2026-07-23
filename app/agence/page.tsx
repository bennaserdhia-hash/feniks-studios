import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import ServicesList from "@/components/ServicesList";
import { services, team, site } from "@/lib/content";
import { IconArrow, IconCheck } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "L'agence",
  description:
    "Feniks Studios, agence de production audiovisuelle parisienne fondée en 2014. Comprendre votre entreprise pour en raconter l'histoire : storytelling et exigence technique haut de gamme.",
};

const approach = [
  {
    step: "01",
    title: "On comprend",
    text: "On part de vos objectifs et de votre audience. Chaque projet démarre par une vraie écoute de vos besoins.",
  },
  {
    step: "02",
    title: "On imagine",
    text: "Force de proposition : concept, storytelling, direction artistique. On construit une idée qui vous ressemble.",
  },
  {
    step: "03",
    title: "On réalise",
    text: "Tournage, montage, motion design, diffusion. Une exécution soignée, dans les délais et le budget.",
  },
];

export default function AgencePage() {
  return (
    <>
      <PageHeader
        eyebrow="L'agence"
        title={
          <>
            Nous racontons <span className="text-gradient-gold">vos histoires</span>.
          </>
        }
        intro="Agence de production audiovisuelle parisienne fondée en 2014. Notre métier ne commence pas derrière la caméra : il commence par comprendre votre produit, votre histoire et vos valeurs. Le reste — écriture, tournage, post-production — n'est que la mise en œuvre de ce récit, avec une exigence technique haut de gamme."
      />

      {/* Positioning */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <SectionHeading
              eyebrow="Notre approche"
              title="Plus qu'un prestataire, un partenaire."
            />
            <div className="space-y-5 mt-8 text-muted leading-relaxed">
              <p>
                Feniks Studios est bien plus qu'une simple société de production
                audiovisuelle : c'est une équipe spécialisée en audiovisuel d'entreprise.
                Nous proposons des vidéos pour tous supports — web, mobile, TV, video
                learning.
              </p>
              <p>
                La vidéo est devenue incontournable dans les stratégies marketing. Conscients
                de son impact, nous sommes plus qu'un simple prestataire : nous sommes le
                partenaire de nos clients. Notre objectif est de comprendre leurs besoins et
                d'ajouter de la valeur à leur marque.
              </p>
            </div>
            <Link href="/contact" className="btn btn-gold mt-8">
              Discutons de votre projet <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="reveal space-y-4">
            {approach.map((a) => (
              <div key={a.step} className="card p-6 flex gap-5">
                <span className="font-display text-3xl font-extrabold text-gold/40 shrink-0">
                  {a.step}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">{a.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* All services */}
      <Section className="bg-surface/30 border-y border-border">
        <SectionHeading
          eyebrow="Prestations audiovisuelles"
          title="Ce que nous produisons"
          intro="Filmer vos événements, présenter vos produits, former vos collaborateurs, réaliser vos motion designs… un savoir-faire complet, du brief à la diffusion."
        />
        <div className="mt-12">
          <ServicesList items={services} />
        </div>
      </Section>

      {/* Black & gold manifesto band (section interne) */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 100% at 85% 0%, rgba(222,178,103,0.18), transparent 60%)",
          }}
        />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Notre signature</p>
            <p className="font-display text-3xl md:text-5xl font-black leading-[1.05] tracking-tight">
              Une caméra ne raconte rien toute seule. Ce qui compte, c&apos;est{" "}
              <span className="text-gradient-gold">l&apos;histoire</span>{" "}
              qu&apos;on a su lire dans votre entreprise avant de la filmer.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-14 max-w-2xl">
            {[
              { v: "2014", l: "Année de création" },
              { v: "40+", l: "Marques accompagnées" },
              { v: "10+", l: "Types de prestations vidéo" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl md:text-5xl font-black text-gold">
                  {s.v}
                </p>
                <p className="text-sm mt-2 leading-snug text-[#b9b3a5]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <Section>
        <SectionHeading
          eyebrow="L'équipe de production"
          title="Les visages derrière la caméra"
          center
        />
        <div className="flex flex-wrap justify-center gap-6 mt-14">
          {team.map((m) => (
            <div key={m.name} className="reveal card p-8 text-center w-full sm:w-72">
              <div className="h-20 w-20 rounded-full mx-auto grid place-items-center bg-gold/12 border border-gold/25 font-display text-2xl font-extrabold text-gold mb-5">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display font-bold text-lg">{m.name}</h3>
              <p className="text-gold text-sm mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section className="bg-surface/30 border-y border-border">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Pourquoi Feniks Studios"
              title="Passionnés, réactifs, force de proposition."
            />
            <div className="reveal relative aspect-video rounded-2xl overflow-hidden border border-border mt-8">
              <Image
                src="/portfolio/linkedin-local.jpg"
                alt="Couverture d'événement LinkedIn Local Toulouse par Feniks Studios"
                fill
                sizes="(max-width:768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
          <ul className="reveal space-y-4">
            {[
              "On commence par comprendre : votre produit, votre marché, ce qui vous distingue vraiment.",
              "On cherche l'histoire — celle qui porte vos valeurs et donne envie de vous écouter.",
              "Une exigence technique haut de gamme : image, son, lumière, montage, étalonnage.",
              "Force de proposition, jamais simple exécutant : nous challengeons le brief quand c'est utile.",
              "Un accompagnement de A à Z : conseil, écriture, tournage, post-production, diffusion.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-gold/15 border border-gold/30 grid place-items-center text-gold shrink-0 mt-0.5">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
