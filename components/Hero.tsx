import Showreel from "./Showreel";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { site, showreel } from "@/lib/content";
import { StruckWord } from "./HandStrike";
import { IconArrow, IconPlay } from "./Icons";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "500"] });

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16">
      {/* soft gold aura */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 0%, rgba(222,178,103,0.14), transparent 60%), radial-gradient(50% 50% at 0% 20%, rgba(222,178,103,0.08), transparent 60%)",
        }}
      />

      <div className="container-x">
        <div className="max-w-4xl">
          <h1 className="reveal font-display font-black uppercase leading-[1.02] tracking-tight text-[clamp(2.4rem,7.5vw,5.6rem)]">
            <span className="block text-sm md:text-base tracking-wide leading-relaxed mb-6 font-semibold normal-case text-muted">
              Agence de production audiovisuelle à Paris · Depuis 2014
            </span>
            Nous <StruckWord variant="repassee">filmons</StruckWord>{" "}
            <span
              className={`${caveat.className} text-gold uppercase font-normal align-baseline`}
              style={{ fontSize: "1.2em" }}
            >
              racontons
            </span>
            <br />
            vos histoires.
          </h1>

          <div className="reveal mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-lg text-muted max-w-xl leading-relaxed">
              {site.pitch}
            </p>
          </div>

          <div className="reveal flex flex-wrap items-center gap-4 mt-8">
            <Link href="/contact" className="btn btn-gold">
              Un projet vidéo ? <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/realisations" className="btn btn-outline">
              <IconPlay className="h-4 w-4" /> Voir nos réalisations
            </Link>
          </div>
        </div>
      </div>

      {/* Showreel pleine largeur, bord à bord */}
      <div
        className="reveal relative mt-14 md:mt-20 w-full overflow-hidden bg-surface-2 border-y border-border"
        style={{ transitionDelay: "120ms" }}
      >
        <Showreel
          src="/video/showreel-preview.mp4"
          fullSrc={showreel.full}
          poster="/video/poster.webp"
          title="Showreel Feniks Studios — production audiovisuelle"
          autoPlayOnDesktop
          className="h-[46vh] sm:h-[58vh] lg:h-[74vh]"
        />
      </div>
    </section>
  );
}
