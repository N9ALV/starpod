import type { APIRoute } from 'astro';
import parseFeed from 'rss-to-json';

export const prerender = false;

const DEFAULT_ALLOWLIST = ['rss.flightcast.com'];

function getAllowlist(): string[] {
  const env = (import.meta.env.FEED_ALLOWLIST as string) || '';
  if (!env) return DEFAULT_ALLOWLIST;
  return env.split(',').map((s) => s.trim()).filter(Boolean);
}

function validFeedUrl(feed: string, allowlist: string[]) {
  try {
    const u = new URL(feed);
    if (!['http:', 'https:'].includes(u.protocol)) return false;
    return allowlist.includes(u.hostname);
  } catch {
    return false;
  }
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const feed = url.searchParams.get('feed') || url.searchParams.get('url');
  if (!feed) {
    return new Response(JSON.stringify({ error: 'missing feed parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const allowlist = getAllowlist();
  if (!validFeedUrl(feed, allowlist)) {
    return new Response(JSON.stringify({ error: 'invalid or disallowed feed URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Use parseFeed.parse to mirror existing usage in src/lib/rss.ts
    const parsed = await new Promise<any>((resolve, reject) => {
      try {
        // @ts-ignore
        parseFeed.parse(feed, (err: any, data: any) => (err ? reject(err) : resolve(data)));
      } catch (e) {
        reject(e);
      }
    });

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
