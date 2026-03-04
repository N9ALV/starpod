import type { APIRoute } from 'astro';

import { getRequestedFeed, resolveFeedSource } from '../../lib/feed-source';
import { getParsedFeed } from '../../lib/rss';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const requestedFeed = getRequestedFeed(url.searchParams);

  if (!requestedFeed) {
    return new Response(JSON.stringify({ error: 'missing feed parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const feedSource = resolveFeedSource(requestedFeed);
  if (!feedSource.isValid) {
    return new Response(
      JSON.stringify({
        error: feedSource.invalidReason ?? 'invalid or disallowed feed URL'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const parsed = await getParsedFeed(feedSource.resolvedUrl);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
