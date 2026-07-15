import { getCollection } from 'astro:content';

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
    '> Le média de référence sur l’intelligence artificielle au Sénégal, avec l’ambition de rayonner sur l’Afrique francophone. Annuaire vérifié des acteurs de l’écosystème IA sénégalais (outils, applications, startups, formations, agences) et guides pratiques en français.',
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
