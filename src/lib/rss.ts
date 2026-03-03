import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string, union } from 'valibot';

import { resolveFeedSource } from './feed-source';
import { optimizeImage } from './optimize-episode-image';
import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';

const FEED_PARSE_RETRIES = 3;
const FEED_PARSE_RETRY_DELAY_MS = 2000;

export interface Show {
  title: string;
  description: string;
  image: string;
  link: string;
  author?: string;
}

export interface Episode {
  id: string;
  title: string;
  published: number;
  description: string;
  duration: number;
  content: string;
  episodeImage?: string;
  episodeNumber?: string;
  episodeSlug: string;
  episodeThumbnail?: string;
  audio: {
    src: string;
    type: string;
  };
}

const showInfoCache = new Map<string, Show>();
const episodesCache = new Map<string, Array<Episode>>();

function resolveFeedUrl(feedUrl?: string) {
  return resolveFeedSource(feedUrl).resolvedUrl;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseDuration(value: number | string | undefined): number {
  if (value === undefined || value === null) return 0;
  if (typeof value === 'number') return value;

  const normalized = String(value).trim();
  if (/^\d+(\.\d+)?$/.test(normalized)) {
    return Math.round(Number(normalized));
  }

  const parts = normalized.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  return 0;
}

function parsePublished(
  value: number | string | undefined,
  fallback: number
): number {
  if (value === undefined || value === null) return fallback;

  if (typeof value === 'number') {
    return value > 1_000_000_000_000 ? value : value * 1000;
  }

  const normalized = value.trim();
  if (/^\d+$/.test(normalized)) {
    const numeric = Number(normalized);
    return numeric > 1_000_000_000_000 ? numeric : numeric * 1000;
  }

  const parsed = new Date(normalized).getTime();
  return Number.isNaN(parsed) ? fallback : parsed;
}

function getFeedItems(feed: unknown) {
  const candidateItems =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feed as any)?.items ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feed as any)?.feed?.items ??
    [];

  return Array.isArray(candidateItems) ? candidateItems : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEpisodeImage(item: any) {
  if (typeof item?.itunes_image === 'string') return item.itunes_image;
  if (typeof item?.image === 'string') return item.image;

  return (
    item?.itunes_image?.href ??
    item?.image?.url ??
    item?.thumbnail ??
    undefined
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEpisodeAudio(item: any) {
  const enclosure =
    Array.isArray(item?.enclosures) && item.enclosures.length > 0
      ? item.enclosures.find((candidate: { url?: string }) => !!candidate?.url)
      : item?.enclosure;

  if (enclosure?.url) {
    return {
      src: enclosure.url,
      type: enclosure.type ?? 'audio/mpeg'
    };
  }

  if (enclosure?.link) {
    return {
      src: enclosure.link,
      type: enclosure.type ?? 'audio/mpeg'
    };
  }

  return {
    src: '',
    type: 'audio/mpeg'
  };
}

async function parseRssWithRetry<T = unknown>(rssFeed: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= FEED_PARSE_RETRIES; attempt += 1) {
    try {
      // @ts-expect-error rss-to-json parse typing does not match runtime usage
      return (await parseFeed.parse(rssFeed)) as T;
    } catch (error) {
      lastError = error;
      if (attempt < FEED_PARSE_RETRIES) {
        await sleep(FEED_PARSE_RETRY_DELAY_MS);
      }
    }
  }

  throw lastError;
}

export async function getShowInfo(feedUrl?: string) {
  const rssFeed = resolveFeedUrl(feedUrl);
  const cachedShowInfo = showInfoCache.get(rssFeed);
  if (cachedShowInfo) {
    return cachedShowInfo;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await parseRssWithRetry<any>(rssFeed);

  const showInfo: Show = {
    title: raw?.title ?? raw?.feed?.title ?? 'Unknown Show',
    description:
      raw?.description ?? raw?.feed?.description ?? raw?.subtitle ?? '',
    image:
      raw?.image?.url ??
      raw?.image ??
      raw?.itunes_image?.href ??
      raw?.feed?.itunes_image?.href ??
      raw?.feed?.image?.url ??
      '',
    link: raw?.link ?? raw?.feed?.link ?? '',
    author:
      raw?.author ??
      raw?.itunes_author ??
      raw?.feed?.author ??
      raw?.feed?.itunes_author ??
      raw?.managingEditor ??
      undefined
  };

  if (showInfo.image) {
    try {
      showInfo.image = ((await optimizeImage(showInfo.image, {
        height: 640,
        width: 640
      })) ?? showInfo.image) as string;
    } catch {
      // Keep the raw image when optimization fails.
    }
  }

  showInfoCache.set(rssFeed, showInfo);
  return showInfo;
}

export async function getAllEpisodes(feedUrl?: string) {
  const rssFeed = resolveFeedUrl(feedUrl);
  const cachedEpisodes = episodesCache.get(rssFeed);
  if (cachedEpisodes) {
    return cachedEpisodes;
  }

  const feedSchema = object({
    items: array(
      object({
        id: optional(string()),
        title: string(),
        published: optional(union([number(), string()])),
        pubDate: optional(union([number(), string()])),
        description: optional(string()),
        content: optional(string()),
        content_encoded: optional(string()),
        itunes_duration: optional(union([number(), string()])),
        duration: optional(union([number(), string()])),
        itunes_episode: optional(union([number(), string()])),
        itunes_episodeType: optional(string()),
        itunes_image: optional(object({ href: optional(string()) })),
        image: optional(object({ url: optional(string()) })),
        enclosures: optional(
          array(
            object({
              url: string(),
              type: optional(string())
            })
          )
        )
      })
    )
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const feed = await parseRssWithRetry<any>(rssFeed);
  const rawItems = getFeedItems(feed);
  let items: ReturnType<typeof parse<typeof feedSchema>>['items'];

  try {
    items = parse(feedSchema, { items: rawItems }).items;
  } catch {
    items = rawItems as typeof items;
  }

  const parsedEpisodes = (
    await Promise.all(
      items
        .filter(
          (item) =>
            !item.itunes_episodeType || item.itunes_episodeType !== 'trailer'
        )
        .map(async (item) => {
          try {
            const rawDuration = item.itunes_duration ?? item.duration;
            const duration = parseDuration(rawDuration);
            const title = item.title ?? 'Untitled';
            const episodeSlug = dasherize(title);
            const episodeNumber =
              item.itunes_episodeType === 'bonus'
                ? 'Bonus'
                : item.itunes_episode
                  ? `${item.itunes_episode}`
                  : undefined;

            const rawDescription =
              item.description ?? item.content ?? item.content_encoded ?? '';
            const episodeContent =
              item.content_encoded ?? item.content ?? rawDescription;
            const rawImageHref = getEpisodeImage(item);

            let episodeThumbnail: string | undefined;
            try {
              episodeThumbnail = rawImageHref
                ? ((await optimizeImage(rawImageHref)) ?? rawImageHref)
                : undefined;
            } catch {
              episodeThumbnail = rawImageHref;
            }

            const published = parsePublished(
              item.published ?? item.pubDate,
              Date.now()
            );
            const audio = getEpisodeAudio(item);

            return {
              id: item.id ?? episodeSlug,
              title,
              content: episodeContent,
              description: truncate(
                htmlToText(rawDescription, { wordwrap: false }),
                260
              ),
              duration,
              episodeImage: rawImageHref,
              episodeNumber,
              episodeSlug,
              episodeThumbnail,
              published,
              audio
            };
          } catch (error) {
            console.error('Failed to parse episode:', item?.title, error);
            return null;
          }
        })
    )
  ).filter((episode) => episode !== null) as Episode[];

  const dedupedEpisodes: Episode[] = [];
  const seenEpisodeKeys = new Set<string>();

  for (const episode of parsedEpisodes) {
    const episodeKey = episode.audio.src || episode.id || episode.episodeSlug;
    if (seenEpisodeKeys.has(episodeKey)) continue;
    seenEpisodeKeys.add(episodeKey);
    dedupedEpisodes.push(episode);
  }

  episodesCache.set(rssFeed, dedupedEpisodes);
  return dedupedEpisodes;
}
