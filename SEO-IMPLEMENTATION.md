# Corrections SEO Feniks Studios — 11 octobre 2026

## État

Les modifications sont terminées et testées. Prévisualisation hébergée : https://feniks-studios-zmkx-lhr9eye29-feniks-studios.vercel.app

L’accord de publication a été donné. La version validée est publiée sur https://www.feniksstudios.com depuis le 11 octobre 2026. Les 80 URL du sitemap et les 100 variantes des anciennes URL ont été contrôlées sur le domaine public sans échec.

## Corrections réalisées

- 50 redirections permanentes entre les anciennes réalisations WordPress et leurs destinations correspondantes ; les deux projets historiques manquants ont été restaurés depuis les contenus et images conservés.
- Sitemap dynamique de 80 URL sur la prévisualisation avec le portfolio Supabase actuel, contre 11 dans l’audit initial.
- Canonical propres à chaque page, domaine www cohérent, robots corrigé, métadonnées Open Graph et images de partage.
- Six articles distincts, sommaires, auteur institutionnel, dates de mise à jour et durées de lecture calculées.
- Dix pages de prestations, navigation et liens vers les articles, tarifs et projets pertinents.
- Titres distincts pour les cinq films Sandaya, suppression de la description constituée d’une URL YouTube, et titres spécifiques pour les noms de projets trop longs.
- Organization, Article, Service, BreadcrumbList et VideoObject lorsque la date de publication et l’identifiant vidéo ont été vérifiés.
- Vidéos mobiles et secondaires chargées à la demande, affiches WebP, boucle de prévisualisation compressée et réduction du JavaScript inutile dans la navigation.
- Contenus visibles sans JavaScript, libellés de formulaire associés, champs conservés après erreur et pièces jointes réelles jusqu’à 3 Mo.
- Or d’origine #DEB267 et encre or #9A6F28 restaurés selon la demande. Les variantes assombries ont été retirées.

## Vérifications

- Compilation Next.js et TypeScript : réussie localement et sur Vercel.
- ESLint : réussi.
- Dix tests de devis avec fournisseur simulé : réussite, aucun email réel envoyé.
- Localement : 79 URL du sitemap et 100 variantes de redirection contrôlées sans échec. Le fichier local de repli comporte un projet de moins que la base de production.
- Prévisualisation : sitemap de 80 URL, page prestation, article et ancienne réalisation vérifiés HTTP 200 avec canonical correct.
- Navigateur : absence d’erreur React, absence de débordement horizontal sur les pages contrôlées, conservation du message et de la pièce jointe après une erreur d’email, accueil visible sans JavaScript.
- Couleur calculée des accents or : rgb(222, 178, 103), soit #DEB267.

La mesure locale de performance, avant le rétablissement final de la palette, indique environ 0,81 Mo chargés, un LCP de 3,08 s et 94/100 en performance. La mesure initiale du domaine public était d’environ 14,6 Mo et 4,56 s. Les origines de test diffèrent ; il faudra confirmer les mesures sur le domaine public après publication. Les anciens scores d’accessibilité de la variante assombrie ne décrivent pas la palette finale conservée.

## Informations et accès restant nécessaires

La raison sociale exacte, le SIRET, le directeur de publication et l’adresse publique sont à confirmer. Les variables LEGAL_ENTITY_NAME, LEGAL_SIRET, LEGAL_PUBLICATION_DIRECTOR et LEGAL_PUBLIC_ADDRESS permettent leur intégration. Les coordonnées n’ont pas été inventées.

La soumission du sitemap et l’analyse des impressions, clics, positions et conversions nécessitent l’accès à Google Search Console. Aucun profil Google Business n’a été modifié.

## Publication et retour arrière

Version précédente : dpl_7BmqFZoCkAeBbVfe7meigV1nnkdL.

Pour les prochaines mises à jour, publier avec `vercel deploy --prod --yes --scope feniks-studios`, puis vérifier le domaine public. Le déploiement n’exige aucune modification DNS.

Les fichiers de configuration, contenus et procédures sont documentés dans README.md. Les modifications préexistantes de proxy.ts et de la route de callback LinkedIn ont été conservées.

## Boutons restaurés

Fond doré, texte et flèche blancs, bordures, espacements et ombres des boutons conservés comme dans la version d’origine. Les teintes de texte secondaire et les retours à la ligne automatiques ajoutés ont également été rétablis.

Déploiement de production validé : dpl_4s467QDPpompgAKGHdhRQToS7Uis.
