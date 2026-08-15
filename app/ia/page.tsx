import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/Section";
import { IconArrow, IconTv, IconPlay, IconBox } from "@/components/Icons";

export const metadata: Metadata = {
  title: "IA ou IA pas ? — Production audiovisuelle augmentée par l'IA",
  description:
    "Feniks Studios assume l'IA à 100 % : publicités futuristes, films hyper-réalistes et images qui auraient coûté des centaines de milliers d'euros. Une offre où l'IA n'est jamais un sujet — tout est dans l'histoire.",
};

const offers = [
  {
    icon: IconTv,
    title: "Publicités futuristes & hyper-réalistes",
    text: "Des spots qui n'existaient que dans les grands budgets hollywoodiens. Univers, produits, mises en scène impossibles à tourner — rendus crédibles jusque dans le moindre détail.",
  },
  {
    icon: IconPlay,
    title: "Films & concepts « impossibles »",
    text: "Décors qui n'existent pas, époques révolues, échelles démesurées. On réalise ce qui aurait demandé un plateau, une équipe VFX et des mois de post-production.",
  },
  {
    icon: IconBox,
    title: "Mondes, VFX & direction artistique",
    text: "Une cohérence visuelle de bout en bout : personnages, lumière, matière. La signature d'une agence de production, pas un patchwork de prompts.",
  },
];

const steps = [
  {
    n: "01",
    title: "On écrit d'abord.",
    text: "Le concept, la dramaturgie, l'intention — avant le moindre pixel. C'est l'histoire qui décide, jamais l'outil.",
  },
  {
    n: "02",
    title: "On produit avec l'IA.",
    text: "Des équipes formées, une direction artistique tenue, une cohérence maîtrisée. La technologie au service du plan, pas l'inverse.",
  },
  {
    n: "03",
    title: "On finit à la main.",
    text: "Montage, étalonnage, mixage son. Le soin d'une vraie post-production, celui qui fait la différence entre une image et une œuvre.",
  },
  {
    n: "04",
    title: "On assume.",
    text: "Transparence totale sur la méthode — et le prix juste d'un savoir-faire encore rare. L'IA à 100 %, revendiquée.",
  },
];

export default function IaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Feniks × Intelligence artificielle"
        title={
          <>
            IA ou <span className="text-gradient-gold">IA pas&nbsp;?</span>
          </>
        }
        intro="Une offre qui assume l'IA à 100 % — et le prix qui va avec. Des publicités futuristes, des films hyper-réalistes, des images qui auraient coûté des dizaines ou des centaines de milliers d'euros. Réalisées par des équipes formées, où l'IA n'est jamais un sujet : tout est dans l'histoire."
      />

      {/* Ce qu'on produit */}
      <Section className="!pt-6">
        <SectionHeading
          eyebrow="L'offre"
          title={
            <>
              Ce qui était impossible.{" "}
              <span className="text-gradient-gold">Ou hors de prix.</span>
            </>
          }
          intro="On met la puissance de l'IA générative au service de projets qui, hier encore, réclamaient des budgets à six chiffres. Aujourd'hui, on les rend accessibles — sans rien lâcher sur l'exigence."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {offers.map((o) => (
            <div key={o.title} className="reveal card p-7 flex flex-col">
              <span className="h-11 w-11 grid place-items-center rounded-lg bg-gold/12 border border-gold/25 text-gold mb-5">
                <o.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display font-bold text-lg leading-tight">{o.title}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed flex-1">{o.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Manifeste — noir & or */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(70% 90% at 15% 0%, rgba(222,178,103,0.16), transparent 55%), radial-gradient(60% 80% at 95% 100%, rgba(222,178,103,0.10), transparent 60%)",
          }}
        />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Le manifeste</p>
            <h2 className="font-display text-3xl md:text-5xl font-black leading-[1.05]">
              «&nbsp;C'est de l'IA.&nbsp;»
            </h2>
            <div className="gold-line mt-7" />

            <div className="mt-9 space-y-6 text-lg leading-relaxed text-[#cfc9bd]">
              <p>
                Trois mots qu'on entend partout. Devant un plan spectaculaire, le spectateur
                lâche la phrase — comme un verdict. Comme si l'image venait d'un prompt. Comme si
                elle n'avait rien coûté.
              </p>
              <p>
                Souvent, c'est faux. L'effet a demandé des mois de travail et parfois des
                centaines de milliers d'euros. Mais le constat est là&nbsp;:{" "}
                <span className="text-white font-medium">
                  l'arrivée de l'IA a banalisé le principe même de l'effet spécial.
                </span>
              </p>

              <p className="font-display text-2xl md:text-3xl font-bold text-gradient-gold !leading-snug py-2">
                Et si c'était une excellente nouvelle&nbsp;?
              </p>

              <p>
                Si la technique ne suffit plus à impressionner, alors elle ne pourra plus masquer
                la faiblesse d'un scénario, d'une dramaturgie, d'une histoire mal racontée. La
                prouesse devient banale — et remet au centre ce qui ne l'est jamais&nbsp;:
                l'écriture, le sens, l'émotion.
              </p>
              <p>
                Paradoxe magnifique&nbsp;: un outil qu'on dit «&nbsp;non humain&nbsp;» repousse
                l'attention du spectateur vers le plus humain d'une œuvre — son âme, son style,
                son histoire.
              </p>

              <p className="text-white/95 text-xl md:text-2xl font-display font-semibold !leading-snug border-l-2 border-gold pl-5 md:pl-6">
                C'est dans cette philosophie que Feniks se forme à l'IA&nbsp;: tirer le maximum de
                cette technologie au service de ce qui compte vraiment — l'âme de son auteur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Le concept "IA ou IA pas ?" */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">Le concept</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
              Un jeu. <span className="text-gradient-gold">Et un argument.</span>
            </h2>
            <p className="text-muted mt-5 leading-relaxed">
              Sauriez-vous dire ce qui est généré et ce qui est tourné&nbsp;? De moins en moins.
              Nous en faisons un principe&nbsp;: des images si abouties que la question ne se pose
              plus. Ce n'est pas «&nbsp;de l'IA&nbsp;» — c'est une histoire, racontée avec les
              meilleurs outils du moment.
            </p>
            <p className="text-muted mt-4 leading-relaxed">
              Le spectateur ne voit plus la technique. Il ne voit que l'émotion. C'est exactement
              là qu'on veut l'emmener.
            </p>
          </div>
          <div className="reveal card p-8 md:p-10 text-center">
            <p className="font-display text-5xl md:text-6xl font-black leading-none">
              IA <span className="text-muted-2">ou</span>{" "}
              <span className="text-gradient-gold">IA pas&nbsp;?</span>
            </p>
            <p className="text-muted mt-5 leading-relaxed">
              Si vous devez vous poser la question, c'est qu'on a réussi.
            </p>
          </div>
        </div>
      </Section>

      {/* Notre approche */}
      <Section className="bg-surface/30 border-y border-border">
        <SectionHeading
          eyebrow="Notre approche"
          title={
            <>
              L'histoire d'abord. <span className="text-gradient-gold">La technologie ensuite.</span>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {steps.map((s) => (
            <div key={s.n} className="reveal card p-7 flex flex-col">
              <span className="font-display text-3xl font-black text-gold/30">{s.n}</span>
              <h3 className="font-display font-bold text-lg leading-tight mt-3">{s.title}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed flex-1">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="section-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 100% at 80% 0%, rgba(222,178,103,0.18), transparent 60%)",
          }}
        />
        <div className="container-x relative py-20 md:py-24 text-center">
          <p className="eyebrow mb-5">Passons à l'action</p>
          <h2 className="font-display text-3xl md:text-4xl font-black leading-tight max-w-2xl mx-auto">
            Un projet que tout le monde croit{" "}
            <span className="text-gradient-gold">impossible&nbsp;?</span>
          </h2>
          <p className="text-[#b9b3a5] mt-4 max-w-xl mx-auto">
            Impossible à tourner, ou hors budget&nbsp;? C'est exactement là qu'on intervient.
            Décrivez-nous votre idée — on vous dit ce que l'IA rend possible, et à quel prix.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">
              Parler de mon projet <IconArrow className="h-4 w-4" />
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
