import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "/mentions-legales",
    "Mentions légales et confidentialité",
    "Informations sur Feniks Studios, l’hébergement du site et le traitement des demandes de contact.",
  ),
  robots: { index: false, follow: true },
};
export default function MentionsPage() {
  const legalName = process.env.LEGAL_ENTITY_NAME || site.name;
  const siret = process.env.LEGAL_SIRET;
  const director = process.env.LEGAL_PUBLICATION_DIRECTOR;
  const address = process.env.LEGAL_PUBLIC_ADDRESS;
  return (
    <>
      <PageHeader title="Mentions légales et confidentialité" />
      <Section className="!pt-6">
        <div className="max-w-3xl space-y-10 text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Éditeur
            </h2>
            <p>
              {legalName}, studio de production audiovisuelle basé à Paris.
              Contact :{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-ink underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
            {siret && <p className="mt-3">SIRET : {siret}</p>}
            {director && (
              <p className="mt-3">Directeur de publication : {director}</p>
            )}
            {address && <p className="mt-3">Adresse : {address}</p>}
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Hébergement
            </h2>
            <p>
              Le site est hébergé par Vercel. Informations et contact :{" "}
              <a
                href="https://vercel.com"
                className="text-gold-ink underline underline-offset-4"
                rel="noopener noreferrer"
                target="_blank"
              >
                vercel.com
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Vos demandes de contact
            </h2>
            <p>
              Le formulaire recueille votre prénom, votre nom, votre adresse
              email, votre message, les formats de projet sélectionnés et, si
              vous les fournissez, votre téléphone et un document joint. Ces
              éléments sont utilisés pour répondre à votre demande et préparer
              votre projet.
            </p>
            <p className="mt-4">
              Les demandes sont transmises par email à notre équipe avec le
              service Resend. Les fichiers joints sont transmis avec la demande.
              Évitez de joindre des informations qui ne sont pas nécessaires à
              votre projet.
            </p>
            <p className="mt-4">
              Pour une question sur vos données ou une demande d’accès, de
              rectification ou de suppression, écrivez à {site.email}.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Mesure et contenus externes
            </h2>
            <p>
              Le site utilise Vercel Analytics pour observer sa fréquentation et
              les étapes du formulaire, sans inclure votre nom, votre email ou
              le contenu de votre message dans ces événements de mesure.
            </p>
            <p className="mt-4">
              Certaines réalisations sont présentées dans des lecteurs YouTube
              ou Vimeo. Ces services externes appliquent leurs propres règles de
              traitement des données lorsque leur lecteur est chargé ou utilisé.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
