import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ChromeGate from "@/components/ChromeGate";
import CustomCursor from "@/components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://feniksstudios.com"),
  title: {
    default: "Feniks Studios — Expert en audiovisuel d'entreprise",
    template: "%s — Feniks Studios",
  },
  description:
    "Boîte de production audiovisuelle parisienne fondée en 2014. Nous comprenons votre produit et votre histoire pour en faire un récit : storytelling et exigence technique haut de gamme. Films d'entreprise, motion design, couverture d'événement, publicité.",
  keywords: [
    "production audiovisuelle",
    "film d'entreprise",
    "vidéo entreprise",
    "motion design",
    "agence vidéo Paris",
    "boîte de production Paris",
    "Feniks Studios",
  ],
  openGraph: {
    title: "Feniks Studios — Expert en audiovisuel d'entreprise",
    description:
      "Films d'entreprise, motion design, couverture d'événement, publicité. Boîte de production parisienne depuis 2014.",
    type: "website",
    locale: "fr_FR",
    siteName: "Feniks Studios",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${raleway.variable}`}>
      <body>
        <Reveal />
        <CustomCursor />
        <ChromeGate>
          <Header />
        </ChromeGate>
        <main className="relative z-[2]">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  );
}
