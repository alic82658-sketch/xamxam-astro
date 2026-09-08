# Version éditoriale de Xamxam.ai

Le site public reprend le projet Xamxam Sites, version 13, commit source
`46e9958d630fcecba700d50dda6d37982a8ef9d5`. L’intégration au dépôt public date du
7 septembre 2026. Le domaine public canonique reste `https://xamxam.ai/`.

## Modifier le site public

- Contenus des guides, méthodes et actualités : `src/data/editorial.json`.
- Taxonomie métiers, thèmes, outils et note avant publication : `src/data/editorial.json`.
- Rendu des nouvelles pages : `src/lib/editorial-renderer.mjs`.
- Styles de la version validée : `public/styles/editorial.css`.
- Images WebP : `public/images/editorial/`.
- Identité visuelle robotique Xamxam : `src/data/visual-identity.json` et
  `docs/direction-visuelle-xamxam.md`.
- Pour un article centré sur une marque ou un outil, le logo authentique validé
  doit être prévu dans le concept, intégré sans déformation et contrôlé sur
  l’image d’article, l’aperçu social et la page publique.
- Anciens articles : `src/content/articles/` ; leur état de brouillon est conservé.
- Fiches de l’écosystème : `src/content/acteurs/`, avec leurs adresses existantes.

La page d’accueil et les pages Actualités, Guides, Par métier, Outils, Afrique et
Notre démarche sont générées par Astro. La rubrique Emploi est un parcours
d’aide à la candidature ; elle contient le guide pour adapter son CV à une offre.

Les illustrations de la version validée ont été reprises sans régénération.
Elles sont servies comme fichiers WebP séparés afin d’éviter de les répéter en
base64 dans chaque page. Les deux actualités conservent leurs dates originales ;
leurs sources ont été relues le 7 septembre 2026. Le chiffre non confirmé de
33 700 F CFA a été remplacé par les douze mois d’essai annoncés par Google.

L’ancien article vide sur les opportunités IA reste dans les sources comme
brouillon. Ses anciennes adresses redirigent vers les guides terminés. Le
formulaire de contact sans traitement serveur est remplacé par le contact
WhatsApp déjà présent sur le site.

## Contrôle et publication

Exécuter `npm ci`, `npm run build`, puis `npm run check:publication`.
La branche `main` de ce dépôt alimente le déploiement Cloudflare Pages existant.
Les changements ultérieurs destinés à xamxam.ai doivent être intégrés ici ; une
modification du prototype Sites n’actualise pas automatiquement le domaine public.

Le contrôle de publication vérifie les routes attendues, les liens et les images,
les titres principaux, les adresses canoniques, le sitemap et les redirections.
Il vérifie aussi les six pages métiers, les liaisons entre contenus et la note
éditoriale minimale de 7/10. La stratégie complète est décrite dans
`docs/strategie-editoriale-seo-monetisation.md`.
Il ne constitue pas un test visuel dans un navigateur.
