import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../site.config';
import { getPublishedEntries, entryHref } from '../lib/journal';

export async function GET(context: APIContext) {
  const entries = await getPublishedEntries();
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    trailingSlash: false,
    customData: `<language>${site.lang}</language>`,
    items: entries.map((entry) => ({
      title: `${entry.data.city} · ${entry.data.title}`,
      pubDate: entry.data.date,
      description: entry.data.excerpt ?? '',
      link: entryHref(entry, entries),
    })),
  });
}
