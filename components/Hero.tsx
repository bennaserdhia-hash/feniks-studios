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
          <p className="eyebrow reveal mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            {site.kicker}
          </p>

          <h1 className="reveal font-display font-black uppercase leading-[1.02] tracking-tight text-[clamp(2.4rem,7.5vw,5.6rem)]">
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
            <p className="text-lg text-muted max-w-xl leading-relaxed">{site.pitch}</p>
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
        <video
          className="block w-full h-[46vh] sm:h-[58vh] lg:h-[74vh] object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={showreel.poster}
          preload="metadata"
        >
          <source src={showreel.mp4} type="video/mp4" />
        </video>

        <div className="absolute bottom-5 left-5 md:bottom-7 md:left-8 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-4 py-2 text-xs font-display font-semibold uppercase tracking-widest text-ink">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" /> Showreel
        </div>
      </div>
    </section>
  );
}
