export {
  site,
  nav,
  testimonials,
  projectTypes,
  type Testimonial,
} from "./client-content";

export type Service = {
  title: string;
  description: string;
  icon: string; // key for icon component
};

export const services: Service[] = [
  {
    title: "Film d'entreprise / institutionnel",
    description:
      "Racontez l'histoire de votre entreprise, vos valeurs et votre savoir-faire dans un film qui marque les esprits.",
    icon: "building",
  },
  {
    title: "Couverture d'événement",
    description:
      "Séminaires, conférences, lancements : nous capturons vos temps forts pour une restitution fidèle et vivante.",
    icon: "event",
  },
  {
    title: "Vidéo produit / service",
    description:
      "Mettez en valeur vos produits et services avec des vidéos qui donnent envie et convertissent.",
    icon: "box",
  },
  {
    title: "Motion design",
    description:
      "Des animations sur-mesure pour présenter un concept, un service ou votre entreprise avec impact.",
    icon: "motion",
  },
  {
    title: "Interview",
    description:
      "Donnez la parole à vos dirigeants, collaborateurs et clients dans des interviews soignées et authentiques.",
    icon: "mic",
  },
  {
    title: "Vidéo de formation / Video Learning",
    description:
      "Formez vos collaborateurs efficacement grâce à des contenus pédagogiques clairs et engageants.",
    icon: "learning",
  },
  {
    title: "Vidéo tutorielle / démo",
    description:
      "Expliquez l'utilisation de vos produits pas à pas, pour réduire le support et rassurer vos clients.",
    icon: "play",
  },
  {
    title: "Publicité web ou TV",
    description:
      "Des films publicitaires percutants, diffusés sur le web comme à la télévision, pour toucher votre cible.",
    icon: "tv",
  },
  {
    title: "Prises de vues drone",
    description:
      "Sublimez vos sites, événements et projets avec des prises de vue aériennes spectaculaires.",
    icon: "drone",
  },
  {
    title: "Diffusion & page web vidéo",
    description:
      "De la stratégie de diffusion à l'intégration sur une page web optimisée : nous vous accompagnons jusqu'au bout.",
    icon: "share",
  },
];

// Tarifs — prix "à partir de", positionnement corporate moyenne-haute gamme.
export type PricePack = {
  title: string;
  icon: string;
  from: number; // euros
  unit?: string; // "jour", "module"…
  note: string;
  highlight?: boolean;
};

export const pricing: PricePack[] = [
  {
    title: "Film d'entreprise / institutionnel",
    icon: "building",
    from: 3500,
    note: "Écriture, tournage, montage et étalonnage d'un film qui raconte qui vous êtes.",
    highlight: true,
  },
  {
    title: "Couverture d'événement",
    icon: "event",
    from: 1200,
    unit: "jour",
    note: "Séminaires, conférences, lancements : vos temps forts capturés fidèlement.",
  },
  {
    title: "Publicité web ou TV",
    icon: "tv",
    from: 6000,
    note: "Un spot percutant, du concept à la diffusion, pensé pour votre cible.",
  },
  {
    title: "Motion design",
    icon: "motion",
    from: 2200,
    note: "Une animation sur-mesure pour rendre clair et désirable un concept ou un service.",
  },
  {
    title: "Vidéo produit / présentation",
    icon: "box",
    from: 2000,
    note: "Mettez en valeur un produit, un service ou une activité.",
  },
  {
    title: "Interview",
    icon: "mic",
    from: 1500,
    note: "Dirigeants, collaborateurs ou clients : une parole soignée et authentique.",
  },
  {
    title: "Video learning / formation",
    icon: "learning",
    from: 1500,
    unit: "module",
    note: "Des contenus pédagogiques clairs et engageants pour former vos équipes.",
  },
  {
    title: "Prises de vues drone",
    icon: "drone",
    from: 700,
    note: "En complément d'un projet ou en autonomie : des plans aériens qui subliment vos images.",
  },
];

export function formatPrice(n: number): string {
  return n.toLocaleString("fr-FR") + " €";
}

/**
 * Logos clients — fonds détourés en transparent
 * (scripts/process-logos.mjs et scripts/process-brand-logos.mjs).
 * Les grandes marques sont placées en tête.
 */
export const clientLogos = [
  // — mises en avant —
  { name: "EDF", src: "/logos/edf.png" },
  { name: "KFC", src: "/logos/kfc.png" },
  { name: "Paris Saint-Germain", src: "/logos/psg.png" },
  { name: "Al Jazeera", src: "/logos/aljazeera.png" },
  { name: "AJ+", src: "/logos/ajplus.png" },
  { name: "Sandaya", src: "/logos/sandaya.png" },
  { name: "FC Sochaux-Montbéliard", src: "/logos/sochaux.png" },
  { name: "Hirsch Isolation", src: "/logos/hirsch.png" },
  { name: "Burger Addict", src: "/logos/burger-addict.png" },
  // — autres références —
  { name: "Agence PGO", src: "/logos/agence-pgo.png" },
  { name: "GE Digital", src: "/logos/ge-digital.png" },
  { name: "Claridge Events", src: "/logos/claridge.png" },
  { name: "SPLF", src: "/logos/splf.png" },
  { name: "MFR", src: "/logos/mfr.png" },
  { name: "ISC", src: "/logos/isc.png" },
  { name: "Empreinte", src: "/logos/empreinte.png" },
  { name: "UMMA", src: "/logos/umma-2.png" },
  { name: "Monde Propreté", src: "/logos/monde-proprete.png" },
  { name: "Pharmacie", src: "/logos/pharmacie.png" },
  { name: "Habibi's", src: "/logos/habibis.png" },
];

export type TeamMember = {
  name: string;
  role: string;
};

export const team: TeamMember[] = [
  { name: "Dhia Ben Naser", role: "Coordinateur artistique" },
  { name: "Henri Dubreuil", role: "Relation client" },
];

export const stats = [
  { value: "10+", label: "types de prestations vidéo" },
  { value: "40+", label: "marques accompagnées" },
  { value: "100%", label: "sur-mesure, du brief à la diffusion" },
];

export { posts, type Post } from "./articles";

/**
 * Showreel — master 1920x1080 récupéré depuis Wistia (bien meilleur que
 * l'ancien fichier du site, recadré et compressé à 417 kbps).
 *  - `mp4`  : boucle de 30 s, muette, pour le fond du hero
 *  - `full` : showreel complet 70 s avec son, pour la lecture à la demande
 */
export const showreel = {
  mp4: "/video/showreel.mp4",
  full: "/video/showreel-full.mp4",
  poster: "/video/poster.jpg",
};

// Showreel 2022 auto-hébergé (téléchargé depuis la chaîne YouTube Feniks),
// boucle muette de 30 s pour les sections "prestations" / "pourquoi nous".
export const showreel2022 = {
  mp4: "/video/showreel-2022.mp4",
  poster: "/video/poster-2022.jpg",
};

// Réalisations — vraies miniatures de projets récupérées du site
export type Work = {
  title: string;
  client: string;
  category: string;
  image: string;
};

export const works: Work[] = [
  {
    title: "EDF",
    client: "Film corporate",
    category: "Film d'entreprise",
    image: "/portfolio/edf.jpg",
  },
  {
    title: "KFC — Foot5 Cup",
    client: "KFC",
    category: "Publicité",
    image: "/portfolio/kfc.jpg",
  },
  {
    title: "LinkedIn Local Toulouse",
    client: "LinkedIn",
    category: "Couverture d'événement",
    image: "/portfolio/linkedin-local.jpg",
  },
  {
    title: "LFDE — SICAV ISR",
    client: "La Financière de l'Échiquier",
    category: "Film corporate",
    image: "/portfolio/lfde.jpg",
  },
  {
    title: "Actility",
    client: "Actility",
    category: "Motion design",
    image: "/portfolio/actility.jpg",
  },
  {
    title: "Arabel FM",
    client: "Arabel FM",
    category: "Couverture d'événement",
    image: "/portfolio/arabel-fm.jpg",
  },
  {
    title: "Blue Project",
    client: "Blue Project",
    category: "Motion design",
    image: "/portfolio/blue-project.jpg",
  },
  {
    title: "Highlander Adventures",
    client: "Highlander",
    category: "Présentation d'activité",
    image: "/portfolio/highlander.jpg",
  },
  {
    title: "Agence PGO — Carcassonne",
    client: "Agence PGO",
    category: "Événementiel",
    image: "/portfolio/agence-pgo.jpg",
  },
  {
    title: "Thouron Chapiteaux",
    client: "Thouron",
    category: "Timelapse & drone",
    image: "/portfolio/thouron.jpg",
  },
  {
    title: "Water Challenge",
    client: "Water Challenge",
    category: "Série vidéo",
    image: "/portfolio/water-challenge.jpg",
  },
  {
    title: "Ekinote",
    client: "Ekinote",
    category: "Motion design",
    image: "/portfolio/ekinote.jpg",
  },
  {
    title: "Claridge Events",
    client: "Claridge",
    category: "Couverture d'événement",
    image: "/portfolio/claridge.jpg",
  },
  {
    title: "Inauguration Paris 13",
    client: "SPLF",
    category: "Événementiel",
    image: "/portfolio/splf-inauguration.jpg",
  },
  {
    title: "Monsieur Store",
    client: "Monsieur Store",
    category: "Publicité",
    image: "/portfolio/monsieur-store.jpg",
  },
  {
    title: "UMMA — Spot",
    client: "UMMA",
    category: "Publicité",
    image: "/portfolio/ummanite.jpg",
  },
  {
    title: "L'Empreinte",
    client: "L'Empreinte",
    category: "Prise de vue drone",
    image: "/portfolio/lempreinte-drone.jpg",
  },
  {
    title: "Paymed Consulting",
    client: "Paymed",
    category: "Film corporate",
    image: "/portfolio/paymed.jpg",
  },
  {
    title: "Yusof Handmade Carpets",
    client: "Yusof",
    category: "Film produit",
    image: "/portfolio/yusof.jpg",
  },
  {
    title: "Jardin Coquille",
    client: "Jardin Coquille",
    category: "Film d'entreprise",
    image: "/portfolio/jardin-coquille.jpg",
  },
  {
    title: "Séminaire SPLF",
    client: "SPLF",
    category: "Couverture d'événement",
    image: "/portfolio/seminaire-splf.jpg",
  },
  {
    title: "Master Marketing Pharma",
    client: "Université",
    category: "Video learning",
    image: "/portfolio/master-pharma.jpg",
  },
];
