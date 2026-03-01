import { d as generateLlmsTxt } from '../chunks/llms_BmSyglTy.mjs';
import { g as getShowInfo, a as getAllEpisodes, s as starpodConfig } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

const GET = async ({
  site
}) => {
  const show = await getShowInfo();
  const episodes = await getAllEpisodes();
  const recentEpisodes = episodes.slice(0, 10);
  const content = generateLlmsTxt(show, recentEpisodes, starpodConfig, site);
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
