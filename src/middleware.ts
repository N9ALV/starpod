import { defineMiddleware } from 'astro:middleware';

import { enforceIqPodOrigin, protectIqPodResponse } from './lib/origin-gate';

type CloudflareRuntime = {
  env?: {
    IQPOD_ORIGIN_TOKEN?: string;
  };
};

export const onRequest = defineMiddleware(async (context, next) => {
  const runtime = (context.locals as { runtime?: CloudflareRuntime }).runtime;
  const denied = await enforceIqPodOrigin(
    context.request,
    runtime?.env?.IQPOD_ORIGIN_TOKEN,
  );
  if (denied) return denied;

  return protectIqPodResponse(await next());
});
