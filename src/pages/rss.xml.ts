import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { publishedPosts, postUrl } from '../lib/blog';

export const GET: APIRoute = async ({ site }) => rss({
  title: 'Astro / Markdown — Protótipo',
  description: 'Conteúdo de teste em português e inglês.',
  site: site!,
  items: (await publishedPosts()).map((post) => ({
    title: post.data.title,
    description: post.data.excerpt,
    pubDate: post.data.date,
    link: postUrl(post),
    categories: [post.data.category, ...post.data.tags],
  })),
});
