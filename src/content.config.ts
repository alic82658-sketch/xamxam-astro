import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(150).max(160),
    author: z.string().default('Malcom Ali Kassim'),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    category: z.enum(['outils-et-pratiques', 'ia-en-afrique']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    firstHandElement: z.string(),
  }),
});

const acteurs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/acteurs' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(['outil-ia', 'application', 'agence-digitale', 'freelance', 'formation', 'startup', 'media']),
    website: z.string().optional(),
    whatsapp: z.string().optional(),
    city: z.string().default('Dakar'),
    country: z.string().default('Sénégal'),
    logo: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, acteurs };
