# Feniks Studios

Site public de production audiovisuelle, développé avec Next.js 16.2, React 19, TypeScript et Tailwind CSS 4. Le site est relié au projet Vercel existant `feniks-studios-zmkx`.

## Développement et vérification

```sh
npm run dev
npm run lint
npm run test:quote
npm run build
npm run start -- --port 4317
python3 scripts/verify-public-site.py http://localhost:4317
```

Le test de devis utilise un fournisseur email simulé : il contrôle les pièces jointes, les limites et les erreurs sans envoyer de message. Le contrôle du site parcourt son sitemap et les variantes des 50 anciennes URL.

## Contenus

- `lib/client-content.ts` : identité, navigation, témoignages et types de projet ; uniquement les données nécessaires aux composants interactifs.
- `lib/content.ts` : offre, tarifs et ressources du site.
- `data/articles.json` : les six articles, avec des sections distinctes. `lib/articles.ts` calcule la durée de lecture ; modifier la date de mise à jour lors d’un changement éditorial réel.
- `data/services.json` : les dix pages de prestations.
- `lib/portfolio.ts` : lecture du portfolio dans Supabase, avec repli local en lecture seule. Les opérations d’administration exigent Supabase.
- `data/project-editorial.json` : corrections de présentation sur les vues publiques ; elles ne modifient pas les enregistrements d’administration.
- `data/project-seo-titles.json` : titres SEO spécifiques pour les projets dont le nom complet est trop long.
- `data/archive-projects.json` : deux réalisations historiques restaurées ; elles sont ajoutées aux vues publiques si leur identifiant n’existe pas déjà dans la base.
- `data/legacy-redirects.json` : les 50 correspondances permanentes entre les anciennes et nouvelles réalisations.
- `data/video-publication-dates.json` : dates publiques vérifiées. Le `VideoObject` n’est émis que lorsque l’identifiant de la vidéo correspond à la date enregistrée. Ajouter une date vérifiée pour les nouveaux projets, sans utiliser la date d’ajout dans la base comme date de publication du film.

Le sitemap est généré à partir du portfolio public et comprend les prestations et les articles. La régénération suit les nouveaux projets. Les URL canonical et les métadonnées de partage utilisent `https://www.feniksstudios.com`.

## Formulaire

Le formulaire transmet les demandes via Resend. Une pièce jointe de 3 Mo maximum est acceptée, dans les formats de document indiqués. La limite de la Server Action est de 4 Mo ; le plafond utilisateur laisse une marge pour les autres champs. Un lien peut être fourni dans le message pour un document plus volumineux.

Variables existantes : `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`. Ne jamais exposer les clés secrètes avec un préfixe `NEXT_PUBLIC_`.

Sans clé Resend en production, une erreur explicite est renvoyée. En développement, le mode de test ne transmet aucun email. Une erreur du fournisseur conserve les champs contrôlés dans le formulaire. Les événements Analytics concernent les étapes et le nombre de formats sélectionnés ; les informations personnelles et le contenu du brief n’y sont pas inclus.

## Mentions légales à finaliser avec les données validées

La page utilise les coordonnées publiques déjà disponibles et peut afficher ces variables serveur lorsqu’elles sont renseignées :

- `LEGAL_ENTITY_NAME` : raison sociale exacte.
- `LEGAL_SIRET` : identifiant d’établissement.
- `LEGAL_PUBLICATION_DIRECTOR` : directeur de publication.
- `LEGAL_PUBLIC_ADDRESS` : adresse à publier, validée par l’entreprise.

Ces données n’ont pas été inventées. Leur absence ne constitue pas une validation de complétude des mentions légales.

## Médias et performance

Sur mobile et avec une préférence de mouvement réduit ou d’économie de données, le showreel ne démarre pas automatiquement. L’affiche et le bouton permettent une lecture volontaire. Sur ordinateur, la version de prévisualisation peut se lancer lorsqu’elle entre dans l’écran. La vidéo secondaire est chargée à la demande.

Les masters sont conservés. Les affiches WebP et la boucle de prévisualisation sont les fichiers légers de diffusion. Le contenu est visible sans JavaScript ; l’animation d’apparition concerne les éléments situés plus bas dans la page.

## Déploiement

```sh
vercel --yes --scope feniks-studios
# après les contrôles de la prévisualisation :
vercel --prod --yes --scope feniks-studios
```

La configuration de domaine et de messagerie existe déjà. Une mise à jour du site ne nécessite pas de modifier les DNS ni les enregistrements de mail. Voir `MISE-EN-LIGNE.md` et le compte rendu `SEO-IMPLEMENTATION.md`.
