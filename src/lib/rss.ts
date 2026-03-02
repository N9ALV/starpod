import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string, union } from 'valibot';

import { optimizeImage } from './optimize-episode-image';
import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';
import starpodConfig from '../../starpod.config';

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

function resolveFeedUrl(feedUrl?: string) {
  return feedUrl ?? starpodConfig.rssFeed;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normalise duration to seconds. Handles:
 *  - number (already seconds)
 *  - "HH:MM:SS" string
 *  - "MM:SS" string
 *  - plain numeric string e.g. "3600"
 */
function parseDuration(val: number | string | undefined): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return val;
  const str = String(val).trim();
  if (/^\d+$/.test(str)) return parseInt(str, 10);
  const parts = str.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

async function parseRssWithRetry<T = unknown>(rssFeed: string): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= FEED_PARSE_RETRIES; attempt++) {
    try {
      // @ts-expect-error
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
    description: raw?.description ?? raw?.feed?.description ?? '',
    image:
      raw?.image?.url ??
      raw?.image ??
      raw?.itunes_image?.href ??
      raw?.feed?.image?.url ??
      '',
    link: raw?.link ?? raw?.feed?.link ?? '',
    author: raw?.author ?? raw?.itunes_author ?? raw?.managingEditor ?? undefined
  };

  if (showInfo.image) {
    try {
      showInfo.image = ((await optimizeImage(showInfo.image, {
        height: 640,
        width: 640
      })) ?? showInfo.image) as string;
    } catch {
      // keep raw image on failure
    }
  }

  showInfoCache.set(rssFeed, showInfo);
  return showInfo;
}

const episodesCache = new Map<string, Array<Episode>>();

export async function getAllEpisodes(feedUrl?: string) {
  const rssFeed = resolveFeedUrl(feedUrl);
  const cachedEpisodes = episodesCache.get(rssFeed);
  if (cachedEpisodes) {
    return cachedEpisodes;
  }

  const FeedSchema = object({
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
  let items: ReturnType<typeof parse<typeof FeedSchema>>['items'];

  try {
    items = parse(FeedSchema, feed).items;
  } catch {
    // If strict parse fails, try using raw items directly
    items = (feed?.items ?? []) as typeof items;
  }

  const episodes: Array<Episode> = (
    await Promise.all(
      items
        .filter(
          (item) =>
            !item.itunes_episodeType ||
            item.itunes_episodeType !== 'trailer'
        )
        .map(async (item) => {
          try {
            const rawDuration = item.itunes_duration ?? item.duration;
            const duration = parseDuration(rawDuration);

            const episodeNumber =
              item.itunes_episodeType === 'bonus'
                ? 'Bonus'
                : item.itunes_episode
                  ? `${item.itunes_episode}`
                  : undefined;

            const title = item.title ?? 'Untitled';
            const episodeSlug = dasherize(title);

            const rawDescription =
              item.description ?? item.content ?? '';
            const episodeContent =
              item.content_encoded ?? item.content ?? rawDescription;

            const rawImageHref =
              item.itunes_image?.href ?? item.image?.url ?? undefined;

            // per-episode image optimisation — never let one failure block the rest
            let episodeThumbnail: string | undefined;
            try {
              episodeThumbnail = rawImageHref
                ? ((await optimizeImage(rawImageHref)) ?? rawImageHref)
                : undefined;
            } catch {
              episodeThumbnail = rawImageHref;
            }

            const rawPublished =
              item.published ?? item.pubDate;
            const published =
              typeof rawPublished === 'number'
                ? rawPublished
                : rawPublished
                  ? new Date(rawPublished).getTime()
                  : Date.now();

            const enclosures = item.enclosures ?? [];
            const audio = enclosures[0]
              ? { src: enclosures[0].url, type: enclosures[0].type ?? 'audio/mpeg' }
              : { src: '', type: 'audio/mpeg' };

            return {
              id: item.id ?? episodeSlug,
              title,
              content: episodeContent,
              description: truncate(htmlToText(rawDescription), 260),
              duration,
              episodeImage: rawImageHref,
              episodeNumber,
              episodeSlug,
              episodeThumbnail,
              published,
              audio
            } satisfies Episode;
          } catch (err) {
            console.error('Failed to parse episode:', item?.title, err);
            return null;
          }
        })
    )
  ).filter((ep): ep is Episode => ep !== null);

  episodesCache.set(rssFeed, episodes);
  return episodes;
}