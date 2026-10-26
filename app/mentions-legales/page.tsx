import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "/mentions-legales",
    "Mentions légales et confidentialité",
    "Informations sur Feniks Studios, vos demandes de contact et l’utilisation de vos données pour notre newsletter professionnelle.",
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
          <section id="newsletter" className="scroll-mt-32" aria-labelledby="newsletter-title">
            <h2 id="newsletter-title" className="font-display text-xl font-bold text-foreground mb-4">
              Newsletter professionnelle et données personnelles
            </h2>
            <p>
              {legalName} utilise vos coordonnées pour vous présenter ses
              réalisations, ses services audiovisuels et ses actualités
              professionnelles. Vous restez libre de ne plus recevoir ces messages.
            </p>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Pourquoi recevez-vous ces messages ?
                </h3>
                <p>
                  Nos campagnes reposent sur votre autorisation à recevoir les
                  communications de Feniks Studios. L’origine de votre adresse et
                  cette autorisation doivent être documentées avant son utilisation
                  dans une campagne. Pour connaître la source précise de vos
                  coordonnées ou obtenir des informations sur cette autorisation,
                  vous pouvez nous écrire à{" "}
                  <a href={`mailto:${site.email}`} className="text-gold-ink underline underline-offset-4">
                    {site.email}
                  </a>.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Quelles données sont utilisées ?
                </h3>
                <p>
                  Votre adresse email et, lorsqu’ils sont disponibles et utiles,
                  votre nom, votre entreprise et votre fonction. Nous conservons
                  aussi l’origine des coordonnées, les informations justifiant
                  l’autorisation d’envoi et les statuts nécessaires au suivi des
                  messages : envoi, remise, erreur, plainte ou désinscription.
                  Ces données ne sont ni vendues ni louées.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Qui peut y accéder ?
                </h3>
                <p>
                  L’équipe habilitée de Feniks Studios et Brevo, notre prestataire
                  d’envoi et de gestion des désinscriptions. Le tableau de pilotage
                  Google ne reçoit que des chiffres de synthèse, sans les adresses
                  des destinataires. Les informations sur les traitements de
                  Brevo et ses garanties de protection des données sont disponibles
                  dans sa{" "}
                  <a href="https://www.brevo.com/legal/termsofuse/#appendix-3-data-processing-agreement-dpa" className="text-gold-ink underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                    documentation contractuelle de protection des données
                  </a>.
                </p>
                <p className="mt-3">
                  Brevo peut faire intervenir des sous-traitants en dehors de
                  l’Espace économique européen. Son accord de traitement précise
                  les garanties appliquées, notamment les clauses contractuelles
                  types de la Commission européenne et les mesures
                  complémentaires. Vous pouvez nous demander des précisions
                  sur les garanties applicables à vos données.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Ouvertures et clics
                </h3>
                <p>
                  Accepter la newsletter ne vaut pas accord pour le suivi
                  individuel de vos ouvertures et clics à des fins marketing.
                  Ce suivi nécessite un accord distinct. Les informations
                  techniques nécessaires à l’acheminement des messages, à la
                  gestion des erreurs et aux désinscriptions restent traitées.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Pendant combien de temps ?
                </h3>
                <p>
                  Pour les prospects, l’utilisation des coordonnées à des fins de
                  prospection est limitée à trois ans après leur collecte ou le
                  dernier contact venant de la personne, et cesse plus tôt en cas
                  de retrait de l’autorisation. Un envoi de notre part ne renouvelle
                  pas cette durée. Des règles de fraîcheur plus strictes peuvent
                  conduire à écarter une adresse plus tôt.
                </p>
                <p className="mt-3">
                  Une information minimale d’opposition est conservée au moins
                  trois ans, uniquement pour éviter de vous solliciter de nouveau.
                  Les justificatifs nécessaires au respect de nos obligations
                  peuvent être conservés séparément pendant la durée justifiée
                  par leur finalité.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  Comment vous désinscrire ou exercer vos droits ?
                </h3>
                <p>
                  Utilisez le lien « Se désinscrire » présent dans chaque
                  newsletter, sans frais et sans créer de compte. Vous pouvez
                  aussi écrire à{" "}
                  <a href={`mailto:${site.email}`} className="text-gold-ink underline underline-offset-4">
                    {site.email}
                  </a>{" "}
                  pour retirer votre autorisation, demander l’accès à vos données,
                  leur rectification, leur effacement ou leur portabilité lorsque
                  celle-ci s’applique, ou demander une limitation du traitement.
                  Le retrait de votre consentement ne remet pas en cause les
                  traitements effectués auparavant sur cette base. Vous pouvez
                  également adresser une réclamation à la{" "}
                  <a href="https://www.cnil.fr/" className="text-gold-ink underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                    CNIL
                  </a>.
                </p>
              </div>
            </div>
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
