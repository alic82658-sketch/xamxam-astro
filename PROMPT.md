# Projet Astro : xamxam.ai

## Context
- **Produit** : xamxam.ai, le média de référence sur l'IA au Sénégal et en Afrique francophone
- **Tech** : Astro + HTML/CSS/JS vanilla (zéro framework JS côté client)
- **Déploiement** : Cloudflare Pages via GitHub push
- **Langue** : 100% français
- **Design** : Charte v39, distinctif et anti-générique

---

## ÉTAPE 1 — Initialisation

### Commandes d'initialisation
```bash
npm create astro@latest xamxam-astro -- --template minimal --no-install
cd xamxam-astro
npm install
npx astro add sitemap -y
```

### Configuration astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xamxam.ai',
  integrations: [sitemap()],
  output: 'static',
});
```

---

## ÉTAPE 2 — Design System (Charte v39)

### Palette de couleurs (5 teintes nommées)
| Nom | Valeur | Usage |
|-----|--------|-------|
| **Nuit** | `#0D1117` | Fond principal (dark mode natif) |
| **Sable** | `#F5F0E8` | Texte principal sur fond sombre |
| **Indigo** | `#4F46E5` | Accent principal, CTA, liens |
| **Ambre** | `#F59E0B` | Accent secondaire, badges |
| **Graphite** | `#1C2128` | Surfaces surélevées, cards |

### Typographie
| Élément | Police | Weights |
|---------|--------|---------|
| Display/Titres | Space Grotesk (Google Fonts) | 500, 600, 700 |
| Corps | Inter | 400, 500 |
| Code/Technique | JetBrains Mono | 400 |

### Principes de design
- ✓ Barre latérale gauche colorée (4px, indigo) sur les cards articles
- ✓ Espacement généreux (clamp-based, fluid)
- ✗ Pas de border-radius excessif (max 8px)
- ✗ Pas de gradients
- ✗ Pas d'ombres portées lourdes
- ✓ Micro-interaction : underline animé sur les liens au hover

### src/styles/global.css
- Reset minimal (box-sizing, margin 0)
- CSS custom properties pour toute la palette
- Classes utilitaires de base (`.container`, `.sr-only`, etc.)
- Type scale fluid (clamp)
- Imports Google Fonts

---

## ÉTAPE 3 — Structure des dossiers

À définir…