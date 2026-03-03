import { describe, expect, it } from 'vitest';

import {
  getAllowedParentOrigin,
  matchesOriginPattern,
  shouldRequireEmbedGate
} from '../../src/lib/embed-gate';

describe('embed-gate helpers', () => {
  it('matches exact and wildcard parent origins', () => {
    expect(matchesOriginPattern('https://iu.com.au', 'https://iu.com.au')).toBe(
      true
    );
    expect(
      matchesOriginPattern(
        'https://www.iqpod.tradegpt.ai',
        'https://*.iqpod.tradegpt.ai'
      )
    ).toBe(true);
    expect(
      matchesOriginPattern(
        'https://eviltradegpt.ai',
        'https://*.iqpod.tradegpt.ai'
      )
    ).toBe(false);
  });

  it('returns the first allowed parent origin from the candidate list', () => {
    expect(
      getAllowedParentOrigin(
        ['https://example.com', 'https://www.iqpod.tradegpt.ai'],
        ['https://iu.com.au', 'https://*.iqpod.tradegpt.ai']
      )
    ).toBe('https://www.iqpod.tradegpt.ai');
  });

  it('allows top-level visits when configured', () => {
    expect(
      shouldRequireEmbedGate({
        enabled: true,
        allowTopLevel: true,
        inIframe: false,
        unlocked: false,
        allowedParentOrigin: null
      })
    ).toBe(false);
  });

  it('requires the gate for iframe visits from unapproved parents', () => {
    expect(
      shouldRequireEmbedGate({
        enabled: true,
        allowTopLevel: true,
        inIframe: true,
        unlocked: false,
        allowedParentOrigin: null
      })
    ).toBe(true);
  });

  it('skips the gate once the parent is allowed or the view is unlocked', () => {
    expect(
      shouldRequireEmbedGate({
        enabled: true,
        allowTopLevel: true,
        inIframe: true,
        unlocked: false,
        allowedParentOrigin: 'https://iu.com.au'
      })
    ).toBe(false);
    expect(
      shouldRequireEmbedGate({
        enabled: true,
        allowTopLevel: false,
        inIframe: true,
        unlocked: true,
        allowedParentOrigin: null
      })
    ).toBe(false);
  });
});
