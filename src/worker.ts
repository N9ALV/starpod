import generatedAstroWorker from '../dist/_worker.js/index.js';

import { enforceIqPodOrigin, protectIqPodResponse } from './lib/origin-gate';

type Env = {
  IQPOD_ORIGIN_TOKEN?: string;
  [key: string]: unknown;
};

type GeneratedAstroWorker = {
  fetch(request: Request, env: Env, context: unknown): Promise<Response>;
};

const astroWorker = generatedAstroWorker as GeneratedAstroWorker;

export default {
  async fetch(request: Request, env: Env, context: unknown): Promise<Response> {
    const denied = await enforceIqPodOrigin(request, env.IQPOD_ORIGIN_TOKEN);
    if (denied) return denied;

    return protectIqPodResponse(await astroWorker.fetch(request, env, context));
  },
};
