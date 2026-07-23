import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { pricing, formatPrice } from "@/lib/content";
import { serviceIcons, IconArrow, IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Les tarifs de Feniks Studios, boîte de production audiovisuelle parisienne : film d'entreprise dès 3 500 €, motion design, publicité, couverture d'événement, video learning. Devis sur-mesure gratuit.",
};

const included = [
  "Réunion de cadrage et écriture",
  "Tournage avec matériel haut de gamme",
  "Montage, étalonnage et mixage son",
  "Deux tours de corrections inclus",
  "Livraison aux formats de diffusion",
];

export default function TarifsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos tarifs"
        title={
          <>
            Des prix clairs, <span className="text-gradient-gold">une valeur juste</span>
          </>
        }
        intro="Chez Feniks Studios, rien n'est standardisé : chaque projet est entièrement sur-mesure, réalisé par une équipe de passionnés dont le métier est de rendre votre film unique. Ces prix de départ vous donnent un ordre de grandeur — le devis final est construit avec vous, selon vos ambitions et votre diffusion."
      />

      {/* Grille de tarifs */}
      <Section className="!pt-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricing.map((p) => {
            const Icon = serviceIcons[p.icon] ?? serviceIcons.play;
            return (
              <div
                key={p.title}
                className={`reveal card p-7 flex flex-col ${
                  p.highlight ? "ring-1 ring-gold/40" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="h-11 w-11 grid place-items-center rounded-lg bg-gold/12 border border-gold/25 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  {p.highlight && (
                    <span className="text-[10px] uppercase tracking-widest font-display font-bold text-gold-ink bg-gold/10 border border-gold/25 rounded-full px-3 py-1">
                      Le plus demandé
                    </span>
                  )}
                </div>

                <h2 className="font-display font-bold text-lg leading-tight">{p.title}</h2>
                <p className="text-muted text-sm mt-2 leading-relaxed flex-1">{p.note}</p>

                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-xs text-muted-2 uppercase tracking-wide">À partir de</p>
                  <p className="font-display text-3xl font-black text-foreground mt-1">
                    {formatPrice(p.from)}
                    {p.unit && (
                      <span className="text-base font-semibold text-muted"> / {p.unit}</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-2 mt-8">
          Tarifs indicatifs hors taxes. Prise de vue drone soumise aux autorisations de vol en vigueur.
        </p>
      </Section>

      {/* Ce qui est compris */}
      <Section className="bg-surface/30 border-y border-border">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">Compris dans chaque projet</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight">
              Du sur-mesure, par une équipe de passionnés.
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              Nous ne vendons pas des « packs » sortis d&apos;un catalogue. Chaque film est pensé,
              écrit et réalisé pour vous — par une équipe qui aime son métier et met un point
              d&apos;honneur à rendre votre projet unique. Nos prix incluent tout ce qui fait la
              qualité, du premier échange à la livraison.
            </p>
          </div>
          <ul className="reveal space-y-4">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-gold/15 border border-gold/30 grid place-items-center text-gold shrink-0 mt-0.5">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA noir & or (page interne) */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 100% at 80% 0%, rgba(222,178,103,0.18), transparent 60%)",
          }}
        />
        <div className="container-x relative py-20 md:py-24 text-center">
          <p className="eyebrow mb-5">Votre projet</p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-tight max-w-2xl mx-auto">
            Un devis précis, gratuit,{" "}
            <span className="text-gradient-gold">sous 24 à 48h.</span>
          </h2>
          <p className="text-[#b9b3a5] mt-4 max-w-xl mx-auto">
            Décrivez-nous votre besoin : nous revenons vers vous avec une proposition adaptée à
            vos objectifs et à votre budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">
              Demander un devis <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/realisations" className="btn btn-outline !border-gold/40 !text-gold">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
