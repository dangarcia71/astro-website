import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export type Post = CollectionEntry<'blog'>;
export const languagePath = (language: Post['data']['language']) => language === 'pt-PT' ? 'pt' : 'en';
export const postUrl = (post: Post) => `/blog/${languagePath(post.data.language)}/${post.data.slug}/`;
export const dateLabel = (post: Post) => new Intl.DateTimeFormat(post.data.language, {
  dateStyle: 'long', timeZone: 'UTC',
}).format(post.data.date);

export function taxonomySlug(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Valida relações que o schema de um ficheiro isolado não consegue verificar.
export async function publishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  const urls = new Set<string>();
  for (const post of posts) {
    if (!post.id.startsWith(`${languagePath(post.data.language)}/`)) {
      throw new Error(`${post.id}: a pasta e o idioma não coincidem.`);
    }
    const url = postUrl(post);
    if (urls.has(url)) throw new Error(`Slug duplicado: ${url}`);
    urls.add(url);
    if (!existsSync(resolve('public', post.data.image.slice(1)))) {
      throw new Error(`${post.id}: imagem inexistente: ${post.data.image}`);
    }
    if (post.data.translation) {
      const translation = posts.find((other) => other.data.language !== post.data.language
        && other.data.slug === post.data.translation);
      if (!translation || translation.data.translation !== post.data.slug) {
        throw new Error(`${post.id}: tradução inexistente ou sem ligação recíproca.`);
      }
    }
  }
  const published = posts.filter((post) => post.data.status === 'published');
  for (const field of ['category', 'tags'] as const) {
    const labels = new Map<string, string>();
    for (const post of published) {
      const values = field === 'category' ? [post.data.category] : post.data.tags;
      for (const value of values) {
        const slug = taxonomySlug(value);
        if (!slug || (labels.has(slug) && labels.get(slug) !== value)) {
          throw new Error(`Categoria/tag ambígua ou sem URL válida: ${value}`);
        }
        labels.set(slug, value);
      }
    }
  }
  return published.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()
    || postUrl(a).localeCompare(postUrl(b)));
}
