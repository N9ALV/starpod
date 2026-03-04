import starpodConfig from '../../starpod.config';

const BUZZSPROUT_HOST = 'feeds.buzzsprout.com';
const FLIGHTCAST_HOST = 'rss.flightcast.com';
const KNOWN_PODCAST_HOST_PATTERNS = [
  'anchor.fm',
  'podcasters.spotify.com',
  'spotifyforcreators.com',
  'creators.spotify.com',
  'acast.com',
  'www.acast.com',
  'shows.acast.com',
  'feeds.acast.com',
  '*.acast.com',
  'interactivebrokers.eu',
  'www.interactivebrokers.eu',
  'interactivebrokers.com',
  'www.interactivebrokers.com',
  'ibkrcampus.eu',
  'www.ibkrcampus.eu',
  '*.interactivebrokers.eu',
  '*.interactivebrokers.com',
  '*.ibkrcampus.eu',
  'libsyn.com',
  'www.libsyn.com',
  'feeds.libsyn.com',
  'rss.libsyn.com',
  '*.libsyn.com'
];

export interface FeedSourceResolution {
  requested?: string;
  resolvedUrl: string;
  queryValue?: string;
  isDefault: boolean;
  isValid: boolean;
  invalidReason?: string;
}

function getEnvironmentValue(name: string) {
  return (
    (import.meta as ImportMeta & { env?: Record<string, string | undefined> })
      .env?.[name]
  );
}

function normalizeUrl(value: string): string | undefined {
  try {
    return new URL(value).toString();
  } catch {
    return undefined;
  }
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function matchesHostnamePattern(hostname: string, pattern: string) {
  const normalizedHostname = hostname.toLowerCase();
  const normalizedPattern = pattern.trim().toLowerCase();

  if (!normalizedPattern) return false;

  if (normalizedPattern.startsWith('*.')) {
    const suffix = normalizedPattern.slice(1);
    return (
      normalizedHostname.endsWith(suffix) &&
      normalizedHostname !== suffix.slice(1)
    );
  }

  return normalizedHostname === normalizedPattern;
}

function getDefaultFeedUrl() {
  return new URL(starpodConfig.rssFeed).toString();
}

function getDefaultAllowedHosts() {
  const defaultHost = new URL(starpodConfig.rssFeed).hostname;

  return Array.from(
    new Set([
      defaultHost,
      BUZZSPROUT_HOST,
      FLIGHTCAST_HOST,
      ...KNOWN_PODCAST_HOST_PATTERNS
    ])
  );
}

export function getFeedAllowlist() {
  const fromEnv = parseList(getEnvironmentValue('FEED_ALLOWLIST'));
  return Array.from(new Set([...getDefaultAllowedHosts(), ...fromEnv]));
}

function getFeedAliases() {
  const aliases = new Map<string, string>([['default', getDefaultFeedUrl()]]);
  const defaultHost = new URL(starpodConfig.rssFeed).hostname.toLowerCase();

  if (defaultHost === FLIGHTCAST_HOST) {
    aliases.set('flightcast', getDefaultFeedUrl());
  }

  if (defaultHost === BUZZSPROUT_HOST) {
    aliases.set('buzzsprout', getDefaultFeedUrl());
  }

  const aliasesFromEnv = parseList(
    getEnvironmentValue('FEED_SOURCE_ALIASES')
  );

  for (const entry of aliasesFromEnv) {
    const [name, url] = entry.split('=');
    const normalizedName = name?.trim().toLowerCase();
    const normalizedUrl = url ? normalizeUrl(url.trim()) : undefined;

    if (normalizedName && normalizedUrl) {
      aliases.set(normalizedName, normalizedUrl);
    }
  }

  return aliases;
}

function buildFlightcastUrl(pathname: string) {
  const normalizedPath = pathname.replace(/^\/+/, '').replace(/\.xml$/i, '');
  return normalizedPath
    ? `https://${FLIGHTCAST_HOST}/${normalizedPath}.xml`
    : undefined;
}

function buildBuzzsproutUrl(pathname: string) {
  let normalizedPath = pathname.replace(/^\/+/, '');

  if (!normalizedPath) return undefined;
  if (!normalizedPath.toLowerCase().endsWith('.rss')) {
    normalizedPath = `${normalizedPath}.rss`;
  }

  return `https://${BUZZSPROUT_HOST}/${normalizedPath}`;
}

function resolveCandidateUrl(requested: string) {
  const cleaned = requested.trim();
  if (!cleaned) return undefined;

  const aliasUrl = getFeedAliases().get(cleaned.toLowerCase());
  if (aliasUrl) {
    return aliasUrl;
  }

  const directUrl = normalizeUrl(cleaned);
  if (directUrl) {
    return directUrl;
  }

  const withoutScheme = cleaned.replace(/^https?:\/\//i, '');

  if (/^flightcast[:/]/i.test(withoutScheme)) {
    return buildFlightcastUrl(withoutScheme.replace(/^flightcast[:/]/i, ''));
  }

  if (/^buzzsprout[:/]/i.test(withoutScheme)) {
    return buildBuzzsproutUrl(withoutScheme.replace(/^buzzsprout[:/]/i, ''));
  }

  if (withoutScheme.toLowerCase().startsWith(`${FLIGHTCAST_HOST}/`)) {
    return normalizeUrl(`https://${withoutScheme}`);
  }

  if (withoutScheme.toLowerCase().startsWith(`${BUZZSPROUT_HOST}/`)) {
    return normalizeUrl(`https://${withoutScheme}`);
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i.test(withoutScheme)) {
    return normalizeUrl(`https://${withoutScheme}`);
  }

  return undefined;
}

export function isAllowedFeedUrl(candidate: string | URL) {
  try {
    const url = typeof candidate === 'string' ? new URL(candidate) : candidate;

    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }

    return getFeedAllowlist().some((pattern) =>
      matchesHostnamePattern(url.hostname, pattern)
    );
  } catch {
    return false;
  }
}

export function getRequestedFeed(searchParams: URLSearchParams) {
  return searchParams.get('feed') ?? searchParams.get('url');
}

export function resolveFeedSource(
  requested?: string | null
): FeedSourceResolution {
  const defaultFeedUrl = getDefaultFeedUrl();
  const cleaned = requested?.trim();

  if (!cleaned) {
    return {
      resolvedUrl: defaultFeedUrl,
      isDefault: true,
      isValid: true
    };
  }

  const candidate = resolveCandidateUrl(cleaned);
  if (!candidate) {
    return {
      requested: cleaned,
      resolvedUrl: defaultFeedUrl,
      isDefault: true,
      isValid: false,
      invalidReason: 'Feed source could not be normalized'
    };
  }

  if (!isAllowedFeedUrl(candidate)) {
    return {
      requested: cleaned,
      resolvedUrl: defaultFeedUrl,
      isDefault: true,
      isValid: false,
      invalidReason: 'Feed source is not in the allowlist'
    };
  }

  const resolvedUrl = normalizeUrl(candidate) ?? defaultFeedUrl;
  const isDefault = resolvedUrl === defaultFeedUrl;

  return {
    requested: cleaned,
    resolvedUrl,
    queryValue: isDefault ? undefined : cleaned,
    isDefault,
    isValid: true
  };
}

export function withFeedQuery(pathname: string, feedQueryValue?: string) {
  if (!feedQueryValue) return pathname;

  const url = new URL(pathname, 'https://iqpod.local');
  url.searchParams.set('feed', feedQueryValue);

  return `${url.pathname}${url.search}${url.hash}`;
}
