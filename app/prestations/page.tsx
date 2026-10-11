import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/services";
import { services } from "@/lib/content";
import ServicesList from "@/components/ServicesList";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
export const metadata = pageMetadata(
  "/prestations",
  "Prestations de production audiovisuelle",
  "Film d’entreprise, motion design, interview et vidéo événementielle : découvrez les prestations Feniks Studios et les formats adaptés à votre projet.",
);
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Nos prestations audiovisuelles"
        intro="Choisissez un format selon votre objectif. Nous vous accompagnons du premier brief à la production et aux livrables de diffusion."
      />
      <Section className="!pt-6">
        <ServicesList items={services} />
        <div className="mt-12 flex flex-wrap gap-5">
          <Link className="btn btn-gold" href="/contact">
            Parler de votre projet
          </Link>
          <Link className="btn btn-outline" href="/tarifs">
            Consulter les tarifs
          </Link>
        </div>
        <p className="sr-only">
          {servicePages.length} prestations de production audiovisuelle.
        </p>
      </Section>
    </>
  );
}
