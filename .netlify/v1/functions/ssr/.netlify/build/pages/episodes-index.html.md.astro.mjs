import { a as generateEpisodesIndex } from '../chunks/llms_BmSyglTy.mjs';
import { g as getShowInfo, a as getAllEpisodes } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

const GET = async ({
  site
}) => {
  const show = await getShowInfo();
  const episodes = await getAllEpisodes();
  const markdown = generateEpisodesIndex(show, episodes, site);
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
