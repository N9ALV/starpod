import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string, union } from 'valibot';

import { isAllowedFeedUrl, resolveFeedSource } from './feed-source';
import { optimizeImage } from './optimize-episode-image';
import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';

const FEED_PARSE_RETRIES = 3;
const FEED_PARSE_RETRY_DELAY_MS = 2000;
const FEED_DISCOVERY_ACCEPT_HEADER =
  'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.1';
const FEED_LINK_TAG_PATTERN = /<link\b[^>]*>/gi;
const HTML_URL_PATTERN = /https?:\/\/[^\s"'<>`]+/gi;
const AUDIO_URL_PATTERN =
  /\.(?:mp3|m4a|aac|wav|ogg|oga|opus|flac)(?:[?#].*)?$/i;

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
const parsedFeedCache = new Map<string, unknown>();
const feedUrlResolutionCache = new Map<string, string>();

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

function decodeHtmlValue(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'");
}

function resolveUrlCandidate(value: string, baseUrl?: string) {
  try {
    return new URL(decodeHtmlValue(value), baseUrl).toString();
  } catch {
    return undefined;
  }
}

function isLikelyFeedUrl(candidate: string) {
  try {
    const url = new URL(candidate);
    const normalized = `${url.hostname}${url.pathname}`.toLowerCase();
    const pathname = url.pathname.toLowerCase();

    return (
      pathname.endsWith('.rss') ||
      pathname.endsWith('/rss') ||
      pathname.endsWith('/feed') ||
      pathname.endsWith('/feed/') ||
      pathname.endsWith('/podcast/rss') ||
      normalized.includes('feeds.acast.com/public/shows/') ||
      normalized.includes('feeds.buzzsprout.com/') ||
      normalized.includes('rss.flightcast.com/') ||
      normalized.includes('feeds.libsyn.com/') ||
      normalized.includes('rss.libsyn.com/')
    );
  } catch {
    return false;
  }
}

function getStringCandidate(value: unknown): string | undefined {
  if (!value) return undefined;

  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized || undefined;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const candidate = getStringCandidate(entry);
      if (candidate) return candidate;
    }
    return undefined;
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return getStringCandidate([
      record.url,
      record.href,
      record.link,
      record.src,
      record.file,
      record.thumbnail,
      record.image,
      record.content,
      record.contents,
      record.group,
      record.images
    ]);
  }

  return undefined;
}

function isAudioLikeSource(source: string, type?: string) {
  const normalizedType = type?.toLowerCase();
  return (
    !!source &&
    (!!normalizedType?.startsWith('audio/') ||
      AUDIO_URL_PATTERN.test(source) ||
      /\/podcast\/play\//i.test(source))
  );
}

function getAudioCandidate(
  value: unknown
): { src: string; type?: string } | undefined {
  if (!value) return undefined;

  if (Array.isArray(value)) {
    for (const entry of value) {
      const candidate = getAudioCandidate(entry);
      if (candidate) return candidate;
    }
    return undefined;
  }

  if (typeof value === 'string') {
    return isAudioLikeSource(value) ? { src: value } : undefined;
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const type =
      typeof record.type === 'string'
        ? record.type
        : typeof record.medium === 'string'
          ? record.medium
          : undefined;
    const source = getStringCandidate([
      record.url,
      record.href,
      record.link,
      record.src,
      record.file
    ]);

    if (source && isAudioLikeSource(source, type)) {
      return {
        src: source,
        type
      };
    }

    return getAudioCandidate([
      record.content,
      record.contents,
      record.group,
      record.media,
      record.enclosure,
      record.enclosures
    ]);
  }

  return undefined;
}

function extractFeedUrlsFromHtml(html: string, baseUrl: string) {
  const candidates = new Set<string>();

  for (const linkTag of html.match(FEED_LINK_TAG_PATTERN) ?? []) {
    const normalizedTag = linkTag.toLowerCase();
    if (
      !normalizedTag.includes('application/rss+xml') &&
      !normalizedTag.includes('application/atom+xml')
    ) {
      continue;
    }

    const hrefMatch = linkTag.match(/\bhref=(['"])([^'"]+)\1/i);
    const resolvedUrl = hrefMatch?.[2]
      ? resolveUrlCandidate(hrefMatch[2], baseUrl)
      : undefined;

    if (resolvedUrl) {
      candidates.add(resolvedUrl);
    }
  }

  for (const match of html.matchAll(HTML_URL_PATTERN)) {
    const resolvedUrl = resolveUrlCandidate(match[0], baseUrl);
    if (resolvedUrl && isLikelyFeedUrl(resolvedUrl)) {
      candidates.add(resolvedUrl);
    }
  }

  return Array.from(candidates).filter(
    (candidate) => isAllowedFeedUrl(candidate) && isLikelyFeedUrl(candidate)
  );
}

async function discoverFeedUrl(candidateUrl: string) {
  const cached = feedUrlResolutionCache.get(candidateUrl);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(candidateUrl, {
      headers: {
        Accept: FEED_DISCOVERY_ACCEPT_HEADER
      }
    });

    if (!response.ok) {
      return undefined;
    }

    const finalUrl = response.url || candidateUrl;
    const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

    if (!contentType.includes('html')) {
      if (isAllowedFeedUrl(finalUrl) && isLikelyFeedUrl(finalUrl)) {
        feedUrlResolutionCache.set(candidateUrl, finalUrl);
        feedUrlResolutionCache.set(finalUrl, finalUrl);
        return finalUrl;
      }

      return undefined;
    }

    const body = await response.text();
    const discoveredFeedUrl = extractFeedUrlsFromHtml(body, finalUrl)[0];

    if (discoveredFeedUrl) {
      feedUrlResolutionCache.set(candidateUrl, discoveredFeedUrl);
      feedUrlResolutionCache.set(discoveredFeedUrl, discoveredFeedUrl);
    }

    return discoveredFeedUrl;
  } catch {
    return undefined;
  }
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
  return getStringCandidate([
    item?.itunes_image,
    item?.itunes_image?.href,
    item?.image,
    item?.image?.url,
    item?.thumbnail,
    item?.media?.thumbnail,
    item?.media?.image,
    item?.media
  ]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEpisodeAudio(item: any) {
  const audioCandidate = getAudioCandidate([
    item?.enclosures,
    item?.enclosure,
    item?.media,
    item?.audio,
    item?.link
  ]);

  return audioCandidate
    ? {
        src: audioCandidate.src,
        type: audioCandidate.type ?? 'audio/mpeg'
      }
    : {
        src: '',
        type: 'audio/mpeg'
      };
}

async function parseRssWithRetry<T = unknown>(rssFeed: string): Promise<T> {
  let lastError: unknown;
  const parseRss =
    typeof parseFeed === 'function'
      ? parseFeed
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (parseFeed as any)?.parse;

  for (let attempt = 1; attempt <= FEED_PARSE_RETRIES; attempt += 1) {
    try {
      if (typeof parseRss !== 'function') {
        throw new TypeError('rss-to-json parser is unavailable');
      }

      return (await parseRss(rssFeed)) as T;
    } catch (error) {
      lastError = error;
      if (attempt < FEED_PARSE_RETRIES) {
        await sleep(FEED_PARSE_RETRY_DELAY_MS);
      }
    }
  }

  throw lastError;
}

async function parseResolvedFeed<T = unknown>(feedUrl?: string) {
  const requestedFeedUrl = resolveFeedUrl(feedUrl);
  const cachedResolvedFeedUrl =
    feedUrlResolutionCache.get(requestedFeedUrl) ?? requestedFeedUrl;
  const cachedFeed = parsedFeedCache.get(cachedResolvedFeedUrl);

  if (cachedFeed) {
    return {
      requestedFeedUrl,
      rssFeed: cachedResolvedFeedUrl,
      feed: cachedFeed as T
    };
  }

  const candidateFeedUrls = Array.from(
    new Set([cachedResolvedFeedUrl, requestedFeedUrl])
  );
  let lastError: unknown;

  for (const candidateFeedUrl of candidateFeedUrls) {
    try {
      const parsedFeed = await parseRssWithRetry<T>(candidateFeedUrl);
      parsedFeedCache.set(candidateFeedUrl, parsedFeed);
      feedUrlResolutionCache.set(requestedFeedUrl, candidateFeedUrl);
      feedUrlResolutionCache.set(candidateFeedUrl, candidateFeedUrl);

      return {
        requestedFeedUrl,
        rssFeed: candidateFeedUrl,
        feed: parsedFeed
      };
    } catch (error) {
      lastError = error;
    }
  }

  const discoveredFeedUrl = await discoverFeedUrl(requestedFeedUrl);
  if (discoveredFeedUrl && !candidateFeedUrls.includes(discoveredFeedUrl)) {
    const cachedDiscoveredFeed = parsedFeedCache.get(discoveredFeedUrl);
    if (cachedDiscoveredFeed) {
      feedUrlResolutionCache.set(requestedFeedUrl, discoveredFeedUrl);

      return {
        requestedFeedUrl,
        rssFeed: discoveredFeedUrl,
        feed: cachedDiscoveredFeed as T
      };
    }

    const parsedFeed = await parseRssWithRetry<T>(discoveredFeedUrl);
    parsedFeedCache.set(discoveredFeedUrl, parsedFeed);
    feedUrlResolutionCache.set(requestedFeedUrl, discoveredFeedUrl);
    feedUrlResolutionCache.set(discoveredFeedUrl, discoveredFeedUrl);

    return {
      requestedFeedUrl,
      rssFeed: discoveredFeedUrl,
      feed: parsedFeed
    };
  }

  throw lastError;
}

export async function getParsedFeed<T = unknown>(feedUrl?: string) {
  return (await parseResolvedFeed<T>(feedUrl)).feed;
}

export async function getShowInfo(feedUrl?: string) {
  const requestedFeedUrl = resolveFeedUrl(feedUrl);
  const cachedShowInfo =
    showInfoCache.get(requestedFeedUrl) ??
    showInfoCache.get(feedUrlResolutionCache.get(requestedFeedUrl) ?? '');

  if (cachedShowInfo) {
    return cachedShowInfo;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { feed: raw, rssFeed } = await parseResolvedFeed<any>(feedUrl);

  const showInfo: Show = {
    title: raw?.title ?? raw?.feed?.title ?? 'Unknown Show',
    description:
      raw?.description ?? raw?.feed?.description ?? raw?.subtitle ?? '',
    image: getStringCandidate([
      raw?.image,
      raw?.image?.url,
      raw?.itunes_image,
      raw?.itunes_image?.href,
      raw?.feed?.image,
      raw?.feed?.image?.url,
      raw?.feed?.itunes_image,
      raw?.feed?.itunes_image?.href,
      raw?.cover,
      raw?.media
    ]) ?? '',
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

  showInfoCache.set(requestedFeedUrl, showInfo);
  showInfoCache.set(rssFeed, showInfo);
  return showInfo;
}

export async function getAllEpisodes(feedUrl?: string) {
  const requestedFeedUrl = resolveFeedUrl(feedUrl);
  const cachedEpisodes =
    episodesCache.get(requestedFeedUrl) ??
    episodesCache.get(feedUrlResolutionCache.get(requestedFeedUrl) ?? '');

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
        created: optional(union([number(), string()])),
        isoDate: optional(union([number(), string()])),
        updated: optional(union([number(), string()])),
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
  const { feed, rssFeed } = await parseResolvedFeed<any>(feedUrl);
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
              item.published ??
                item.pubDate ??
                item.created ??
                item.isoDate ??
                item.updated,
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

  episodesCache.set(requestedFeedUrl, dedupedEpisodes);
  episodesCache.set(rssFeed, dedupedEpisodes);
  return dedupedEpisodes;
}
