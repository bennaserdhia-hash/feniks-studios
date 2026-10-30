import Image from "next/image";
import Link from "next/link";
import { pageMetadata, absoluteUrl, ORGANIZATION_ID } from "@/lib/seo";
import { formatPrice } from "@/lib/content";
import { getPublicVideos } from "@/lib/portfolio";
import {
  references,
  communes,
  audiences,
  useCases,
  timeline,
  steps,
  packs,
  options,
  faq,
  publishedFilms,
  heroSlides,
} from "@/lib/drone-architecture";
import Breadcrumbs from "@/components/Breadcrumbs";
import DroneSlideshow from "@/components/DroneSlideshow";
import DroneLoop from "@/components/DroneLoop";
import StructuredData from "@/components/StructuredData";
import WorkCard from "@/components/WorkCard";
import { Section, SectionHeading } from "@/components/Section";
import { IconArrow, IconCheck } from "@/components/Icons";

export const revalidate = 60;

const PATH = "/drone-architecture";
const QUOTE = "/contact?projet=drone";

export const metadata = pageMetadata(
  PATH,
  "Prise de vue drone pour l’architecture et l’immobilier",
  "Photos et vidéos aériennes pour promoteurs, architectes et studios 3D : insertion, commercialisation, suivi de chantier. Plus de 40 missions en Île-de-France, démarches DGAC incluses. Dès 700 € HT.",
  "/drone-architecture/og.jpg",
);

const relatedProjects = [
  "sefri-cime-meryllim",
  "destruction-du-gallion",
  "groupe-sandaya-4",
];

export default async function DroneArchitecturePage() {
  const projects = (await getPublicVideos())
    .filter((v) => relatedProjects.includes(v.id))
    .sort(
      (a, b) => relatedProjects.indexOf(a.id) - relatedProjects.indexOf(b.id),
    );

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Prestations", path: "/prestations" },
          { name: "Drone architecture & immobilier", path: PATH },
        ]}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Prise de vue aérienne par drone pour l’architecture et l’immobilier",
          url: absoluteUrl(PATH),
          provider: { "@id": ORGANIZATION_ID },
          serviceType: "Prise de vue aérienne par drone",
          areaServed: "Île-de-France",
          offers: packs.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price,
            priceCurrency: "EUR",
          })),
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      {/* Hero : diaporama plein cadre */}
      <DroneSlideshow slides={heroSlides}>
        <h1 className="max-w-4xl font-display font-extrabold tracking-tight leading-[1.04] text-balance text-[clamp(2.3rem,6vw,4.8rem)]">
          Vos programmes, vus du ciel.{" "}
          <span className="text-gold">Du terrain nu à la livraison.</span>
        </h1>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href={QUOTE} className="btn btn-gold">
            Demander un devis <IconArrow className="h-4 w-4" />
          </Link>
          <a
            href="#tarifs"
            className="btn border border-white/50 text-white hover:border-gold hover:text-gold"
          >
            Dès {formatPrice(packs[0].price)} HT
          </a>
        </div>
      </DroneSlideshow>

      <section className="py-14 md:py-20">
        <div className="container-x grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground max-w-[38ch] text-pretty">
            Depuis {references.since}, nous volons pour des promoteurs, des
            architectes et des studios de perspectives 3D en Île-de-France.
            Des images calées au mètre près pour vos insertions,{" "}
            <span className="text-gold-ink">faites pour vendre.</span>
          </p>
          <dl className="grid grid-cols-2 gap-6">
            {[
              [references.missions, "missions aériennes pour l’immobilier"],
              [String(communes.length), "communes survolées"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-border pt-5">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display font-black text-4xl md:text-5xl text-foreground">
                  {value}
                </dd>
                <dd className="text-sm md:text-base text-muted mt-2 leading-snug">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pour qui */}
      <Section className="border-y border-border bg-surface/40">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          <SectionHeading
            eyebrow="Pour qui"
            title="Ceux qui construisent la ville."
            intro="Chaque métier attend autre chose d’une vue aérienne. Nous adaptons les points de vue, les livrables et le calendrier à votre usage."
          />
          <DroneLoop
            src="/drone-architecture/boucle-drone.mp4"
            mobileSrc="/drone-architecture/boucle-drone-mobile.mp4"
            poster="/drone-architecture/boucle-drone-poster.webp"
            label="Extraits de vols drone à Saint-Denis, Antony, Boulogne-Billancourt, Toulouse et Sarcelles"
            caption="Saint-Denis · Antony · Boulogne · Toulouse · Sarcelles"
            className="reveal aspect-video rounded-2xl border border-border shadow-[0_24px_48px_-28px_rgba(23,21,15,0.45)]"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {audiences.map((a) => (
            <div key={a.title} className="reveal card p-7">
              <h3 className="font-display font-bold text-lg">{a.title}</h3>
              <p className="text-muted mt-3 leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Usages */}
      <Section>
        <SectionHeading
          eyebrow="Ce que nous filmons"
          title={
            <>
              Six usages, <span className="text-gold">un même soin.</span>
            </>
          }
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-12">
          {useCases.map((u) => (
            <article key={u.title} className="reveal">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border">
                <Image
                  src={u.image}
                  alt={u.alt}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
              <h3 className="font-display font-bold text-xl mt-5">{u.title}</h3>
              <p className="text-muted mt-2 leading-relaxed">{u.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Étude de cas : suivi Jean Zay */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 90% at 85% 0%, rgba(222,178,103,0.16), transparent 60%)",
          }}
        />
        <div className="container-x relative py-20 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16 items-end">
            <div>
              <p className="eyebrow mb-4">Étude de cas · Antony (92)</p>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Un quartier, <span className="text-gradient-gold">un an,</span>{" "}
                quatre passages.
              </h2>
            </div>
            <p className="text-muted text-lg leading-relaxed">
              Pour Sefri-Cime et Meryllim, nous avons suivi la construction du
              quartier Jean Zay de mai 2023 à mai 2024. À chaque passage :
              photos aériennes et au sol, mini-clips pour l’« offre du moment »
              et les rooftops, livrés pour la commercialisation. Antony, nous
              la connaissons bien : nous y volons pour l’immobilier depuis
              2021.
            </p>
          </div>

          <ol className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-12">
            {timeline.map((t, i) => (
              <li key={t.date} className="reveal">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={t.image}
                    alt={`Quartier Jean Zay à Antony, ${t.date.toLowerCase()} : ${t.label.toLowerCase()}`}
                    fill
                    sizes="(max-width:1024px) 50vw, 280px"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 font-display font-bold text-xs tracking-widest uppercase bg-black/60 text-gold rounded-full px-3 py-1">
                    0{i + 1}
                  </span>
                </div>
                <p className="font-display font-bold mt-4">{t.date}</p>
                <p className="text-muted text-sm">{t.label}</p>
              </li>
            ))}
          </ol>

          <Link
            href="/realisations/sefri-cime-meryllim"
            className="btn btn-outline !border-gold/40 !text-gold mt-12"
          >
            Voir le film du chantier <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Films publiés à partir de nos prises de vue */}
      <Section>
        <SectionHeading
          eyebrow="Nos images, leurs films"
          title={
            <>
              Du vol au film{" "}
              <span className="text-gold">du promoteur.</span>
            </>
          }
          intro="Pour l’insertion 3D, nous livrons la matière : le studio de perspectives y place le bâtiment et réalise le film de commercialisation. Voici des films publiés à partir de nos prises de vue."
        />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {publishedFilms.map((f) => (
            <article key={f.url} className="reveal card overflow-hidden flex flex-col min-w-0">
              <div className="relative aspect-[16/10]">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 380px"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-display font-bold bg-black/60 text-white rounded-full px-3 py-1">
                  Notre prise de vue
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="eyebrow">
                  {f.city} · {f.year}
                </p>
                <h3 className="font-display font-bold text-lg mt-2">
                  {f.programme}
                </h3>
                <p className="text-muted text-sm leading-relaxed mt-2 flex-1">
                  {f.delivered}
                </p>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-gold-ink font-semibold underline underline-offset-4"
                >
                  {f.film}
                  <IconArrow className="h-4 w-4 -rotate-45" />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Méthode */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeading
              eyebrow="Méthode"
              title="Un vol se prépare au sol."
              intro="Le temps de vol est la partie la plus courte d’une mission. Tout ce qui fait la qualité se joue avant et après."
            />
          </div>
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal flex gap-5">
                <span className="font-display font-black text-gold text-2xl w-10 shrink-0 leading-none pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border-b border-border pb-8 flex-1">
                  <h3 className="font-display font-bold text-xl">{s.title}</h3>
                  <p className="text-muted mt-2 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Tarifs */}
      <Section id="tarifs" className="border-y border-border bg-surface/40 scroll-mt-20">
        <SectionHeading
          eyebrow="Tarifs"
          title="Trois formules, un devis précis."
          intro="Prix de départ hors taxes, démarches de vol comprises, déplacements inclus en Île-de-France. Le devis final tient compte du nombre de points de vue et des contraintes du site."
          center
        />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {packs.map((p) => (
            <div
              key={p.name}
              className={`reveal card p-7 flex flex-col min-w-0 ${
                p.highlight ? "ring-1 ring-gold/50" : ""
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display font-bold text-xl">{p.name}</h3>
                {p.highlight && (
                  <span className="text-[10px] uppercase tracking-widest font-display font-bold text-gold-ink bg-gold/10 border border-gold/25 rounded-full px-3 py-1 whitespace-nowrap">
                    Le plus complet
                  </span>
                )}
              </div>
              <p className="text-muted text-sm mt-2 leading-relaxed">
                {p.pitch}
              </p>
              <p className="mt-6">
                <span className="text-xs text-muted-2 uppercase tracking-wide block">
                  À partir de
                </span>
                <span className="font-display text-4xl font-black">
                  {formatPrice(p.price)}
                </span>
                <span className="text-muted font-semibold"> HT / {p.unit}</span>
              </p>
              <ul className="space-y-3 mt-6 pt-6 border-t border-border flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="h-5 w-5 rounded-full bg-gold/15 border border-gold/30 grid place-items-center text-gold shrink-0 mt-0.5">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={QUOTE}
                className={`btn mt-8 w-full ${p.highlight ? "btn-gold" : "btn-outline"}`}
              >
                Demander un devis
              </Link>
            </div>
          ))}
        </div>

        <div className="reveal max-w-3xl mx-auto mt-12">
          <h3 className="font-display font-bold text-lg text-center">
            Options
          </h3>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {options.map((o) => (
              <li key={o.label} className="flex justify-between gap-4 py-3">
                <span className="text-muted">{o.label}</span>
                <span className="font-semibold whitespace-nowrap">
                  {o.price}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-2 text-center mt-5">
            Studios de perspectives et agences : conditions dédiées pour les
            commandes régulières.
          </p>
        </div>
      </Section>

      {/* Communes */}
      <Section>
        <SectionHeading
          eyebrow="Terrain connu"
          title="Là où nous avons déjà volé."
          intro="Communes dans lesquelles nous avons réalisé des prises de vue pour des programmes immobiliers. Votre projet est à côté ? Les contraintes de vol y sont déjà connues."
        />
        <ul className="reveal flex flex-wrap gap-2.5 mt-10">
          {communes.map((c) => (
            <li
              key={c}
              className={`rounded-full border px-4 py-2 text-sm ${
                c === "Antony"
                  ? "border-gold bg-gold/10 text-gold-ink font-semibold"
                  : "border-border text-muted"
              }`}
            >
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* Réalisations */}
      {projects.length > 0 && (
        <Section className="border-t border-border">
          <SectionHeading
            eyebrow="Réalisations"
            title="Chantiers et lieux filmés."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project) => (
              <WorkCard key={project.id} work={project} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section className="border-t border-border bg-surface/40">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          <SectionHeading eyebrow="Questions fréquentes" title="Avant de voler." />
          <div className="divide-y divide-border border-y border-border">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="font-display font-bold text-lg cursor-pointer list-none flex justify-between gap-6">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-gold text-2xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-muted leading-relaxed mt-3 max-w-[65ch]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="section-dark relative overflow-hidden">
        <Image
          src="/drone-architecture/slides/issy-panorama.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink/40" />
        <div className="container-x relative py-20 md:py-28 text-center">
          <p className="eyebrow mb-5">Votre programme</p>
          <h2 className="font-display text-3xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
            Une adresse, une échéance :{" "}
            <span className="text-gradient-gold">on s’occupe du reste.</span>
          </h2>
          <p className="text-muted mt-5 max-w-xl mx-auto text-lg">
            Envoyez-nous l’adresse du site et vos vues de référence. Nous
            revenons vers vous avec la faisabilité et un devis.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href={QUOTE} className="btn btn-gold">
              Demander un devis <IconArrow className="h-4 w-4" />
            </Link>
            <Link
              href="/prestations/prises-vues-drone"
              className="btn btn-outline !border-gold/40 !text-gold"
            >
              Le drone pour les autres projets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
