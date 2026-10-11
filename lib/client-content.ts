/* ============================================================
   Contenu du site Feniks Studios
   Extrait du site existant (feniksstudios.com) et restructuré.
   ============================================================ */

export const site = {
  name: "Feniks Studios",
  tagline: "Expert en audiovisuel d'entreprise",
  baseline: "En perpétuel renouvellement créatif",
  founded: 2014,
  kicker: "Agence de production parisienne · Fondée en 2014",
  // Accroche accueil : comprendre → raconter → exécuter
  pitch:
    "Comprendre votre produit, votre histoire et ce qui fait votre âme — puis en tirer un récit. C'est là que se joue la vraie valeur d'une agence de production : la maîtrise du storytelling, servie par une exigence technique haut de gamme.",
  mission:
    "Comprendre les entreprises en profondeur pour transformer ce qu'elles sont en récits qui marquent — et leur donner, grâce à la vidéo, les moyens de se démarquer.",
  locations: ["Paris"],
  email: "contact@feniksstudios.com",
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/feniks-studios/",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/feniks_studios_creators",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/c/FeniksstudiosAudiovisuel",
    },
    { name: "Vimeo", href: "https://vimeo.com/feniksstudios" },
    {
      name: "Facebook",
      href: "https://fr-fr.facebook.com/pages/Feniks-Studios/392813130786210",
    },
    { name: "Twitter", href: "https://twitter.com/FeniksStudios" },
  ],
};

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "L'agence", href: "/agence" },
  { label: "Prestations", href: "/prestations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "IA", href: "/ia" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Le réalisateur a géré notre projet extrêmement bien et a respecté le calendrier très scrupuleusement. Il est fortement probable que nous fassions de nouveau appel à Feniks Studios. Je les recommande vivement !",
    name: "Philippe Teyssedre",
    role: "Chef de projet — EDF",
    photo: "/people/philippe-teyssedre.png",
  },
  {
    quote:
      "Entre expertise technique et créativité, ils sont « force de proposition ». Avec eux, on fait mieux…",
    name: "Mehdi Maatoug",
    role: "Coach Développement personnel",
    photo: "/people/mehdi-maatoug.jpg",
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

// Types de projet pour le formulaire de devis
export const projectTypes = [
  "Production IA (IA ou IA pas ?)",
  "Film Corporate / Institutionnel",
  "Couverture d'événement",
  "Pub Web / TV",
  "Interviews",
  "Motion Design",
  "Vidéos de Formation",
  "Prises de vues Drone",
  "Autre",
];
