import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './paths';

export type JournalEntry = CollectionEntry<'journal'>;

export type ParsedId = {
  year: string;
  month: string;
  day: string;
  citySlug: string;
};

export function parseEntryId(id: string): ParsedId {
  const name = id.split('/').pop() ?? id;
  const match = name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) {
    throw new Error(`Journal filename must be YYYY-MM-DD-city-slug, got: ${id}`);
  }
  return {
    year: match[1],
    month: match[2],
    day: match[3],
    citySlug: match[4],
  };
}

export function isPublished(entry: JournalEntry): boolean {
  return entry.data.status === 'published';
}

async function queryJournal(
  filter: (entry: JournalEntry) => boolean,
): Promise<JournalEntry[]> {
  try {
    return await getCollection('journal', filter);
  } catch {
    return [];
  }
}

export async function getPublishedEntries(): Promise<JournalEntry[]> {
  const entries = await queryJournal(({ data }) => data.status === 'published');
  return sortByDate(entries);
}

/** Published always; drafts only while `astro dev` is running. */
export async function getVisibleEntries(): Promise<JournalEntry[]> {
  const entries = await queryJournal(({ data }) => {
    return import.meta.env.DEV || data.status === 'published';
  });
  return sortByDate(entries);
}

export function sortByDate(entries: JournalEntry[]): JournalEntry[] {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Prefer /2026/kyoto.
 * If the same city is walked more than once in a year, disambiguate:
 * /2026/kyoto-08-12
 */
export function entryHref(entry: JournalEntry, all: JournalEntry[]): string {
  const parsed = parseEntryId(entry.id);
  const collisions = all.filter((other) => {
    const p = parseEntryId(other.id);
    return p.year === parsed.year && p.citySlug === parsed.citySlug;
  });
  if (collisions.length > 1) {
    return withBase(`/${parsed.year}/${parsed.citySlug}-${parsed.month}-${parsed.day}`);
  }
  return withBase(`/${parsed.year}/${parsed.citySlug}`);
}

export function entryParams(entry: JournalEntry, all: JournalEntry[]): { year: string; city: string } {
  const href = entryHref(entry, all);
  const parts = href.split('/').filter(Boolean);
  // Skip the base segment (zaichang) when present.
  const year = parts.at(-2) ?? parts[0];
  const city = parts.at(-1) ?? '';
  return { year, city };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-Hans', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('zh-Hans', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function groupByYear(entries: JournalEntry[]): { year: string; entries: JournalEntry[] }[] {
  const map = new Map<string, JournalEntry[]>();
  for (const entry of entries) {
    const { year } = parseEntryId(entry.id);
    const list = map.get(year) ?? [];
    list.push(entry);
    map.set(year, list);
  }
  return [...map.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, yearEntries]) => ({
      year,
      entries: sortByDate(yearEntries),
    }));
}
