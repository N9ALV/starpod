import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string } from 'valibot';

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

  const showInfo = await parseRssWithRetry<Show>(rssFeed);
  showInfo.image = (await optimizeImage(showInfo.image, {
    height: 640,
    width: 640
  })) as string;

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
  let FeedSchema = object({
    items: array(
      object({
        id: string(),
        title: string(),
        published: number(),
        description: string(),
        content_encoded: optional(string()),
        itunes_duration: number(),
        itunes_episode: optional(number()),
        itunes_episodeType: string(),
        itunes_image: optional(object({ href: optional(string()) })),
        enclosures: array(
          object({
            url: string(),
            type: string()
          })
        )
      })
    )
  });

  let feed = await parseRssWithRetry<Show>(rssFeed);
  let items = parse(FeedSchema, feed).items;

  let episodes: Array<Episode> = await Promise.all(
    items
      .filter((item) => item.itunes_episodeType !== 'trailer')
      .map(
        async ({
          description,
          content_encoded,
          id,
          title,
          enclosures,
          published,
          itunes_duration,
          itunes_episode,
          itunes_episodeType,
          itunes_image
        }) => {
          const episodeNumber =
            itunes_episodeType === 'bonus' ? 'Bonus' : `${itunes_episode}`;
          const episodeSlug = dasherize(title);
          const episodeContent = content_encoded || description;

          return {
            id,
            title: `${title}`,
            content: episodeContent,
            description: truncate(htmlToText(description), 260),
            duration: itunes_duration,
            episodeImage: itunes_image?.href,
            episodeNumber,
            episodeSlug,
            episodeThumbnail: await optimizeImage(itunes_image?.href),
            published,
            audio: enclosures.map((enclosure) => ({
              src: enclosure.url,
              type: enclosure.type
            }))[0]
          };
        }
      )
  );

  episodesCache.set(rssFeed, episodes);
  return episodes;
}
