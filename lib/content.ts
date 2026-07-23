/* ============================================================
   Contenu du site Feniks Studios
   Extrait du site existant (feniksstudios.com) et restructuré.
   ============================================================ */

export const site = {
  name: "Feniks Studios",
  tagline: "Expert en audiovisuel d'entreprise",
  baseline: "En perpétuel renouvellement créatif",
  founded: 2014,
  kicker: "Boîte de production parisienne · Fondée en 2014",
  // Accroche accueil : comprendre → raconter → exécuter
  pitch:
    "Comprendre votre produit, votre histoire et ce qui fait votre âme — puis en tirer un récit. C'est là que se joue la vraie valeur d'une boîte de production : la maîtrise du storytelling, servie par une exigence technique haut de gamme.",
  mission:
    "Comprendre les entreprises en profondeur pour transformer ce qu'elles sont en récits qui marquent — et leur donner, grâce à la vidéo, les moyens de se démarquer.",
  locations: ["Paris"],
  email: "contact@feniksstudios.com",
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/feniks-studios/" },
    { name: "Instagram", href: "https://www.instagram.com/feniks_studios_creators" },
    { name: "YouTube", href: "https://www.youtube.com/c/FeniksstudiosAudiovisuel" },
    { name: "Vimeo", href: "https://vimeo.com/feniksstudios" },
    { name: "Facebook", href: "https://fr-fr.facebook.com/pages/Feniks-Studios/392813130786210" },
    { name: "Twitter", href: "https://twitter.com/FeniksStudios" },
  ],
};

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "L'agence", href: "/agence" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

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

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Entre expertise technique et créativité, ils sont « force de proposition ». Avec eux, on fait mieux…",
    name: "Mehdi Maatoug",
    role: "Coach Développement personnel",
    photo: "/people/mehdi-maatoug.jpg",
  },
  {
    quote:
      "Le réalisateur a géré notre projet extrêmement bien et a respecté le calendrier très scrupuleusement. Il est fortement probable que nous fassions de nouveau appel à Feniks Studios. Je les recommande vivement !",
    name: "Philippe Teyssedre",
    role: "Chef de projet",
    photo: "/people/philippe-teyssedre.png",
  },
  {
    quote:
      "La couverture d'événement réalisée par Feniks Studios pour notre 1er séminaire en tant que Soccer Park Le Five nous a permis une restitution fidèle. Depuis, nous faisons régulièrement appel à eux pour nos vidéos. Qualité et professionnalisme sont au rendez-vous !",
    name: "Marc Dessenis",
    role: "Directeur Marketing et commercial — Soccer Park Le Five",
    photo: "/people/marc-dessenis.jpg",
  },
  {
    quote:
      "Nous sommes très satisfaits de la prestation. Les Rencontres de la Propreté sont une opportunité pour les élèves de rentrer facilement en contact avec les acteurs du monde économique. Feniks Studios nous permet de véhiculer notre connaissance et expertise du milieu éducatif.",
    name: "Nizarr Bourchada",
    role: "Chef de projet Formation",
    photo: "/people/nizarr-bourchada.jpg",
  },
  {
    quote:
      "Le projet a été accompli malgré un délai de réalisation relativement court. La publicité passe sur FR3 Auvergne. Ça percute, ils sont réactifs, pleins d'imagination et de suggestions. Un prix attractif qui nous a permis de communiquer avec cet outil vidéo. Vous pouvez leur faire confiance, sans aucune inquiétude.",
    name: "Dominique Listrat",
    role: "Directeur MFREO Saligny-sur-Roudon",
    photo: "/people/dominique-listrat.jpg",
  },
  {
    quote:
      "Équipe sérieuse et disponible, le résultat est à la hauteur de ce que nous souhaitions. Nous recommandons les services de l'équipe.",
    name: "Pierre Garrigues",
    role: "Directeur Agence PGO — Festival de la Photographie MAP Toulouse",
    photo: "/people/pierre-garrigues.jpg",
  },
];

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

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
};

export const posts: Post[] = [
  {
    slug: "investir-contenu-audiovisuel-qualite",
    title:
      "Pourquoi les entreprises devraient-elles investir dans la création de contenu audiovisuel de qualité ?",
    excerpt:
      "La vidéo est devenue le format roi. Découvrez pourquoi un contenu audiovisuel soigné est un investissement rentable pour votre marque.",
    category: "Stratégie",
    readingTime: "5 min",
  },
  {
    slug: "audiovisuel-reseaux-sociaux",
    title:
      "Comment l'utilisation de contenu audiovisuel peut-elle améliorer votre présence sur les réseaux sociaux ?",
    excerpt:
      "Portée, engagement, mémorisation : la vidéo transforme votre présence sociale. Voici comment en tirer parti.",
    category: "Réseaux sociaux",
    readingTime: "4 min",
  },
  {
    slug: "pourquoi-films-animation",
    title: "Pourquoi utiliser des films d'animation ?",
    excerpt:
      "Le motion design et l'animation permettent d'expliquer l'abstrait et de captiver. Quand et pourquoi les choisir ?",
    category: "Motion design",
    readingTime: "4 min",
  },
  {
    slug: "storytelling-strategie-marketing",
    title: "Pourquoi le storytelling est-il essentiel pour votre stratégie de marketing ?",
    excerpt:
      "Une bonne histoire crée de l'émotion et de la fidélité. Le storytelling vidéo au service de votre marque.",
    category: "Storytelling",
    readingTime: "6 min",
  },
  {
    slug: "audiovisuel-strategie-digitale",
    title:
      "Pourquoi la création de contenu audiovisuel est-elle cruciale pour votre stratégie digitale ?",
    excerpt:
      "SEO, conversion, engagement : la vidéo est un pilier de toute stratégie digitale performante.",
    category: "Digital",
    readingTime: "5 min",
  },
  {
    slug: "video-engagement-consommateurs",
    title: "Comment l'utilisation de vidéos peut améliorer l'engagement des consommateurs ?",
    excerpt:
      "De l'attention à l'action : comment la vidéo nourrit l'engagement à chaque étape du parcours client.",
    category: "Engagement",
    readingTime: "4 min",
  },
];

// Types de projet pour le formulaire de devis
export const projectTypes = [
  "Film Corporate / Institutionnel",
  "Couverture d'événement",
  "Pub Web / TV",
  "Interviews",
  "Motion Design",
  "Vidéos de Formation",
  "Prises de vues Drone",
  "Autre",
];

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

// Réalisations — vraies miniatures de projets récupérées du site
export type Work = {
  title: string;
  client: string;
  category: string;
  image: string;
};

export const works: Work[] = [
  { title: "EDF", client: "Film corporate", category: "Film d'entreprise", image: "/portfolio/edf.jpg" },
  { title: "KFC — Foot5 Cup", client: "KFC", category: "Publicité", image: "/portfolio/kfc.jpg" },
  { title: "LinkedIn Local Toulouse", client: "LinkedIn", category: "Couverture d'événement", image: "/portfolio/linkedin-local.jpg" },
  { title: "LFDE — SICAV ISR", client: "La Financière de l'Échiquier", category: "Film corporate", image: "/portfolio/lfde.jpg" },
  { title: "Actility", client: "Actility", category: "Motion design", image: "/portfolio/actility.jpg" },
  { title: "Arabel FM", client: "Arabel FM", category: "Couverture d'événement", image: "/portfolio/arabel-fm.jpg" },
  { title: "Blue Project", client: "Blue Project", category: "Motion design", image: "/portfolio/blue-project.jpg" },
  { title: "Highlander Adventures", client: "Highlander", category: "Présentation d'activité", image: "/portfolio/highlander.jpg" },
  { title: "Agence PGO — Carcassonne", client: "Agence PGO", category: "Événementiel", image: "/portfolio/agence-pgo.jpg" },
  { title: "Thouron Chapiteaux", client: "Thouron", category: "Timelapse & drone", image: "/portfolio/thouron.jpg" },
  { title: "Water Challenge", client: "Water Challenge", category: "Série vidéo", image: "/portfolio/water-challenge.jpg" },
  { title: "Ekinote", client: "Ekinote", category: "Motion design", image: "/portfolio/ekinote.jpg" },
  { title: "Claridge Events", client: "Claridge", category: "Couverture d'événement", image: "/portfolio/claridge.jpg" },
  { title: "Inauguration Paris 13", client: "SPLF", category: "Événementiel", image: "/portfolio/splf-inauguration.jpg" },
  { title: "Monsieur Store", client: "Monsieur Store", category: "Publicité", image: "/portfolio/monsieur-store.jpg" },
  { title: "UMMA — Spot", client: "UMMA", category: "Publicité", image: "/portfolio/ummanite.jpg" },
  { title: "L'Empreinte", client: "L'Empreinte", category: "Prise de vue drone", image: "/portfolio/lempreinte-drone.jpg" },
  { title: "Paymed Consulting", client: "Paymed", category: "Film corporate", image: "/portfolio/paymed.jpg" },
  { title: "Yusof Handmade Carpets", client: "Yusof", category: "Film produit", image: "/portfolio/yusof.jpg" },
  { title: "Jardin Coquille", client: "Jardin Coquille", category: "Film d'entreprise", image: "/portfolio/jardin-coquille.jpg" },
  { title: "Séminaire SPLF", client: "SPLF", category: "Couverture d'événement", image: "/portfolio/seminaire-splf.jpg" },
  { title: "Master Marketing Pharma", client: "Université", category: "Video learning", image: "/portfolio/master-pharma.jpg" },
];
