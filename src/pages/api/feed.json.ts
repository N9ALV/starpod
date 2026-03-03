import type { APIRoute } from 'astro';
import parseFeed from 'rss-to-json';

import { getRequestedFeed, resolveFeedSource } from '../../lib/feed-source';

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
    // Use parseFeed.parse to mirror existing usage in src/lib/rss.ts.
    const parsed = await new Promise<any>((resolve, reject) => {
      try {
        // @ts-ignore
        parseFeed.parse(feedSource.resolvedUrl, (err: any, data: any) =>
          err ? reject(err) : resolve(data)
        );
      } catch (error) {
        reject(error);
      }
    });

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
