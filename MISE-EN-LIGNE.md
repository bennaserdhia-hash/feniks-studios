# Mise à jour du site Feniks Studios

Le domaine est déjà relié à Vercel et les variables de portfolio et de contact sont configurées dans les environnements Preview et Production. Utiliser le lien de projet existant `.vercel/project.json`.

1. Lancer `npm run lint`, `npm run test:quote` et `npm run build`.
2. Déployer une prévisualisation avec `vercel --yes --scope feniks-studios`.
3. Contrôler les pages, le sitemap et plusieurs anciennes URL. Une prévisualisation peut être protégée par Vercel ; `vercel curl / --deployment URL` utilise la session authentifiée pour la lire.
4. Publier la version validée avec `vercel --prod --yes --scope feniks-studios`.
5. Contrôler le site public et suivre ensuite les données Search Console.

La mise à jour des sources ne demande aucune modification DNS. Les enregistrements Google Workspace doivent conserver leur configuration de messagerie.

Les tests du formulaire sont simulés et ne transmettent pas de messages. Pour vérifier la réception réelle d’un devis, organiser un test explicitement autorisé avec une adresse et un brief de test.

Le sitemap final à soumettre dans Search Console est `https://www.feniksstudios.com/sitemap.xml`. La soumission et l’observation des performances nécessitent l’accès au compte concerné.
