export const IQPOD_ORIGIN_TOKEN_HEADER = 'x-iu-vault-origin-token';

const FRAME_ANCESTORS = 'frame-ancestors https://iu.com.au https://www.iu.com.au';

async function secureEqual(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [leftDigest, rightDigest] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(left)),
    crypto.subtle.digest('SHA-256', encoder.encode(right)),
  ]);
  const subtle = crypto.subtle as SubtleCrypto & {
    timingSafeEqual?: (left: BufferSource, right: BufferSource) => boolean;
  };
  if (typeof subtle.timingSafeEqual === 'function') {
    return subtle.timingSafeEqual(leftDigest, rightDigest);
  }

  const leftBytes = new Uint8Array(leftDigest);
  const rightBytes = new Uint8Array(rightDigest);
  let mismatch = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    mismatch |= leftBytes[index] ^ rightBytes[index];
  }
  return mismatch === 0;
}

function protectedHeaders(headers: HeadersInit = {}): Headers {
  const next = new Headers(headers);
  next.set('Cache-Control', 'private, no-store, max-age=0');
  next.set('CDN-Cache-Control', 'no-store');
  next.set('Pragma', 'no-cache');
  next.set('X-Robots-Tag', 'noindex, nofollow');
  next.set('Content-Security-Policy', FRAME_ANCESTORS);
  next.set('Referrer-Policy', 'same-origin');
  next.delete('Access-Control-Allow-Origin');
  next.delete('X-Frame-Options');
  return next;
}

function isTopLevelNavigation(request: Request): boolean {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;
  const destination = request.headers.get('sec-fetch-dest')?.toLowerCase();
  const mode = request.headers.get('sec-fetch-mode')?.toLowerCase();
  return destination === 'document' || mode === 'navigate';
}

export function canonicalIqPodLocation(request: Request): string {
  const source = new URL(request.url);
  const target = new URL('https://iu.com.au/iq/app/iqpod/');
  if (source.pathname !== '/') {
    target.pathname = `/iq/app/iqpod${source.pathname.startsWith('/') ? source.pathname : `/${source.pathname}`}`;
  }
  target.search = source.search;
  target.hash = source.hash;
  return target.toString();
}

export async function enforceIqPodOrigin(
  request: Request,
  expectedToken: string | undefined,
): Promise<Response | null> {
  const suppliedToken = request.headers.get(IQPOD_ORIGIN_TOKEN_HEADER) ?? '';
  if (expectedToken && suppliedToken && await secureEqual(suppliedToken, expectedToken)) {
    return null;
  }

  if (isTopLevelNavigation(request)) {
    return new Response(null, {
      status: 302,
      headers: protectedHeaders({ Location: canonicalIqPodLocation(request) }),
    });
  }

  return new Response('Not found', {
    status: 404,
    headers: protectedHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }),
  });
}

export function protectIqPodResponse(response: Response): Response {
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: protectedHeaders(response.headers),
  });
}
