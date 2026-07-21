import Link from "next/link";
import Logo from "./Logo";
import { site, nav } from "@/lib/content";
import { SocialIcon, IconMapPin, IconMail, IconArrow } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-border bg-surface/40">
      {/* CTA band */}
      <div className="container-x py-16 md:py-20">
        <div className="card p-8 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(600px 200px at 50% 0%, rgba(222,178,103,0.18), transparent)",
            }}
          />
          <div className="relative">
            <p className="eyebrow mb-4">Un projet vidéo ?</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Donnons vie à <span className="text-gradient-gold">votre histoire</span>.
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-8">
              Parlez-nous de votre projet : nous vous répondons avec des idées, un
              accompagnement sur-mesure et un devis clair.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Demander un devis <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="hairline" />

      {/* Main footer */}
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="text-muted mt-5 max-w-sm leading-relaxed">
            {site.tagline}. Nous racontons vos histoires en vidéo, du film d'entreprise
            au motion design, pour aider votre marque à se démarquer.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {site.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="h-10 w-10 grid place-items-center rounded-full border border-border text-muted hover:text-gold hover:border-gold/50 transition-colors"
              >
                <SocialIcon name={s.name} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Navigation</h3>
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/documents/plaquette-feniks-studios.pdf"
                download
                className="text-gold-ink hover:text-foreground transition-colors font-semibold"
              >
                Télécharger notre plaquette
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Contact</h3>
          <ul className="space-y-4 text-muted">
            <li className="flex items-start gap-3">
              <IconMapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <span>{site.locations.join(" & ")}</span>
            </li>
            <li className="flex items-start gap-3">
              <IconMail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <a href={`mailto:${site.email}`} className="hover:text-foreground transition-colors break-all">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline" />
      <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-2">
        <p>© {new Date().getFullYear()} Feniks Studios. Tous droits réservés.</p>
        <Link href="/mentions-legales" className="hover:text-muted transition-colors">
          Mentions légales & confidentialité
        </Link>
      </div>
    </footer>
  );
}
