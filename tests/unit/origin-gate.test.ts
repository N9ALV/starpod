import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { canonicalIqPodLocation, enforceIqPodOrigin } from '../../src/lib/origin-gate';

describe('IQPod origin gate', () => {
  it('runs the Worker before Cloudflare static asset delivery', () => {
    const config = JSON.parse(
      readFileSync(join(process.cwd(), 'wrangler.jsonc'), 'utf8'),
    ) as { main?: string; assets?: { run_worker_first?: boolean } };
    expect(config.main).toBe('./src/worker.ts');
    expect(config.assets?.run_worker_first).toBe(true);
  });

  it('redirects direct document navigation to the canonical IU route', async () => {
    const request = new Request('https://iqpod.tradegpt.ai/episode-one?feed=a&feed=b&zero=0', {
      headers: {
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
      },
    });
    const response = await enforceIqPodOrigin(request, 'expected');

    expect(response?.status).toBe(302);
    expect(response?.headers.get('location')).toBe(
      'https://iu.com.au/iq/app/iqpod/episode-one?feed=a&feed=b&zero=0',
    );
    expect(canonicalIqPodLocation(request)).toBe(response?.headers.get('location'));
  });

  it('fails closed for direct subresources and permits the router credential', async () => {
    const directAsset = new Request('https://iqpod.tradegpt.ai/_astro/app.js', {
      headers: { 'sec-fetch-dest': 'script' },
    });
    expect((await enforceIqPodOrigin(directAsset, 'expected'))?.status).toBe(404);

    const routedAsset = new Request(directAsset, {
      headers: {
        'sec-fetch-dest': 'script',
        'x-iu-vault-origin-token': 'expected',
      },
    });
    expect(await enforceIqPodOrigin(routedAsset, 'expected')).toBeNull();
  });
});
