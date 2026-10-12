import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usar um slug sem espaços ou acentos.');
const text = z.string().trim().min(1);

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '{pt,en}/*.md',
    // O ID inclui o idioma; o slug público vem do frontmatter.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: text,
    slug,
    date: z.union([z.date(), z.iso.date()]).pipe(z.coerce.date()),
    excerpt: text,
    category: text,
    tags: z.array(text).min(1),
    image: z.string().regex(/^\/images\/blog\/[a-z0-9-]+\.(?:svg|png|jpe?g|webp|avif)$/),
    language: z.enum(['pt-PT', 'en-GB']),
    translation: slug.optional(),
    status: z.enum(['draft', 'published']),
  }),
});

export const collections = { blog };
