# Exotour — vitrine web B2B

Vitrine de présentation pour Exotour, destinée aux agences de voyage et
tour-opérateurs européens. Ce site n'est pas une marketplace de réservation :
c'est une vitrine de conviction, sans prix ni destinations précises, pensée
pour qualifier des partenaires potentiels via un formulaire de contact.

## Stack

- **Web / PWA** : React + Vite + TypeScript, Tailwind CSS, Zustand, React Router
- **Backend** : Firebase (Auth, Firestore, Cloud Functions, Cloud Storage, Hosting, Cloud Messaging)
- **Mobile** : Capacitor (wrapper autour du build web, iOS + Android — plateformes non ajoutées par défaut)
- **i18n** : i18next (FR par défaut, EN dès cette v1)
- **CI/CD** : GitHub Actions → Firebase Hosting (preview sur PR, prod sur merge vers `main`)
- **Scaffoldé, non actif** : Stripe/Stripe Connect, Didit (KYC), Mapbox, Recharts — voir plus bas

## Structure du repo

```
/apps/web           React + Vite + TS + Tailwind + Capacitor
  /src/pages         Les 6 pages de la vitrine
  /src/components     UI, layout, intégrations scaffoldées
  /src/locales        Traductions fr/ en
  /src/lib/firebase.ts  Client Firebase (lazy init)
/functions           Cloud Functions (TypeScript) — submitLead, notifyTeamOnNewLead
/integrations        Scaffolding non actif : /stripe, /didit
firebase.json, firestore.rules, storage.rules   Config Firebase (racine)
.github/workflows     CI/CD GitHub Actions
```

## Installation

Prérequis : Node.js 20+, npm 10+, un projet Firebase (Blaze plan requis pour
les Cloud Functions sortantes).

```bash
npm install
```

Le repo est un monorepo npm workspaces (`apps/web` + `functions`).

## Configuration Firebase

1. Créez un projet Firebase (console.firebase.google.com) et activez :
   Authentication, Firestore, Functions, Storage, Hosting, Cloud Messaging.
2. Copiez `apps/web/.env.example` vers `apps/web/.env` et renseignez les
   valeurs depuis *Paramètres du projet → Général → Vos applications → Config SDK* :

   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_VAPID_KEY=   # Cloud Messaging → Web configuration → certificat Web Push
   ```

   Les variables `VITE_MAPBOX_TOKEN`, `VITE_STRIPE_PUBLISHABLE_KEY` et
   `VITE_DIDIT_CLIENT_ID` peuvent rester vides : elles ne sont utilisées par
   aucune page publique dans cette v1 (voir "Scaffolding non actif" plus bas).

3. Mettez à jour `.firebaserc` avec l'ID réel de votre projet Firebase
   (remplacez `exotour-vitrine`).
4. Connectez-vous à Firebase : `npx firebase login`.

## Lancer en local

```bash
npm run dev
```

Le site est disponible sur `http://localhost:5173`.

Pour tester le formulaire de contact et les Cloud Functions en local sans
toucher à un projet Firebase réel, utilisez les émulateurs :

```bash
npm run emulators
```

## Build

```bash
npm run build
```

Génère `apps/web/dist`, prêt pour Firebase Hosting.

## Déploiement

### Manuel

```bash
npm run build
npx firebase deploy
```

### CI/CD (GitHub Actions)

Deux workflows sont fournis dans `.github/workflows/` :

- `firebase-hosting-pull-request.yml` : build + déploiement d'une preview
  Firebase Hosting sur chaque pull request vers `main`.
- `firebase-hosting-merge.yml` : build + déploiement en production sur
  chaque merge vers `main`.

Secrets GitHub à configurer (*Settings → Secrets and variables → Actions*) :

- `FIREBASE_SERVICE_ACCOUNT` : JSON d'un compte de service Firebase avec les
  droits Hosting (générable via `npx firebase init hosting:github` qui
  configure aussi ces secrets automatiquement).
- `FIREBASE_PROJECT_ID` : l'ID de votre projet Firebase.
- Les 6 `VITE_FIREBASE_*` + `VITE_FIREBASE_VAPID_KEY`, `VITE_MAPBOX_TOKEN`,
  `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_DIDIT_CLIENT_ID` listées ci-dessus.

## PWA

Le site est une PWA (manifest + service worker via `vite-plugin-pwa`) :
mise en cache des assets statiques et des pages déjà visitées pour un accès
hors-ligne basique. Les icônes dans `apps/web/public/icons` sont des
placeholders SVG — remplacez-les par le logo final avant mise en production.

## Mobile (Capacitor)

`apps/web/capacitor.config.ts` pointe vers le build web (`dist`). Aucune
plateforme native n'est ajoutée par défaut. Pour packager :

```bash
npm run build --workspace=apps/web
cd apps/web
npx cap add ios      # ou: npx cap add android
npx cap sync
```

## Scaffolding non actif

Ces éléments sont installés et prêts, mais **non branchés** sur les pages
publiques de cette v1 :

- `/integrations/stripe` — dépendances Stripe / Stripe Connect + README
  d'activation. Aucun flux de paiement réel.
- `/integrations/didit` — scaffold KYC Didit + README d'activation.
- `apps/web/src/components/integrations/MapboxMap.tsx` — composant carte
  prêt à l'emploi (nécessite `VITE_MAPBOX_TOKEN`), pour le futur espace
  partenaire.
- `apps/web/src/components/dashboard/LeadsChart.tsx` — graphique Recharts
  prêt pour un futur tableau de bord partenaire.

## Contenu et i18n

Tout le contenu vit dans `apps/web/src/locales/{fr,en}/translation.json`.
Le français est la langue par défaut. Aucun prix ni aucune destination
précise n'apparaît dans le contenu public, conformément au positionnement
de la vitrine.

## Leads / formulaire de contact

Le formulaire de la page Partenariat appelle la Cloud Function `submitLead`
(callable HTTPS), qui écrit dans Firestore (`leads`) et déclenche
`notifyTeamOnNewLead`, laquelle pousse une notification FCM sur le topic
`exotour-team-leads`. Aucune lecture/écriture cliente directe sur Firestore
n'est autorisée (voir `firestore.rules`).
