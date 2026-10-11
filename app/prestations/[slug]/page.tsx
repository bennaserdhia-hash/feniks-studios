import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages } from "@/lib/services";
import { pricing, formatPrice } from "@/lib/content";
import { getPublicVideos } from "@/lib/portfolio";
import { pageMetadata, absoluteUrl, ORGANIZATION_ID } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import WorkCard from "@/components/WorkCard";
import { Section } from "@/components/Section";
type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;
export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service)
    return { title: "Prestation introuvable", robots: { index: false } };
  return pageMetadata(
    `/prestations/${slug}`,
    service.seoTitle,
    service.description,
  );
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) notFound();
  const price = pricing.find((p) => p.icon === service.icon);
  const projects = (await getPublicVideos())
    .filter(
      (v) =>
        service.projectIds.includes(v.id) ||
        service.categories.includes(v.category),
    )
    .slice(0, 3);
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Prestations", path: "/prestations" },
          { name: service.title, path: `/prestations/${slug}` },
        ]}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: absoluteUrl(`/prestations/${slug}`),
          provider: { "@id": ORGANIZATION_ID },
          serviceType: service.title,
        }}
      />
      <Section className="!pt-12 !pb-14">
        <div className="max-w-3xl">
          <h1 className="font-display font-extrabold text-[clamp(2.2rem,5vw,4rem)] leading-tight tracking-tight">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mt-6">
            {service.intro}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="btn btn-gold">
              Demander un devis
            </Link>
            <Link href="/tarifs" className="btn btn-outline">
              {price
                ? `À partir de ${formatPrice(price.from)} HT${price.unit ? ` / ${price.unit}` : ""}`
                : "Voir nos tarifs"}
            </Link>
          </div>
        </div>
      </Section>
      <Section className="border-y border-border bg-surface/40">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
          <h2 className="font-display font-bold text-2xl md:text-3xl">
            Quand choisir ce format ?
          </h2>
          <ul className="space-y-5 text-lg text-muted list-disc pl-5">
            {service.uses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
        </div>
      </Section>
      {service.sections.map((section) => (
        <Section key={section.heading} className="!py-14 md:!py-20">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16">
            <h2 className="font-display font-bold text-2xl md:text-3xl leading-tight">
              {section.heading}
            </h2>
            <p className="text-lg text-muted leading-relaxed max-w-[70ch]">
              {section.text}
            </p>
          </div>
        </Section>
      ))}
      <Section className="border-y border-border bg-surface/40">
        <div className="max-w-3xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl">
            Préparer votre demande
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-5">
            Indiquez votre objectif, votre public, la date de diffusion et les
            supports envisagés. Ajoutez les lieux et personnes disponibles,
            ainsi que les éléments de marque ou exemples qui éclairent votre
            besoin. Nous construisons le devis selon ce périmètre.
          </p>
          {price && (
            <p className="mt-5 text-muted">
              Tarif de départ :{" "}
              <strong className="text-foreground">
                {formatPrice(price.from)} HT
                {price.unit ? ` / ${price.unit}` : ""}
              </strong>
              . Le devis final dépend des séquences, des contraintes de
              production et des versions à livrer.
            </p>
          )}
          <Link href="/contact" className="btn btn-gold mt-7">
            Décrire votre projet
          </Link>
        </div>
      </Section>
      {projects.length > 0 && (
        <Section>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-9">
            Des réalisations à découvrir
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <WorkCard key={project.id} work={project} />
            ))}
          </div>
        </Section>
      )}
      <Section className="border-t border-border !py-12">
        <Link
          href="/prestations"
          className="text-gold-ink underline underline-offset-4"
        >
          Toutes nos prestations audiovisuelles
        </Link>
      </Section>
    </>
  );
}
