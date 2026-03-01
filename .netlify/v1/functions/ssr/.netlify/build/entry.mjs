import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CbEgsBsL.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/about.html.md.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/api/episodes/search.json.astro.mjs');
const _page6 = () => import('./pages/api/episodes/_page_.json.astro.mjs');
const _page7 = () => import('./pages/api/feed.json.astro.mjs');
const _page8 = () => import('./pages/contact.astro.mjs');
const _page9 = () => import('./pages/episodes-index.html.md.astro.mjs');
const _page10 = () => import('./pages/for-llms.astro.mjs');
const _page11 = () => import('./pages/for-llms.html.md.astro.mjs');
const _page12 = () => import('./pages/llms.txt.astro.mjs');
const _page13 = () => import('./pages/robots.txt.astro.mjs');
const _page14 = () => import('./pages/sponsor.astro.mjs');
const _page15 = () => import('./pages/_episode_.html.md.astro.mjs');
const _page16 = () => import('./pages/_episode_.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.8_@netlify+blobs_6b0d5e0c72f3cc8e1bed810ab3a91c80/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/about.html.md.ts", _page3],
    ["src/pages/api/contact.ts", _page4],
    ["src/pages/api/episodes/search.json.ts", _page5],
    ["src/pages/api/episodes/[page].json.ts", _page6],
    ["src/pages/api/feed.json.ts", _page7],
    ["src/pages/contact.astro", _page8],
    ["src/pages/episodes-index.html.md.ts", _page9],
    ["src/pages/for-llms.astro", _page10],
    ["src/pages/for-llms.html.md.ts", _page11],
    ["src/pages/llms.txt.ts", _page12],
    ["src/pages/robots.txt.ts", _page13],
    ["src/pages/sponsor.astro", _page14],
    ["src/pages/[episode].html.md.ts", _page15],
    ["src/pages/[episode].astro", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "17356e1e-5ae6-4366-ac9b-9d5e2e8ee3e0"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
