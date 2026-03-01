import { e as createAstro, c as createComponent, d as addAttribute, a as renderScript, b as renderTemplate, u as unescapeHTML, r as renderComponent, m as maybeRenderHead, j as renderSlot, k as renderHead } from './astro/server_bMrKh8MO.mjs';
import { $ as $$Image, a as $$Font } from './_astro_assets_Bh7msR-z.mjs';
/* empty css                             */
import { s as starpodConfig, g as getShowInfo } from './rss_D0GbRL7n.mjs';
import { signal } from '@preact/signals';
import { jsx, jsxs } from 'preact/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'preact/hooks';

const $$Astro$5 = createAstro("https://whiskey.fm");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/node_modules/.pnpm/astro@5.16.8_@netlify+blobs_6b0d5e0c72f3cc8e1bed810ab3a91c80/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/node_modules/.pnpm/astro@5.16.8_@netlify+blobs_6b0d5e0c72f3cc8e1bed810ab3a91c80/node_modules/astro/components/ClientRouter.astro", void 0);

function JsonLd(item, space) {
  return JSON.stringify(item, safeJsonLdReplacer, space);
}
const ESCAPE_ENTITIES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
});
const ESCAPE_REGEX = new RegExp(
  `[${Object.keys(ESCAPE_ENTITIES).join("")}]`,
  "g"
);
const ESCAPE_REPLACER = (t) => ESCAPE_ENTITIES[t];
const safeJsonLdReplacer = /* @__PURE__ */ (() => {
  return (_, value) => {
    switch (typeof value) {
      case "object":
        if (value === null) {
          return void 0;
        }
        return value;
      // JSON.stringify will recursively call replacer.
      case "number":
      case "boolean":
      case "bigint":
        return value;
      // These values are not risky.
      case "string":
        return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER);
      default: {
        return void 0;
      }
    }
  };
})();

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$4 = createAstro("https://whiskey.fm");
const $$Schema = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Schema;
  const { item, space } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JsonLd(item, space)));
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/node_modules/.pnpm/astro-seo-schema@5.1.0_astr_eb6d00bb48f0b7393619811e34127613/node_modules/astro-seo-schema/dist/Schema.astro", void 0);

const $$Astro$3 = createAstro("https://whiskey.fm");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/node_modules/.pnpm/@vercel+speed-insights@1.2.0_react@19.0.0/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/node_modules/.pnpm/@vercel+speed-insights@1.2.0_react@19.0.0/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

const $$Astro$2 = createAstro("https://whiskey.fm");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { url } = Astro2;
  const { title } = Astro2.props;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: Astro2.site?.toString() || "/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: new URL(url, Astro2.site).toString()
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Schema", $$Schema, { "item": breadcrumbSchema })} ${maybeRenderHead()}<nav class="flex" aria-label="Breadcrumb"> <ol role="list" class="flex items-center space-x-4 text-sm"> <li> <div> <a href="/" class="text-gray-400 hover:text-gray-500"> Home </a> </div> </li> <li> <div class="flex items-center"> <svg class="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path> </svg> <a${addAttribute(url, "href")} class="ml-4 line-clamp-1 font-medium text-gray-500 hover:text-gray-700"> ${title} </a> </div> </li> </ol> </nav>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/Breadcrumbs.astro", void 0);

const $$Dots = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="absolute top-0 left-0 flex h-12 w-full justify-center p-2"> <div class="bg-dots-light dark:bg-dots-dark h-12 w-full bg-repeat-x"></div> </div>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/Dots.astro", void 0);

const $$Hosts = createComponent(($$result, $$props, $$slots) => {
  const { hosts } = starpodConfig;
  const images = /* #__PURE__ */ Object.assign({"/src/img/people/aarondfrancis.jpg": () => import('./aarondfrancis_D6cWAp2s.mjs'),"/src/img/people/adamrackis.jpg": () => import('./adamrackis_B1_6kndI.mjs'),"/src/img/people/adamstac.jpg": () => import('./adamstac_CXIW7sm-.mjs'),"/src/img/people/amerawhite2.jpg": () => import('./amerawhite2_1EfqCJnc.mjs'),"/src/img/people/argyleink.jpg": () => import('./argyleink_K51pH7NJ.mjs'),"/src/img/people/avatar-dark.png": () => import('./avatar-dark_BM2M-0Al.mjs'),"/src/img/people/avatar-light.png": () => import('./avatar-light_CPlRIA9k.mjs'),"/src/img/people/bdougieyo.jpg": () => import('./bdougieyo_BeVOrtI3.mjs'),"/src/img/people/bholmesdev.jpg": () => import('./bholmesdev_ByZv741U.mjs'),"/src/img/people/burgessdryan.jpg": () => import('./burgessdryan_BmOXb6YQ.mjs'),"/src/img/people/bytesofbree.jpg": () => import('./bytesofbree_CFSK6MTI.mjs'),"/src/img/people/carlopiana.jpg": () => import('./carlopiana_CSzGxklu.mjs'),"/src/img/people/chriscoyier.jpg": () => import('./chriscoyier_BXoRgqRw.mjs'),"/src/img/people/chuckcarpenter.jpg": () => import('./chuckcarpenter_B5n28AWC.mjs'),"/src/img/people/dabeeeenster.jpg": () => import('./dabeeeenster_BR59kFVu.mjs'),"/src/img/people/damianedwards.jpg": () => import('./damianedwards_BMXMbaKN.mjs'),"/src/img/people/dantelex.jpg": () => import('./dantelex_ZEp5Urwc.mjs'),"/src/img/people/davideast.jpg": () => import('./davideast_n_xisuMg.mjs'),"/src/img/people/davidfowl.jpg": () => import('./davidfowl_B8ZVBQyI.mjs'),"/src/img/people/davidkpiano.jpg": () => import('./davidkpiano_Da-RnxBo.mjs'),"/src/img/people/dblums.jpg": () => import('./dblums_DPrVUv7Y.mjs'),"/src/img/people/diegogonzalez.jpg": () => import('./diegogonzalez_OgwulLTm.mjs'),"/src/img/people/engineering_bae.jpg": () => import('./engineering_bae_VzBRa_6r.mjs'),"/src/img/people/esthor.jpg": () => import('./esthor_DOWy38xs.mjs'),"/src/img/people/henrihelvetica.jpg": () => import('./henrihelvetica_C-TlJCyU.mjs'),"/src/img/people/hkrackdev.jpg": () => import('./hkrackdev_BSDLXKSi.mjs'),"/src/img/people/htmx_org.jpg": () => import('./htmx_org_C_2FSAMM.mjs'),"/src/img/people/jamesqquick.jpg": () => import('./jamesqquick_OKFqNFXF.mjs'),"/src/img/people/jeffpcma.jpg": () => import('./jeffpcma_CWhrtb9K.mjs'),"/src/img/people/jemyoung.png": () => import('./jemyoung_Bmpq4E0h.mjs'),"/src/img/people/jerodsanto.jpg": () => import('./jerodsanto_BAGJaUaY.mjs'),"/src/img/people/jlengstorf.jpg": () => import('./jlengstorf_Bb-374OR.mjs'),"/src/img/people/joelgriffith.jpg": () => import('./joelgriffith_BUFyFT6m.mjs'),"/src/img/people/joshcirre.jpg": () => import('./joshcirre_BgBGms45.mjs'),"/src/img/people/ken_wheeler.jpg": () => import('./ken_wheeler_FtxsHN-f.mjs'),"/src/img/people/kendallmiller.jpg": () => import('./kendallmiller_Ovg465I0.mjs'),"/src/img/people/kevinwhinnery.jpg": () => import('./kevinwhinnery_DtmhYlOU.mjs'),"/src/img/people/kvlly.jpg": () => import('./kvlly_d8FxMxY7.mjs'),"/src/img/people/madisonkanna.jpg": () => import('./madisonkanna_BNO0P93f.mjs'),"/src/img/people/malware_yml.jpg": () => import('./malware_yml_D5eGoV82.mjs'),"/src/img/people/mansona.jpg": () => import('./mansona_COWTog1j.mjs'),"/src/img/people/michellebakels.jpg": () => import('./michellebakels_Dt_xN9kW.mjs'),"/src/img/people/nickytonline.jpg": () => import('./nickytonline_DJ8naYHw.mjs'),"/src/img/people/nvenditto.jpg": () => import('./nvenditto_DPln4x0T.mjs'),"/src/img/people/pbwinston.jpg": () => import('./pbwinston_DDPX3JKo.mjs'),"/src/img/people/rauchg.jpg": () => import('./rauchg_BoaRyGiE.mjs'),"/src/img/people/rich_harris.jpg": () => import('./rich_harris_Dbfgl2Gc.mjs'),"/src/img/people/rishimalik.jpg": () => import('./rishimalik_RZd04eQd.mjs'),"/src/img/people/robbiethewagner.jpg": () => import('./robbiethewagner_BQg1uJiH.mjs'),"/src/img/people/robbyrussell.jpg": () => import('./robbyrussell_DCqIYDm0.mjs'),"/src/img/people/roxanacodes.jpg": () => import('./roxanacodes_CI_hLEcr.mjs'),"/src/img/people/rwjblue.jpg": () => import('./rwjblue_vTiitGHY.mjs'),"/src/img/people/shaundai.jpg": () => import('./shaundai_DZYUuhac.mjs'),"/src/img/people/shrutikapoor08.jpg": () => import('./shrutikapoor08_Bl8UZDVv.mjs'),"/src/img/people/tasonjorres.jpg": () => import('./tasonjorres_CCvsi5xV.mjs'),"/src/img/people/tdesseyn.jpg": () => import('./tdesseyn_C8QTL3BQ.mjs'),"/src/img/people/techgirl1908.jpg": () => import('./techgirl1908_2BK5qLjG.mjs'),"/src/img/people/techsavvytravvy.jpg": () => import('./techsavvytravvy_BssFDRlr.mjs'),"/src/img/people/thdxr.jpg": () => import('./thdxr_C9JM_8mh.mjs'),"/src/img/people/theaprilyoho.jpg": () => import('./theaprilyoho_Bq-8KpMd.mjs'),"/src/img/people/theclarksell.jpg": () => import('./theclarksell_Blxl5ieC.mjs'),"/src/img/people/themarcba.jpg": () => import('./themarcba_CfzpPqzf.mjs'),"/src/img/people/theonlyspotty.jpg": () => import('./theonlyspotty_6s2aPAx0.mjs'),"/src/img/people/theprimeagen.jpg": () => import('./theprimeagen_BI-5Los9.mjs'),"/src/img/people/tom_barrasso.jpg": () => import('./tom_barrasso_B-Gke38D.mjs'),"/src/img/people/typecraft_dev.jpg": () => import('./typecraft_dev_B3ZbI4ir.mjs'),"/src/img/people/wagslane.jpg": () => import('./wagslane_CfzhYVXb.mjs'),"/src/img/people/wesbos.jpg": () => import('./wesbos_C9gMD9EF.mjs'),"/src/img/people/willjohnsonio.jpg": () => import('./willjohnsonio_DKHjrPbk.mjs'),"/src/img/people/zeeg.jpg": () => import('./zeeg_D5RnGmsF.mjs')

});
  return renderTemplate`${maybeRenderHead()}<div class="bg-light-card dark:bg-dark-card mx-2 mt-2 rounded-lg px-4 pt-12 pb-12 sm:px-6 md:px-4 lg:mx-0 lg:mt-0 lg:px-16 lg:pb-0"> <h3 class="section-heading pb-6">Hosted By</h3> ${hosts.map((host) => renderTemplate`<div class="mb-4 flex items-center"> ${renderComponent($$result, "Image", $$Image, { "class": "mr-4 h-12 w-12 rounded-lg", "height": 48, "src": images[`/src/img/people/${host.img}`](), "width": 48, "alt": "", "loading": "lazy" })} ${host.name} </div>`)} </div>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/Hosts.astro", void 0);

const $$InfoCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="m-2 mb-2 rounded-lg bg-light-card px-4 py-12 sm:px-6 md:px-4 lg:px-16 dark:bg-dark-card"> <a class="animated-bottom-border block pt-5 after:mt-5" href="/about">
About</a> <a class="animated-bottom-border block pt-5 after:mt-5" href="/contact">
Contact
</a> <a class="animated-bottom-border block pt-5 after:mt-5" href="https://whiskey.fund/">
Store
</a> <a class="animated-bottom-border block pt-5 after:mt-5" href="/sponsor">
Become a sponsor
</a> </div>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/InfoCard.astro", void 0);

const $$Platforms = createComponent(async ($$result, $$props, $$slots) => {
  const { platforms } = starpodConfig;
  const show = await getShowInfo();
  return renderTemplate`${maybeRenderHead()}<h3 class="section-heading hidden pt-12 pb-6 lg:block" data-astro-cid-le45m4z2>Listen</h3> <div class="mt-16 flex items-center justify-center gap-6 lg:mt-0 lg:justify-start" data-astro-cid-le45m4z2> ${platforms?.spotify && renderTemplate`<a class="gradient-icon spotify h-6 w-6"${addAttribute(platforms.spotify, "href")}${addAttribute(`Listen to ${show.title} on Spotify.`, "aria-label")} data-astro-cid-le45m4z2></a>`} ${platforms?.apple && renderTemplate`<a class="gradient-icon apple h-6 w-6"${addAttribute(platforms.apple, "href")}${addAttribute(`Listen to ${show.title} on Apple Podcasts.`, "aria-label")} data-astro-cid-le45m4z2></a>`} ${platforms?.overcast && renderTemplate`<a class="gradient-icon overcast h-6 w-6"${addAttribute(platforms.overcast, "href")}${addAttribute(`Listen to ${show.title} on Overcast.`, "aria-label")} data-astro-cid-le45m4z2></a>`} ${platforms?.pocketCasts && renderTemplate`<a class="gradient-icon pocket-casts h-6 w-6"${addAttribute(platforms.pocketCasts, "href")}${addAttribute(`Listen to ${show.title} on Pocket Casts.`, "aria-label")} data-astro-cid-le45m4z2></a>`} ${platforms?.youtube && renderTemplate`<a class="gradient-icon youtube h-7 w-7"${addAttribute(platforms.youtube, "href")}${addAttribute(`Watch ${show.title} on YouTube.`, "aria-label")} data-astro-cid-le45m4z2></a>`} </div> `;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/Platforms.astro", void 0);

const currentEpisode = signal(null);
const isPlaying = signal(false);
signal(false);
const isSearchOpen = signal(false);

function SearchButton() {
  return jsx("button", {
    type: "button",
    class: "btn",
    onClick: () => isSearchOpen.value = true,
    "aria-label": "Search episodes (⌘K)",
    children: jsxs("span", {
      class: "text-light-text-heading flex items-center gap-2 rounded-full px-3 py-2 text-sm dark:text-white",
      children: [jsx("span", {
        class: "search-icon h-4 w-4",
        "aria-hidden": "true"
      }), jsx("span", {
        class: "hidden sm:inline",
        children: "Search"
      }), jsxs("kbd", {
        class: "hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-light-card dark:bg-dark-card rounded border border-light-input-border dark:border-dark-input-border",
        children: [jsx("span", {
          class: "text-xs",
          children: "⌘"
        }), "K"]
      })]
    })
  });
}

function SearchDialog() {
  const [query, setQuery] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  useEffect(() => {
    fetch("/api/episodes/search.json").then((res) => res.json()).then((data) => setEpisodes(data)).catch(console.error);
  }, []);
  useEffect(() => {
    if (!query.trim()) {
      setFilteredEpisodes(episodes.slice(0, 8));
      setSelectedIndex(0);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = episodes.filter((episode) => episode.title.toLowerCase().includes(lowerQuery) || episode.description.toLowerCase().includes(lowerQuery) || (episode.episodeNumber?.toLowerCase().includes(lowerQuery) ?? false)).slice(0, 8);
    setFilteredEpisodes(filtered);
    setSelectedIndex(0);
  }, [query, episodes]);
  useEffect(() => {
    if (isSearchOpen.value) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isSearchOpen.value]);
  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      isSearchOpen.value = !isSearchOpen.value;
      return;
    }
    if (e.key === "Escape" && isSearchOpen.value) {
      e.preventDefault();
      isSearchOpen.value = false;
      return;
    }
    if (isSearchOpen.value && filteredEpisodes.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => prev < filteredEpisodes.length - 1 ? prev + 1 : prev);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => prev > 0 ? prev - 1 : prev);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredEpisodes[selectedIndex];
        if (selected) {
          window.location.href = `/${selected.episodeSlug}`;
        }
      }
    }
  }, [filteredEpisodes, selectedIndex]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  useEffect(() => {
    if (resultsRef.current) {
      const selectedEl = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedEl?.scrollIntoView({
        block: "nearest"
      });
    }
  }, [selectedIndex]);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      isSearchOpen.value = false;
    }
  };
  if (!isSearchOpen.value) {
    return null;
  }
  return jsx("div", {
    class: "fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[10vh]",
    onClick: handleBackdropClick,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Search episodes",
    children: jsxs("div", {
      class: "bg-light-card dark:bg-dark-card w-full max-w-xl mx-4 rounded-lg shadow-2xl border border-light-input-border dark:border-dark-border overflow-hidden",
      children: [jsxs("div", {
        class: "flex items-center border-b border-light-input-border dark:border-dark-border px-4",
        children: [jsx("span", {
          class: "search-icon h-5 w-5 text-light-icon dark:text-dark-icon shrink-0",
          "aria-hidden": "true"
        }), jsx("input", {
          ref: inputRef,
          type: "text",
          class: "flex-1 bg-transparent px-4 py-4 text-light-text-heading dark:text-white placeholder-light-text-body dark:placeholder-dark-text-body outline-none border-none focus:ring-0",
          placeholder: "Search episodes...",
          value: query,
          onInput: (e) => setQuery(e.target.value),
          "aria-label": "Search episodes",
          "aria-autocomplete": "list",
          "aria-controls": "search-results"
        }), jsx("kbd", {
          class: "hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-light-text-body dark:text-dark-text-body bg-light-input-bg dark:bg-dark-input-bg rounded border border-light-input-border dark:border-dark-input-border",
          children: jsx("span", {
            class: "text-xs",
            children: "ESC"
          })
        })]
      }), jsx("div", {
        ref: resultsRef,
        id: "search-results",
        class: "max-h-80 overflow-y-auto p-2",
        role: "listbox",
        children: filteredEpisodes.length === 0 ? jsx("div", {
          class: "p-4 text-center text-light-text-body dark:text-dark-text-body",
          children: query ? "No episodes found" : "Start typing to search episodes..."
        }) : filteredEpisodes.map((episode, index) => jsxs("a", {
          href: `/${episode.episodeSlug}`,
          "data-index": index,
          class: `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${index === selectedIndex ? "bg-light-input-bg dark:bg-dark-input-bg" : "hover:bg-light-input-bg dark:hover:bg-dark-input-bg"}`,
          role: "option",
          "aria-selected": index === selectedIndex,
          onClick: () => isSearchOpen.value = false,
          children: [jsxs("div", {
            class: "flex-1 min-w-0",
            children: [jsxs("div", {
              class: "flex items-center gap-2",
              children: [jsxs("span", {
                class: "text-xs font-medium text-light-icon dark:text-dark-icon",
                children: ["#", episode.episodeNumber]
              }), jsx("span", {
                class: "text-sm font-semibold text-light-text-heading dark:text-white truncate",
                children: episode.title
              })]
            }), jsx("p", {
              class: "text-xs text-light-text-body dark:text-dark-text-body truncate mt-1",
              children: episode.description
            })]
          }), index === selectedIndex && jsx("kbd", {
            class: "hidden sm:inline-flex items-center px-2 py-1 text-xs text-light-text-body dark:text-dark-text-body bg-light-card dark:bg-dark-card rounded border border-light-input-border dark:border-dark-input-border",
            children: "↵"
          })]
        }, episode.id))
      }), jsxs("div", {
        class: "flex items-center justify-between px-4 py-2 border-t border-light-input-border dark:border-dark-border text-xs text-light-text-body dark:text-dark-text-body",
        children: [jsxs("div", {
          class: "flex items-center gap-4",
          children: [jsxs("span", {
            class: "hidden sm:inline-flex items-center gap-1",
            children: [jsx("kbd", {
              class: "px-1.5 py-0.5 bg-light-input-bg dark:bg-dark-input-bg rounded border border-light-input-border dark:border-dark-input-border",
              children: "↑"
            }), jsx("kbd", {
              class: "px-1.5 py-0.5 bg-light-input-bg dark:bg-dark-input-bg rounded border border-light-input-border dark:border-dark-input-border",
              children: "↓"
            }), jsx("span", {
              children: "to navigate"
            })]
          }), jsxs("span", {
            class: "hidden sm:inline-flex items-center gap-1",
            children: [jsx("kbd", {
              class: "px-1.5 py-0.5 bg-light-input-bg dark:bg-dark-input-bg rounded border border-light-input-border dark:border-dark-input-border",
              children: "↵"
            }), jsx("span", {
              children: "to select"
            })]
          })]
        }), jsxs("span", {
          children: [filteredEpisodes.length, " ", filteredEpisodes.length === 1 ? "result" : "results"]
        })]
      })]
    })
  });
}

const $$Astro$1 = createAstro("https://whiskey.fm");
const $$ShowArtwork = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ShowArtwork;
  const { image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a href="/" aria-label="Homepage"> <div class="px-4 sm:px-6 md:px-4 lg:px-16"> <div class="atropos show-art"> <div class="atropos-scale"> <div class="atropos-rotate"> <div class="atropos-inner"> <div class="relative mx-auto block w-48 overflow-hidden rounded-lg sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"> <img class="w-full"${addAttribute(image, "src")} alt="" height="321" width="321" loading="eager" fetchpriority="high"> </div> </div> </div> </div> </div> </div> </a> ${renderScript($$result, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/ShowArtwork.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/ShowArtwork.astro", void 0);

const $$Astro = createAstro("https://whiskey.fm");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const show = await getShowInfo();
  const { imageUrl, title } = Astro2.props;
  const canonicalURL = Astro2.props.canonicalURL ?? new URL(Astro2.url.pathname, Astro2.site);
  const description = Astro2.props.description ?? starpodConfig.description;
  return renderTemplate`<html lang="en" dir="ltr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="sitemap" href="/sitemap-index.xml"><link rel="canonical"${addAttribute(canonicalURL, "href")}><meta${addAttribute(canonicalURL, "content")} property="og:url"><meta content="website" property="og:type">${starpodConfig.platforms.appleIdNumber && renderTemplate`<meta name="apple-itunes-app"${addAttribute(`app-id=${starpodConfig.platforms.appleIdNumber}`, "content")}>`}<!-- Favicons --><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)"><!-- Title --><title>${title}</title><meta${addAttribute(title, "content")} property="og:title"><meta${addAttribute(title, "content")} name="twitter:title"><!-- Description --><meta${addAttribute(description, "content")} name="description"><meta${addAttribute(description, "content")} property="og:description"><meta${addAttribute(description, "content")} name="twitter:description"><!-- Image --><meta${addAttribute(imageUrl ?? show.image, "content")} property="og:image"><meta content="summary" name="twitter:card"><meta${addAttribute(imageUrl ?? show.image, "content")} name="twitter:image:src"><meta property="og:site_name"${addAttribute(show.title, "content")}><link rel="preload" as="image"${addAttribute(show.image, "href")}>${renderComponent($$result, "Font", $$Font, { "cssVariable": "--astro-font-inter", "preload": true })}${renderComponent($$result, "Schema", $$Schema, { "slot": "head", "item": {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: show.title,
    about: starpodConfig.blurb,
    description: show.description,
    url: canonicalURL.toString(),
    webFeed: starpodConfig.rssFeed,
    author: {
      "@type": "Organization",
      name: show.title,
      url: canonicalURL.origin
    },
    publisher: {
      "@type": "Organization",
      name: show.title,
      url: canonicalURL.origin
    },
    image: show.image
  } })}${renderSlot($$result, $$slots["head"])}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="font-inter text-light-text-body dark:bg-dark-background dark:text-dark-text-body antialiased"> <header class="custom-scrollbar lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120" data-astro-transition-persist="sidenav"> <div class="relative z-10 mx-auto lg:min-h-full lg:flex-auto"> <div class="bg-light-card dark:bg-dark-card m-2 rounded-lg pt-10 pb-4 lg:pt-16 lg:pb-12"> ${renderComponent($$result, "ShowArtwork", $$ShowArtwork, { "image": show.image })} <div class="px-4 sm:px-6 md:px-4 lg:px-16"> <p class="text-light-text-heading mt-8 text-center text-2xl font-bold lg:text-left dark:text-white"> ${show.title} </p> <p class="mt-2 text-center text-lg lg:text-left"> ${starpodConfig.blurb} </p> </div> <div class="px-4 sm:px-6 md:px-4 lg:px-16"> ${renderComponent($$result, "Platforms", $$Platforms, {})} </div> <div class="hidden lg:block"> ${renderComponent($$result, "Hosts", $$Hosts, {})} </div> </div> <div class="hidden lg:block"> ${renderComponent($$result, "InfoCard", $$InfoCard, {})} </div> </div> </header> <main class="bg-light-card dark:bg-dark-card mx-2 mb-2 rounded-lg lg:relative lg:ml-112 lg:min-h-screen xl:ml-120"> <div class="absolute top-4 right-4 z-30"> ${renderComponent($$result, "SearchButton", SearchButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/SearchButton", "client:component-export": "default" })} </div> <div class="relative mt-2 pt-16"> <div class="bg-gradient-light dark:bg-gradient-dark absolute top-0 right-0 left-0 z-0 h-80 w-full opacity-30"></div> ${renderComponent($$result, "Dots", $$Dots, {})} <div class="max-w-4xl"> <div${addAttribute([
    "dark:border-dark-border relative z-20 mb-12 border-b pb-6 lg:mb-16 lg:pb-10",
    Astro2.url.pathname === "/" && "hidden"
  ], "class:list")}> <div class="ml-8 lg:ml-18"> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, { "title": title })} </div> </div> ${renderSlot($$result, $$slots["default"])} </div> </div> </main> <footer class="block lg:hidden"> ${renderComponent($$result, "Hosts", $$Hosts, {})} ${renderComponent($$result, "InfoCard", $$InfoCard, {})} </footer> <div id="audio-player"> ${renderComponent($$result, "Player", null, { "client:only": "preact", "data-astro-transition-persist": "player", "client:component-hydration": "only", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/Player", "client:component-export": "default" })} </div> ${renderComponent($$result, "SearchDialog", SearchDialog, { "client:load": true, "data-astro-transition-persist": "search-dialog", "client:component-hydration": "load", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/SearchDialog", "client:component-export": "default" })} ${renderComponent($$result, "SpeedInsights", $$Index, {})} </body></html>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/layouts/Layout.astro", "self");

export { $$Layout as $, $$Schema as a, currentEpisode as c, isPlaying as i };
