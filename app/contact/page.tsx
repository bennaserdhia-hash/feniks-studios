import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/content";
import { SocialIcon, IconMapPin, IconMail, IconDownload } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & demande de devis",
  description:
    "Contactez Feniks Studios pour votre projet audiovisuel. Demandez un devis gratuit ou soyez recontacté par notre équipe à Paris.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Parlons de <span className="text-gradient-gold">votre projet</span>
          </>
        }
        intro="Une idée, un besoin, une envie de partenariat… ou simplement un p'tit coucou. Décrivez votre projet, nous revenons vers vous rapidement avec un devis."
      />

      <Section className="!pt-8">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10">
          {/* Info column */}
          <div className="reveal space-y-6">
            <div className="card p-7">
              <h2 className="font-display font-bold text-lg mb-5">Nos coordonnées</h2>
              <ul className="space-y-4 text-muted">
                <li className="flex items-start gap-3">
                  <IconMapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span>
                    Agence de production basée à
                    <br />
                    <strong className="text-foreground">{site.locations.join(" & ")}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IconMail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-foreground transition-colors break-all"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="card p-7">
              <h2 className="font-display font-bold text-lg mb-5">Suivez-nous</h2>
              <div className="flex flex-wrap gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="h-11 w-11 grid place-items-center rounded-full border border-border text-muted hover:text-gold hover:border-gold/50 transition-colors"
                  >
                    <SocialIcon name={s.name} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="card p-7">
              <p className="eyebrow mb-3">Réactivité</p>
              <p className="text-muted text-sm leading-relaxed">
                Nous répondons généralement sous 24–48h ouvrées. Plus votre brief est précis,
                plus notre réponse sera pertinente.
              </p>
            </div>

            <div className="card p-7">
              <p className="eyebrow mb-3">Notre plaquette</p>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Nos prestations, notre méthode et nos références en 5 pages.
              </p>
              <a
                href="/documents/plaquette-feniks-studios.pdf"
                download
                className="btn btn-outline w-full !px-5"
              >
                <IconDownload className="h-4 w-4" /> Télécharger la plaquette
              </a>
            </div>
          </div>

          {/* Form column */}
          <div className="reveal">
            <QuoteForm />
          </div>
        </div>
      </Section>
    </>
  );
}
