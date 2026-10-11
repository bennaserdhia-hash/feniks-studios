import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPublicVideos } from "@/lib/portfolio";
import { IconArrow } from "@/components/Icons";

// ISR : régénération auto (max 60 s) pour refléter les ajouts/édits du portfolio.
export const revalidate = 60;

export const metadata = pageMetadata(
  "/realisations",
  "Réalisations vidéo et motion design",
  "Découvrez nos réalisations : films d’entreprise, publicités, motion design et vidéos événementielles. Des projets concrets pour EDF, Sandaya, AJ+ et d’autres marques.",
);

export default async function RealisationsPage() {
  const works = await getPublicVideos();
  return (
    <>
      <PageHeader
        eyebrow="Nos réalisations"
        title="Nos réalisations audiovisuelles"
        intro="Un aperçu de nos productions vidéo, pour tous supports et tous secteurs — de la couverture d'événement au motion design."
      />

      <Section className="!pt-8">
        <PortfolioGrid works={works} />

        <div className="reveal card mt-14 p-8 md:p-12 text-center">
          <p className="eyebrow mb-3">Un projet en tête ?</p>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-4">
            Créons votre prochaine vidéo.
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-7">
            Vous souhaitez des exemples précis correspondant à votre secteur ou
            à votre type de projet ? Contactez-nous, nous vous enverrons une
            sélection ciblée.
          </p>
          <Link href="/contact" className="btn btn-gold">
            Demander un devis <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
