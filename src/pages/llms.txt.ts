import { getCollection } from 'astro:content';
import editorial from '../data/editorial.json';

// Fichier /llms.txt : donne aux crawlers IA (OpenAI, Anthropic, Perplexity…)
// une vue structurée du site. Généré automatiquement depuis les collections.
export async function GET() {
  const acteurs = (await getCollection('acteurs', ({ data }) => !data.draft)).sort((a, b) =>
    a.data.name.localeCompare(b.data.name)
  );
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const lines: string[] = [
    '# xamxam.ai',
    '',
    '> Xamxam explique les usages de l’intelligence artificielle au Sénégal et en Afrique francophone. Actualités, guides et parcours pour le commerce, la prospection, l’enseignement, les PME, l’immobilier et la recherche d’emploi.',
    '',
    '## Guides par métier',
    '',
    ...Object.entries(editorial.guides).map(([slug, guide]) => `- [${guide.title}](https://xamxam.ai/guides/${slug}/) : ${guide.audience}`),
    '',
    '## Actualités',
    '',
    ...Object.entries(editorial.articles).map(([slug, article]) => `- [${article.title}](https://xamxam.ai/actualites/${slug}/) : ${article.standfirst}`),
    '',
    '## Écosystème IA au Sénégal (fiches vérifiées)',
    '',
    ...acteurs.map(
      (a) =>
        `- [${a.data.name}](https://xamxam.ai/ecosysteme/${a.id}/) : ${a.data.description}`
    ),
    '',
    '## Articles',
    '',
    ...articles.map(
      (a) => `- [${a.data.title}](https://xamxam.ai/blog/${a.id}/) : ${a.data.description}`
    ),
    '',
    '## Pages',
    '',
    '- [Actualités](https://xamxam.ai/actualites/)',
    '- [Guides pratiques](https://xamxam.ai/guides/)',
    '- [Par métier](https://xamxam.ai/metiers/)',
    '- [Outils](https://xamxam.ai/outils/)',
    '- [IA en Afrique](https://xamxam.ai/afrique/)',
    '- [L’écosystème IA](https://xamxam.ai/ecosysteme/) : tous les acteurs, filtrables par catégorie',
    '- [Blog](https://xamxam.ai/blog/) : guides et analyses IA en français',
    '- [À propos](https://xamxam.ai/a-propos/)',
    '- [Contact / Référencer votre solution](https://xamxam.ai/contact/)',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
