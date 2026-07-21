# Feniks Studios — site web (Next.js)

Reconstruction moderne du site [feniksstudios.com](https://feniksstudios.com) :
boîte de production audiovisuelle parisienne fondée en 2014.

Site vitrine rapide, sécurisé et gratuit à héberger, qui remplace l'ancien
WordPress. Design cinématographique sombre à accent doré, formulaire de devis
multi-étapes, blog, SEO intégré.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- Polices : Montserrat + Raleway (auto-hébergées via `next/font`)
- Envoi d'email : **Resend** (via une Server Action)

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

## Configuration de l'envoi des devis

Le formulaire de contact envoie les demandes par email via Resend.

1. Créez un compte gratuit sur https://resend.com
2. Générez une clé API
3. Copiez `.env.example` en `.env.local` et renseignez :
   - `RESEND_API_KEY` — votre clé
   - `CONTACT_EMAIL` — l'adresse qui reçoit les demandes
   - `CONTACT_FROM` — l'expéditeur (domaine vérifié, ou `onboarding@resend.dev` pour tester)

> Sans clé, le formulaire fonctionne en **mode démo** : la demande est
> journalisée dans la console serveur mais aucun email n'est envoyé.

## Structure

```
app/
  layout.tsx            En-tête, pied de page, polices, SEO global
  page.tsx              Accueil
  agence/               L'agence (positionnement, prestations, équipe)
  realisations/         Portfolio
  blog/                 Liste + article [slug]
  contact/              Contact + formulaire de devis
  mentions-legales/     RGPD / mentions
  actions.ts            Server Action d'envoi d'email
  sitemap.ts, robots.ts SEO
components/              Composants UI (Header, Footer, Hero, cartes…)
lib/content.ts          TOUT le contenu éditable (textes, services, témoignages, blog)
```

### Modifier le contenu

L'essentiel du contenu (services, témoignages, équipe, articles, coordonnées,
réseaux sociaux) se trouve dans **`lib/content.ts`**. Pas besoin de toucher au
design pour mettre à jour les textes.

## À compléter / remplacer

- **Articles de blog** : les corps d'articles (`app/blog/[slug]/page.tsx`) sont
  génériques ; remplacer par le vrai contenu rédactionnel.
- **Mentions légales** : compléter raison sociale, SIRET, hébergeur.
- **Photos de tournage** : une seule vraie photo « coulisses » a pu être
  récupérée de l'ancien site (`public/photos/tournage.jpg`).

## Mise en ligne

### 1. Déployer sur Vercel

```bash
npm i -g vercel
vercel            # aperçu
vercel --prod     # production
```

### 2. Variables d'environnement (Vercel > Settings > Environment Variables)

Voir `.env.example`. Les deux obligatoires en production :

| Variable | Rôle | Sans elle |
|---|---|---|
| `RESEND_API_KEY` | Envoi des demandes de devis | Le formulaire affiche une erreur avec l'email de secours et journalise la demande |
| `ADMIN_PASSWORD` | Accès au dashboard `/admin` | `/admin` renvoie 503 |

### 3. Brancher le domaine

Vercel > Settings > Domains > ajouter `feniksstudios.com`, puis créer chez le
registrar les enregistrements DNS indiqués par Vercel. **C'est cette étape qui
remplace l'ancien site WordPress** — à faire en dernier, une fois le reste validé.

### 4. Emails : domaine vérifié

Tant que `feniksstudios.com` n'est pas vérifié chez Resend, l'expéditeur reste
`onboarding@resend.dev` (les emails arrivent, mais peuvent tomber en indésirables).
Vérifier le domaine chez Resend, puis passer `CONTACT_FROM` sur
`contact@feniksstudios.com`.

## Dashboard en production ⚠️

Le dashboard `/admin` écrit dans `data/portfolio.json` et `public/portfolio/`.
**Vercel a un système de fichiers en lecture seule** : en l'état, ajouter ou
modifier une vidéo en ligne renverra une erreur 503 explicite
(`StorageReadOnlyError`) — rien n'est perdu en silence, mais rien n'est
enregistré non plus.

Pour rendre le dashboard pleinement opérationnel en ligne, il faut brancher une
base de données + un stockage de fichiers (Supabase convient et son offre
gratuite suffit). Toute la logique est isolée dans `lib/portfolio.ts` : seul ce
fichier est à réécrire, le reste du site n'y touche pas.

En attendant, la mise à jour du portfolio se fait **en local** puis on redéploie.

## Build de production

```bash
npm run build
npm run start
```
