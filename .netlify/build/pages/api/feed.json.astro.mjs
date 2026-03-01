import parseFeed from 'rss-to-json';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const DEFAULT_ALLOWLIST = ["rss.flightcast.com"];
function getAllowlist() {
  return DEFAULT_ALLOWLIST;
}
function validFeedUrl(feed, allowlist) {
  try {
    const u = new URL(feed);
    if (!["http:", "https:"].includes(u.protocol)) return false;
    return allowlist.includes(u.hostname);
  } catch {
    return false;
  }
}
const GET = async ({
  request
}) => {
  const url = new URL(request.url);
  const feed = url.searchParams.get("feed") || url.searchParams.get("url");
  if (!feed) {
    return new Response(JSON.stringify({
      error: "missing feed parameter"
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const allowlist = getAllowlist();
  if (!validFeedUrl(feed, allowlist)) {
    return new Response(JSON.stringify({
      error: "invalid or disallowed feed URL"
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  try {
    const parsed = await new Promise((resolve, reject) => {
      try {
        parseFeed.parse(feed, (err, data) => err ? reject(err) : resolve(data));
      } catch (e) {
        reject(e);
      }
    });
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: String(err)
    }), {
      status: 502,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
