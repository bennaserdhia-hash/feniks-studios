// Contenu de la landing page « Prise de vue aérienne pour l'architecture
// et l'immobilier » (/drone-architecture).
// Les chiffres de références proviennent des factures 2019-2025 : ne les
// augmenter qu'avec de nouvelles missions facturées.

export const references = {
  missions: "40+",
  since: "2019",
};

// Communes survolées pour des programmes immobiliers (missions facturées
// ou dossiers de prises de vue livrés).
export const communes = [
  "Alfortville",
  "Antony",
  "Asnières-sur-Seine",
  "Aubervilliers",
  "Bobigny",
  "Boulogne-Billancourt",
  "Bussy-Saint-Georges",
  "Champigny-sur-Marne",
  "Chartres",
  "Châtillon",
  "Clamart",
  "Creil",
  "Élancourt",
  "Fontenay-aux-Roses",
  "Gennevilliers",
  "Gentilly",
  "Île de Ré",
  "Issy-les-Moulineaux",
  "Ivry-sur-Seine",
  "Le Blanc-Mesnil",
  "Le Chesnay",
  "Le Perreux-sur-Marne",
  "Le Pré-Saint-Gervais",
  "Les Clayes-sous-Bois",
  "Maisons-Alfort",
  "Montigny-lès-Cormeilles",
  "Nanterre",
  "Paris 12e",
  "Pierrefitte-sur-Seine",
  "Rosny-sous-Bois",
  "Saint-Denis",
  "Saint-Germain-en-Laye",
  "Sartrouville",
  "Stains",
  "Suresnes",
  "Triel-sur-Seine",
  "Troyes",
  "Vanves",
];

// Diaporama d'ouverture : une photo par programme, en 2400 px.
export const heroSlides = [
  {
    image: "/drone-architecture/slides/issy-panorama.webp",
    alt: "Issy-les-Moulineaux vue du ciel, immeubles neufs et tours, la tour Eiffel et Montparnasse à l’horizon",
    place: "Issy-les-Moulineaux",
    date: "mai 2022",
  },
  {
    image: "/drone-architecture/slides/nanterre-la-defense.webp",
    alt: "Vue depuis un futur étage du programme Beau Chemin à Nanterre, les tours de La Défense à l’horizon",
    place: "Beau Chemin, Nanterre",
    date: "janvier 2024",
  },
  {
    image: "/drone-architecture/slides/boulogne-heure-bleue.webp",
    alt: "Boulogne-Billancourt au drone à l’heure bleue, la tour Eiffel illuminée au loin",
    place: "Evodia, Boulogne-Billancourt",
    date: "décembre 2022",
  },
  {
    image: "/drone-architecture/slides/paris-12-terrasse.webp",
    alt: "Vue depuis une terrasse du 12e arrondissement de Paris, toits et façades haussmanniennes au soleil couchant",
    place: "Paris 12e",
    date: "avril 2023",
  },
  {
    image: "/drone-architecture/slides/gennevilliers-terrain.webp",
    alt: "Terrain nu à Gennevilliers vu en plongée avant la construction du programme",
    place: "ROOJ, Gennevilliers",
    date: "août 2024",
  },
  {
    image: "/drone-architecture/slides/chatillon-panorama.webp",
    alt: "Châtillon vu du ciel, toitures végétalisées et pavillons, Paris à l’horizon",
    place: "Châtillon",
    date: "avril 2022",
  },
  {
    image: "/drone-architecture/hero-quartier-livre.webp",
    alt: "Vue aérienne du quartier Jean Zay à Antony après livraison, immeubles blancs et toitures végétalisées",
    place: "Quartier Jean Zay, Antony",
    date: "mai 2024",
  },
];

// Films 3D publiés par les studios et promoteurs à partir de nos prises de
// vue. Nous ne réalisons pas ces films : la carte montre notre image et
// renvoie vers la publication d'origine.
export const publishedFilms = [
  {
    city: "Gennevilliers",
    year: "2024",
    programme: "Programme ROOJ",
    delivered:
      "Photolocalisation 360° à 120 m, perspectives aérienne et terrasse, 90 images pour la maquette d’environnement.",
    image: "/drone-architecture/gennevilliers-terrain.webp",
    alt: "Terrain nu à Gennevilliers photographié au drone avant la construction",
    film: "Teaser 3D « Le bâtiment prend vie »",
    url: "https://www.youtube.com/watch?v=VCl4V3-oXNk",
  },
  {
    city: "Nanterre",
    year: "2023",
    programme: "Beau Chemin, ancien hôpital Max Fourestier",
    delivered:
      "Prises de vue aériennes du site et vues depuis les futurs étages, face à La Défense.",
    image: "/drone-architecture/nanterre-vue-etage.webp",
    alt: "Vue depuis un futur étage à Nanterre, avec les tours de La Défense à l’horizon",
    film: "Film du programme",
    url: "https://vimeo.com/907528728",
  },
  {
    city: "Boulogne-Billancourt",
    year: "2022",
    programme: "Programme Evodia",
    delivered:
      "Vol de jour et vol à l’heure bleue, tour Eiffel dans l’axe, pour le film et le teaser.",
    image: "/drone-architecture/boulogne-nuit.webp",
    alt: "Boulogne-Billancourt au drone à l’heure bleue, tour Eiffel illuminée au loin",
    film: "Film du programme",
    url: "https://vimeo.com/778562179",
  },
  {
    city: "Issy-les-Moulineaux",
    year: "2024",
    programme: "ZAC Léon Blum, îlots A3-A4",
    delivered:
      "Panoramas 360° au-dessus du chantier en 2021, puis vues depuis les futurs étages, du R+6 au R+10.",
    image: "/drone-architecture/issy-chantier.webp",
    alt: "Immeubles en gros œuvre et grues à tour dans la ZAC Léon Blum à Issy-les-Moulineaux",
    film: "Film du programme",
    url: "https://vimeo.com/913688892",
  },
];

export const audiences = [
  {
    title: "Promoteurs immobiliers",
    text: "Visuels de commercialisation, vues depuis les étages, suivi de chantier pour vos acquéreurs.",
  },
  {
    title: "Architectes & urbanistes",
    text: "Vues de contexte pour concours et permis, insertion paysagère, documentation de l'ouvrage livré.",
  },
  {
    title: "Studios de perspectives 3D",
    text: "Prises de vue géolocalisées et calées en altitude, prêtes pour l'insertion de vos rendus.",
  },
  {
    title: "Constructeurs & entreprises générales",
    text: "Avancement du gros œuvre, reporting maître d'ouvrage, images de référence pour vos appels d'offres.",
  },
  {
    title: "Collectivités & aménageurs",
    text: "Projets urbains, ZAC et renouvellement de quartier racontés avant, pendant et après.",
  },
  {
    title: "Bailleurs sociaux",
    text: "Réhabilitations, démolitions et livraisons documentées pour vos habitants et partenaires.",
  },
];

export const useCases = [
  {
    title: "Insertion 3D & photomontage",
    text: "Nous volons aux coordonnées, à l'altitude et au cap demandés pour que votre perspective s'insère sans retouche. Panoramas 360° sphériques sur demande.",
    image: "/drone-architecture/gennevilliers-360.webp",
    alt: "Panorama 360° de photolocalisation pris à 120 mètres au-dessus de Gennevilliers",
  },
  {
    title: "Commercialisation",
    text: "Le bâtiment dans son environnement : transports, parcs, vues dégagées. Les images qui rassurent un acquéreur avant la visite.",
    image: "/drone-architecture/val-d-oise-residence.webp",
    alt: "Résidence neuve en brique et enduit blanc au milieu des pavillons, dans le Val-d'Oise",
  },
  {
    title: "Suivi de chantier",
    text: "Mêmes points de vue à chaque passage, pour comparer les étapes. Un mini-clip monté par passage pour vos réseaux et vos réservataires.",
    image: "/drone-architecture/chantier-grues.webp",
    alt: "Chantier en gros œuvre avec grues à tour, quartier Jean Zay à Antony en mai 2023",
  },
  {
    title: "Vues zénithales",
    text: "Vue à la verticale du site, utile pour lire un plan masse, des espaces verts ou l'organisation d'un îlot.",
    image: "/drone-architecture/chatillon-zenithale.webp",
    alt: "Vue zénithale d'un carrefour et de pavillons à Châtillon",
  },
  {
    title: "Façades & toitures",
    text: "Plans rapprochés sur les matériaux, les balcons, les toitures végétalisées ou photovoltaïques, sans nacelle ni échafaudage.",
    image: "/drone-architecture/facade-detail.webp",
    alt: "Détail de façade en pierre claire avec garde-corps vitrés, pris en drone",
  },
  {
    title: "Livraison & inauguration",
    text: "L'ouvrage terminé, ses cours et ses espaces partagés, avant l'arrivée des occupants ou le jour de l'inauguration.",
    image: "/drone-architecture/paris-12-rue-nuit.webp",
    alt: "Immeuble neuf à l'angle d'une rue du 12e arrondissement de Paris, à la tombée de la nuit",
  },
];

export const timeline = [
  {
    date: "Mai 2023",
    label: "Gros œuvre",
    image: "/drone-architecture/suivi-01-mai-2023.webp",
  },
  {
    date: "Sept. 2023",
    label: "Hors d'eau",
    image: "/drone-architecture/suivi-02-sept-2023.webp",
  },
  {
    date: "Fév. 2024",
    label: "Rooftops & façades",
    image: "/drone-architecture/suivi-03-fev-2024.webp",
  },
  {
    date: "Mai 2024",
    label: "Quartier livré",
    image: "/drone-architecture/suivi-04-mai-2024.webp",
  },
];

export const steps = [
  {
    title: "Brief et points de vue",
    text: "Vous nous transmettez l'adresse, le plan masse ou les vues souhaitées. Nous préparons un plan de vol géolocalisé : position, altitude et orientation de chaque prise.",
  },
  {
    title: "Démarches et autorisations",
    text: "Nous prenons en charge les déclarations préalables auprès de la DGAC et les autorisations du site. Une lettre de mission du maître d'ouvrage suffit de votre côté.",
  },
  {
    title: "Vol au bon créneau",
    text: "Nous calons la date sur la météo et la lumière. Si le ciel ne permet pas un rendu à la hauteur, le vol est reporté sans frais.",
  },
  {
    title: "Sélection et retouche",
    text: "Tri, redressement des verticales, colorimétrie homogène, assemblage des panoramas 360°. Les clips sont montés et habillés à vos couleurs.",
  },
  {
    title: "Livraison exploitable",
    text: "JPG haute définition, RAW (DNG) pour vos graphistes, vidéo 4K, et les coordonnées GPS et altitudes de chaque prise pour l'insertion 3D.",
  },
];

export const packs = [
  {
    name: "Point de vue",
    price: 700,
    unit: "passage",
    pitch: "Pour l'insertion 3D, le photomontage ou une vue de contexte.",
    features: [
      "1 vol, jusqu'à 4 points de vue calés",
      "Photos HD + RAW, panorama 360° si besoin",
      "Coordonnées GPS et altitude de chaque prise",
      "Démarches DGAC incluses",
    ],
  },
  {
    name: "Commercialisation",
    price: 1450,
    unit: "programme",
    highlight: true,
    pitch: "Pour vendre un programme : l'aérien, le sol et un clip prêt à diffuser.",
    features: [
      "Demi-journée de prises de vue aériennes et au sol",
      "25 photos retouchées",
      "1 clip de 30 à 45 s, en 16:9 et en vertical",
      "Rushs vidéo 4K livrés",
      "Démarches DGAC incluses",
    ],
  },
  {
    name: "Suivi de chantier",
    price: 1450,
    unit: "passage",
    pitch: "Pour raconter un chantier, de la première grue à la livraison.",
    features: [
      "Mêmes points de vue à chaque passage",
      "Photos aériennes et au sol",
      "1 mini-clip monté par passage",
      "Tarif dès 4 passages planifiés",
      "Démarches DGAC incluses",
    ],
  },
];

export const options = [
  { label: "Reportage photo au sol complémentaire", price: "350 € HT" },
  { label: "Vidéo aérienne complémentaire", price: "250 € HT" },
  { label: "Passage supplémentaire le même jour", price: "350 € HT" },
  { label: "Déplacement hors Île-de-France", price: "Sur devis" },
];

export const faq = [
  {
    q: "Pouvez-vous voler en ville, y compris à Paris ?",
    a: "Oui, la plupart des missions que nous réalisons ont lieu en zone urbaine dense, en Île-de-France et à Paris. Les vols y sont soumis à déclaration ou autorisation préalable : nous vérifions la faisabilité dès le brief et nous nous chargeons des démarches.",
  },
  {
    q: "Quel délai prévoir avant le vol ?",
    a: "Comptez quelques jours ouvrés pour les démarches, davantage dans les zones les plus réglementées. Indiquez-nous votre échéance (dépôt de permis, lancement commercial, inauguration) : nous construisons le planning à partir d'elle.",
  },
  {
    q: "Que se passe-t-il s'il pleut le jour prévu ?",
    a: "Nous reportons le vol à la prochaine fenêtre favorable, sans frais. Un ciel gris ne donne pas des images de commercialisation, et nous préférons attendre.",
  },
  {
    q: "Les images sont-elles utilisables pour une insertion 3D ?",
    a: "C'est l'une de nos spécialités : nous respectons les coordonnées, les altitudes et les focales demandées, et nous livrons les métadonnées de chaque prise ainsi que les fichiers RAW.",
  },
  {
    q: "Puis-je utiliser les images sur mes supports commerciaux ?",
    a: "Oui. Les droits d'utilisation pour votre communication (site, brochures, panneaux de chantier, réseaux sociaux) sont inclus et précisés dans le devis.",
  },
  {
    q: "Travaillez-vous avec les studios de perspectives et les agences ?",
    a: "Oui, une grande partie de nos vols est commandée par des studios de perspectives 3D. Pour un volume régulier, nous proposons des conditions dédiées.",
  },
];
