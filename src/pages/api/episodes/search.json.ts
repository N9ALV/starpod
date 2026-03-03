import type { APIRoute } from 'astro';
import { getRequestedFeed, resolveFeedSource } from '../../../lib/feed-source';
import { getAllEpisodes } from '../../../lib/rss';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const feedSource = resolveFeedSource(getRequestedFeed(url.searchParams));
  const allEpisodes = await getAllEpisodes(feedSource.resolvedUrl);

  return new Response(JSON.stringify(allEpisodes), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
