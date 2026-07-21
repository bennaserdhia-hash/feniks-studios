import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales & confidentialité",
  robots: { index: false, follow: true },
};

export default function MentionsPage() {
  return (
    <>
      <PageHeader eyebrow="Informations" title="Mentions légales & confidentialité" />
      <Section className="!pt-8">
        <div className="max-w-3xl space-y-8 text-muted leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Éditeur</h2>
            <p>
              Le présent site est édité par Feniks Studios, studio de production
              audiovisuelle basé à {site.locations.join(" & ")}. Contact&nbsp;:{" "}
              <a href={`mailto:${site.email}`} className="text-gold hover:underline">
                {site.email}
              </a>
              .
            </p>
            <p className="text-sm text-muted-2 mt-2">
              (À compléter : raison sociale, SIRET, directeur de la publication, hébergeur.)
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Données personnelles
            </h2>
            <p>
              Les informations transmises via le formulaire de contact sont utilisées
              uniquement pour répondre à votre demande. Elles ne sont ni cédées ni vendues à
              des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de
              rectification et de suppression de vos données en écrivant à {site.email}.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Cookies</h2>
            <p>
              Ce site n'utilise pas de cookies de suivi publicitaire. Seuls des cookies
              techniques nécessaires à son bon fonctionnement peuvent être déposés.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
