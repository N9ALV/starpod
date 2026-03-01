import { e as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as addAttribute } from '../chunks/astro/server_bMrKh8MO.mjs';
import { c as currentEpisode, i as isPlaying, $ as $$Layout } from '../chunks/Layout_b1U6WeUI.mjs';
import { $ as $$UFOIllustration, F as FormattedDate } from '../chunks/UFOIllustration_BrnS3e19.mjs';
import { jsx, jsxs } from 'preact/jsx-runtime';
import { d as dasherize, a as getAllEpisodes, g as getShowInfo, s as starpodConfig } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

const PlayIcon = jsx("svg", {
  class: "h-2 w-2",
  fill: "none",
  height: "14",
  viewBox: "0 0 11 14",
  width: "13",
  xmlns: "http://www.w3.org/2000/svg",
  children: jsx("path", {
    "clip-rule": "evenodd",
    d: "m.367882.443158c0-.065142.07026-.106046.126866-.073861l11.541952 6.562623c.0573.03256.0573.11515 0 .14772l-11.541949 6.56266c-.056606.0321-.126865-.0088-.126865-.0739z",
    fill: "currentColor",
    "fill-rule": "evenodd"
  })
});
const PauseIcon = jsx("svg", {
  class: "h-2 w-2",
  fill: "none",
  height: "18",
  viewBox: "0 0 14 18",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg",
  children: jsxs("g", {
    fill: "currentColor",
    children: [jsx("rect", {
      height: "16.8",
      rx: "1.07692",
      width: "5.6",
      y: ".799805"
    }), jsx("rect", {
      height: "16.8",
      rx: "1.07692",
      width: "5.6",
      x: "8.40039",
      y: ".799805"
    })]
  })
});
function renderIcon(icon, key) {
  return jsx("span", {
    children: icon
  }, key);
}
function FullPlayButton({
  episode
}) {
  if (!episode) {
    return null;
  }
  const isCurrentEpisode = episode.id === currentEpisode.value?.id;
  const showPauseIcon = isCurrentEpisode && isPlaying.value;
  return jsx("button", {
    class: "btn",
    onClick: () => {
      currentEpisode.value = {
        audio: episode.audio,
        episodeNumber: episode.episodeNumber,
        id: episode.id,
        title: episode.title
      };
      isPlaying.value = isCurrentEpisode ? !isPlaying.value : true;
    },
    children: jsxs("span", {
      class: "text-light-text-heading flex w-full items-center rounded-full p-2 pr-4 dark:text-white",
      children: [jsx("span", {
        class: "bg-light-text-heading dark:text-dark-button mr-3 flex h-7 w-7 items-center justify-center rounded-full text-white dark:bg-white",
        children: showPauseIcon ? renderIcon(PauseIcon, "pause") : renderIcon(PlayIcon, "play")
      }), showPauseIcon ? "Pause" : "Play", " Episode", jsxs("span", {
        class: "sr-only",
        children: ["(press to ", showPauseIcon ? "pause" : "play", ")"]
      })]
    })
  });
}

const $$Astro$1 = createAstro("https://whiskey.fm");
const $$EpisodeList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EpisodeList;
  const { episodes, show, feed } = Astro2.props;
  const querySuffix = feed ? `?feed=${encodeURIComponent(feed)}` : "";
  return renderTemplate`${episodes.length === 0 ? renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center"><div class="h-auto w-full max-w-80">${renderComponent($$result, "UFOIllustration", $$UFOIllustration, {})}</div><p class="text-light-text-heading py-10 text-lg font-bold dark:text-white">
No episodes yet. Check back soon!
</p></div>` : renderTemplate`<ul aria-label="EpisodeList">${episodes.map((episode) => {
    return renderTemplate`<li class="dark:border-dark-border border-b"><div class="flex w-full flex-col py-12 lg:flex-row"><img${addAttribute(`${episode.title} - episode art`, "alt")} aria-hidden="true" class="mb-3 block h-20 w-20 rounded-md lg:mr-6"${addAttribute(80, "height")} loading="lazy"${addAttribute(episode.episodeThumbnail ?? show.image, "src")}${addAttribute(80, "width")}><div class="flex flex-col">${renderComponent($$result, "FormattedDate", FormattedDate, { "date": new Date(episode.published) })}<h2 class="text-light-text-heading my-2 text-lg font-bold dark:text-white"><a${addAttribute(`/${episode.episodeSlug}${querySuffix}`, "href")}${addAttribute(
      "view-transition-name: var(--should-vt); --vt-name: vt-" + dasherize(episode.title),
      "style"
    )}>${episode.episodeNumber}: ${episode.title}</a></h2><p class="mb-5">${episode.description}</p><div class="flex items-center gap-6 text-sm">${renderComponent($$result, "FullPlayButton", FullPlayButton, { "client:visible": true, "episode": {
      audio: episode.audio,
      episodeNumber: episode.episodeNumber,
      id: episode.id,
      title: episode.title
    }, "client:component-hydration": "visible", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/FullPlayButton", "client:component-export": "default" })}<a class="text-light-text-heading font-bold dark:text-white"${addAttribute(`/${episode.episodeSlug}${querySuffix}`, "href")}>
Show notes
</a></div></div></div></li>`;
  })}</ul>`}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/EpisodeList.astro", void 0);

const $$Astro = createAstro("https://whiskey.fm");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const feed = Astro2.url.searchParams.get("feed") || Astro2.url.searchParams.get("url") || void 0;
  let episodes = [];
  let show = {
    title: "Starpod",
    description: starpodConfig.description,
    image: "",
    link: ""
  };
  try {
    episodes = await getAllEpisodes(feed);
    show = await getShowInfo(feed);
  } catch {
  }
  const title = `${show.title}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative z-10 px-8 lg:px-18"> <h1 class="text-light-text-heading text-4xl font-bold dark:text-white">
Episodes
</h1> ${renderComponent($$result2, "EpisodeList", $$EpisodeList, { "episodes": episodes, "show": show, "feed": feed })} </div> ` })}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/index.astro", void 0);

const $$file = "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
