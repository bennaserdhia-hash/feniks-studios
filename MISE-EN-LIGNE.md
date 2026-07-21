# Mise en ligne — feniksstudios.com

Guide pas-à-pas. **Suis l'ordre** : le changement de DNS arrive en dernier, quand
tout le reste est validé. Tant qu'il n'est pas fait, l'ancien site reste en ligne
et personne ne voit rien.

---

## ⚠️ La règle à ne jamais oublier

Tes **emails sont chez Google Workspace**, ton **site chez OVH**. Les deux sont
indépendants.

> **Dans la zone DNS OVH, ne touche QU'AUX champs `A` et `www`.**
> **Ne supprime jamais les champs `MX`** (`aspmx.l.google.com`…).
> Si tu les effaces, `contact@feniksstudios.com` cesse de fonctionner.

---

## Étape 1 — Se connecter à Vercel

Dans un terminal, depuis le dossier du projet :

```bash
vercel login
```

Ça ouvre ton navigateur. Connecte-toi (Google, GitHub ou email).

---

## Étape 2 — Premier déploiement (URL de test)

```bash
vercel
```

Réponds aux questions :

| Question | Réponse |
|---|---|
| Set up and deploy? | **Y** |
| Which scope? | ton compte |
| Link to existing project? | **N** |
| Project name? | `feniks-studios` |
| In which directory is your code? | `./` |
| Modify settings? | **N** |

Tu obtiens une URL du type `https://feniks-studios-xxxx.vercel.app`.
**L'ancien site n'a pas bougé.**

---

## Étape 3 — Créer la clé email (Resend)

1. Crée un compte gratuit sur **https://resend.com** (3 000 emails/mois)
2. Menu **API Keys** → **Create API Key** → copie la clé (`re_...`)

---

## Étape 4 — Les variables d'environnement

Sur **vercel.com** → ton projet → **Settings** → **Environment Variables**.
Ajoute ces 4 lignes (coche les 3 environnements à chaque fois) :

| Name | Value |
|---|---|
| `RESEND_API_KEY` | la clé `re_...` de l'étape 3 |
| `CONTACT_EMAIL` | `contact@feniksstudios.com` |
| `ADMIN_USER` | `feniks` |
| `ADMIN_PASSWORD` | un mot de passe long, à toi |

Puis redéploie pour qu'elles soient prises en compte :

```bash
vercel --prod
```

---

## Étape 5 — Tout tester sur l'URL de test

- [ ] Les 5 pages s'affichent
- [ ] Le showreel se lance
- [ ] Une page projet lit bien la vidéo YouTube
- [ ] La plaquette se télécharge
- [ ] **Envoie une vraie demande de devis** → l'email arrive-t-il sur `contact@feniksstudios.com` ?
- [ ] `/admin` demande bien un mot de passe

⚠️ Ne passe à l'étape suivante que si **le test du formulaire est concluant**.

---

## Étape 6 — Brancher le domaine

### 6.1 Côté Vercel

Projet → **Settings** → **Domains** → ajoute `feniksstudios.com`.
Vercel affiche les valeurs à créer. **Utilise celles qu'il affiche**, ce sont
normalement :

| Type | Nom | Valeur |
|---|---|---|
| `A` | `@` (racine) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com.` |

### 6.2 Côté OVH

1. Connecte-toi sur **https://www.ovh.com/manager**
2. **Web Cloud** → **Noms de domaine** → `feniksstudios.com` → onglet **Zone DNS**
3. **Modifie** (ne supprime pas) la ligne existante :
   - Type `A`, cible `213.186.33.24` → remplace par **`76.76.21.21`**
4. **Modifie** la ligne `www` :
   - Si c'est un `A` vers `213.186.33.24` → supprime-la et crée un **`CNAME` `www` → `cname.vercel-dns.com.`**
   - (le point final fait partie de la valeur)
5. Il existe aussi une ligne `AAAA` (IPv6) vers `2001:41d0:...` → **supprime-la**,
   Vercel n'en a pas besoin et elle continuerait de pointer vers OVH.

### ✋ À NE PAS TOUCHER

```
MX   aspmx.l.google.com        ← tes emails
MX   alt1.aspmx.l.google.com
MX   alt2.aspmx.l.google.com
MX   alt3.aspmx.l.google.com
MX   alt4.aspmx.l.google.com
TXT  google-site-verification=...
```

### 6.3 Attendre

La propagation prend de **10 minutes à 4 heures**. Vercel affiche « Valid
Configuration » quand c'est bon, et génère le certificat HTTPS tout seul.

---

## Étape 7 — Emails propres (à faire dans la foulée)

Tant que le domaine n'est pas vérifié chez Resend, l'expéditeur est
`onboarding@resend.dev` : les emails arrivent, mais risquent l'onglet
« indésirables ».

1. Resend → **Domains** → **Add Domain** → `feniksstudios.com`
2. Resend donne des enregistrements **TXT** (DKIM) et parfois un **MX** sur un
   **sous-domaine** (`send.feniksstudios.com`). ⚠️ Un MX sur un sous-domaine ne
   touche pas ton mail principal — mais vérifie bien que le nom n'est pas `@`.
3. Ajoute-les dans la zone DNS OVH
4. Une fois vérifié, change dans Vercel :
   `CONTACT_FROM` = `Feniks Studios <contact@feniksstudios.com>`

### Corriger le SPF au passage

Ton SPF actuel est incohérent — il autorise OVH alors que tu envoies via Google :

```
v=spf1 include:mx.ovh.com ~all
```

À remplacer par (une seule ligne TXT sur `@`) :

```
v=spf1 include:_spf.google.com include:amazonses.com ~all
```

> `_spf.google.com` = ton Google Workspace · `amazonses.com` = l'infrastructure
> d'envoi de Resend. **Il ne doit y avoir qu'un seul enregistrement SPF** sur le
> domaine.

---

## Étape 8 — Filet de sécurité

- **Ne résilie pas l'hébergement OVH tout de suite.** Garde-le jusqu'à échéance :
  le WordPress reste intact, et un retour en arrière consiste juste à remettre
  l'ancienne IP `213.186.33.24` dans le champ `A`.
- Note quelque part l'ancienne valeur : **A → `213.186.33.24`**

---

## Mettre à jour le site plus tard

Le dashboard `/admin` ne peut pas enregistrer en ligne (disque Vercel en lecture
seule — voir README). En attendant la bascule vers une base de données :

```bash
# 1. lancer le site en local
npm run dev
# 2. modifier le portfolio sur http://localhost:3000/admin
# 3. publier
vercel --prod
```
