import { describe, expect, it } from 'vitest';

import {
  getRequestedFeed,
  resolveFeedSource,
  withFeedQuery
} from '../../src/lib/feed-source';

describe('feed-source helpers', () => {
  it('uses the configured default feed when nothing is requested', () => {
    const result = resolveFeedSource();

    expect(result.isDefault).toBe(true);
    expect(result.isValid).toBe(true);
    expect(result.queryValue).toBeUndefined();
    expect(result.resolvedUrl).toBe(
      'https://rss.flightcast.com/w7bqgc792i30fd43a32uawx0.xml'
    );
  });

  it('normalizes Buzzsprout shorthand feeds', () => {
    const result = resolveFeedSource('buzzsprout/1410787');

    expect(result.isValid).toBe(true);
    expect(result.isDefault).toBe(false);
    expect(result.queryValue).toBe('buzzsprout/1410787');
    expect(result.resolvedUrl).toBe(
      'https://feeds.buzzsprout.com/1410787.rss'
    );
  });

  it('normalizes raw host-and-path feed requests', () => {
    const result = resolveFeedSource(
      'rss.flightcast.com/w7bqgc792i30fd43a32uawx0.xml'
    );

    expect(result.isValid).toBe(true);
    expect(result.resolvedUrl).toBe(
      'https://rss.flightcast.com/w7bqgc792i30fd43a32uawx0.xml'
    );
  });

  it('accepts scheme-less feed urls in the feed query', () => {
    const result = resolveFeedSource('feeds.libsyn.com/121695/rss');

    expect(result.isValid).toBe(true);
    expect(result.isDefault).toBe(false);
    expect(result.queryValue).toBe('feeds.libsyn.com/121695/rss');
    expect(result.resolvedUrl).toBe('https://feeds.libsyn.com/121695/rss');
  });

  it('accepts known external feed hosts without requiring https', () => {
    expect(
      resolveFeedSource('anchor.fm/s/3874a3c8/podcast/rss').resolvedUrl
    ).toBe('https://anchor.fm/s/3874a3c8/podcast/rss');
    expect(
      resolveFeedSource(
        'www.interactivebrokers.eu/campus/category/podcasts/feed/'
      ).resolvedUrl
    ).toBe('https://www.interactivebrokers.eu/campus/category/podcasts/feed/');
    expect(
      resolveFeedSource('shows.acast.com/mythic-enablers-podcast').resolvedUrl
    ).toBe('https://shows.acast.com/mythic-enablers-podcast');
  });

  it('falls back to the default feed for disallowed hosts', () => {
    const result = resolveFeedSource('https://example.com/feed.xml');

    expect(result.isValid).toBe(false);
    expect(result.isDefault).toBe(true);
    expect(result.invalidReason).toContain('allowlist');
    expect(result.resolvedUrl).toBe(
      'https://rss.flightcast.com/w7bqgc792i30fd43a32uawx0.xml'
    );
  });

  it('preserves feed queries when building episode and api links', () => {
    expect(withFeedQuery('/api/episodes/search.json', 'buzzsprout/1410787')).toBe(
      '/api/episodes/search.json?feed=buzzsprout%2F1410787'
    );
    expect(withFeedQuery('/test-episode?show=true', 'flightcast')).toBe(
      '/test-episode?show=true&feed=flightcast'
    );
  });

  it('prefers the feed parameter over url when both are present', () => {
    const searchParams = new URLSearchParams({
      feed: 'flightcast',
      url: 'https://feeds.buzzsprout.com/1410787.rss'
    });

    expect(getRequestedFeed(searchParams)).toBe('flightcast');
  });
});
