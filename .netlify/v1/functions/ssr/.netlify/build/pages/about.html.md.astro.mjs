import { g as generateAboutMarkdown } from '../chunks/llms_BmSyglTy.mjs';
import { g as getShowInfo, s as starpodConfig } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const show = await getShowInfo();
  const markdown = generateAboutMarkdown(show, starpodConfig);
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
