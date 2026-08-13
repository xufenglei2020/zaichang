import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const journal = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/content/journal',
  }),
  schema: z.object({
    title: z.string(),
    city: z.string(),
    cityEn: z.string(),
    country: z.string(),
    date: z.coerce.date(),
    trip: z.string().optional(),
    carrying: z.string().optional(),
    excerpt: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    cover: z.string().optional(),
    themes: z.array(z.string()).optional(),
  }),
});

export const collections = { journal };
