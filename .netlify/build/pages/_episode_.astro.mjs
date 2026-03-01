import { e as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as addAttribute, F as Fragment, u as unescapeHTML } from '../chunks/astro/server_bMrKh8MO.mjs';
import { g as getEntry } from '../chunks/_astro_content_sANV-5OO.mjs';
import { $ as $$Layout, a as $$Schema } from '../chunks/Layout_b1U6WeUI.mjs';
import { F as FormattedDate, $ as $$UFOIllustration } from '../chunks/UFOIllustration_BrnS3e19.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Bh7msR-z.mjs';
import { g as getShowInfo, a as getAllEpisodes, d as dasherize } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro("https://whiskey.fm");
const $$CreatorsAndGuests = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CreatorsAndGuests;
  const { hostsAndGuests } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/img/people/aarondfrancis.jpg": () => import('../chunks/aarondfrancis_D6cWAp2s.mjs'),"/src/img/people/adamrackis.jpg": () => import('../chunks/adamrackis_B1_6kndI.mjs'),"/src/img/people/adamstac.jpg": () => import('../chunks/adamstac_CXIW7sm-.mjs'),"/src/img/people/amerawhite2.jpg": () => import('../chunks/amerawhite2_1EfqCJnc.mjs'),"/src/img/people/argyleink.jpg": () => import('../chunks/argyleink_K51pH7NJ.mjs'),"/src/img/people/avatar-dark.png": () => import('../chunks/avatar-dark_BM2M-0Al.mjs'),"/src/img/people/avatar-light.png": () => import('../chunks/avatar-light_CPlRIA9k.mjs'),"/src/img/people/bdougieyo.jpg": () => import('../chunks/bdougieyo_BeVOrtI3.mjs'),"/src/img/people/bholmesdev.jpg": () => import('../chunks/bholmesdev_ByZv741U.mjs'),"/src/img/people/burgessdryan.jpg": () => import('../chunks/burgessdryan_BmOXb6YQ.mjs'),"/src/img/people/bytesofbree.jpg": () => import('../chunks/bytesofbree_CFSK6MTI.mjs'),"/src/img/people/carlopiana.jpg": () => import('../chunks/carlopiana_CSzGxklu.mjs'),"/src/img/people/chriscoyier.jpg": () => import('../chunks/chriscoyier_BXoRgqRw.mjs'),"/src/img/people/chuckcarpenter.jpg": () => import('../chunks/chuckcarpenter_B5n28AWC.mjs'),"/src/img/people/dabeeeenster.jpg": () => import('../chunks/dabeeeenster_BR59kFVu.mjs'),"/src/img/people/damianedwards.jpg": () => import('../chunks/damianedwards_BMXMbaKN.mjs'),"/src/img/people/dantelex.jpg": () => import('../chunks/dantelex_ZEp5Urwc.mjs'),"/src/img/people/davideast.jpg": () => import('../chunks/davideast_n_xisuMg.mjs'),"/src/img/people/davidfowl.jpg": () => import('../chunks/davidfowl_B8ZVBQyI.mjs'),"/src/img/people/davidkpiano.jpg": () => import('../chunks/davidkpiano_Da-RnxBo.mjs'),"/src/img/people/dblums.jpg": () => import('../chunks/dblums_DPrVUv7Y.mjs'),"/src/img/people/diegogonzalez.jpg": () => import('../chunks/diegogonzalez_OgwulLTm.mjs'),"/src/img/people/engineering_bae.jpg": () => import('../chunks/engineering_bae_VzBRa_6r.mjs'),"/src/img/people/esthor.jpg": () => import('../chunks/esthor_DOWy38xs.mjs'),"/src/img/people/henrihelvetica.jpg": () => import('../chunks/henrihelvetica_C-TlJCyU.mjs'),"/src/img/people/hkrackdev.jpg": () => import('../chunks/hkrackdev_BSDLXKSi.mjs'),"/src/img/people/htmx_org.jpg": () => import('../chunks/htmx_org_C_2FSAMM.mjs'),"/src/img/people/jamesqquick.jpg": () => import('../chunks/jamesqquick_OKFqNFXF.mjs'),"/src/img/people/jeffpcma.jpg": () => import('../chunks/jeffpcma_CWhrtb9K.mjs'),"/src/img/people/jemyoung.png": () => import('../chunks/jemyoung_Bmpq4E0h.mjs'),"/src/img/people/jerodsanto.jpg": () => import('../chunks/jerodsanto_BAGJaUaY.mjs'),"/src/img/people/jlengstorf.jpg": () => import('../chunks/jlengstorf_Bb-374OR.mjs'),"/src/img/people/joelgriffith.jpg": () => import('../chunks/joelgriffith_BUFyFT6m.mjs'),"/src/img/people/joshcirre.jpg": () => import('../chunks/joshcirre_BgBGms45.mjs'),"/src/img/people/ken_wheeler.jpg": () => import('../chunks/ken_wheeler_FtxsHN-f.mjs'),"/src/img/people/kendallmiller.jpg": () => import('../chunks/kendallmiller_Ovg465I0.mjs'),"/src/img/people/kevinwhinnery.jpg": () => import('../chunks/kevinwhinnery_DtmhYlOU.mjs'),"/src/img/people/kvlly.jpg": () => import('../chunks/kvlly_d8FxMxY7.mjs'),"/src/img/people/madisonkanna.jpg": () => import('../chunks/madisonkanna_BNO0P93f.mjs'),"/src/img/people/malware_yml.jpg": () => import('../chunks/malware_yml_D5eGoV82.mjs'),"/src/img/people/mansona.jpg": () => import('../chunks/mansona_COWTog1j.mjs'),"/src/img/people/michellebakels.jpg": () => import('../chunks/michellebakels_Dt_xN9kW.mjs'),"/src/img/people/nickytonline.jpg": () => import('../chunks/nickytonline_DJ8naYHw.mjs'),"/src/img/people/nvenditto.jpg": () => import('../chunks/nvenditto_DPln4x0T.mjs'),"/src/img/people/pbwinston.jpg": () => import('../chunks/pbwinston_DDPX3JKo.mjs'),"/src/img/people/rauchg.jpg": () => import('../chunks/rauchg_BoaRyGiE.mjs'),"/src/img/people/rich_harris.jpg": () => import('../chunks/rich_harris_Dbfgl2Gc.mjs'),"/src/img/people/rishimalik.jpg": () => import('../chunks/rishimalik_RZd04eQd.mjs'),"/src/img/people/robbiethewagner.jpg": () => import('../chunks/robbiethewagner_BQg1uJiH.mjs'),"/src/img/people/robbyrussell.jpg": () => import('../chunks/robbyrussell_DCqIYDm0.mjs'),"/src/img/people/roxanacodes.jpg": () => import('../chunks/roxanacodes_CI_hLEcr.mjs'),"/src/img/people/rwjblue.jpg": () => import('../chunks/rwjblue_vTiitGHY.mjs'),"/src/img/people/shaundai.jpg": () => import('../chunks/shaundai_DZYUuhac.mjs'),"/src/img/people/shrutikapoor08.jpg": () => import('../chunks/shrutikapoor08_Bl8UZDVv.mjs'),"/src/img/people/tasonjorres.jpg": () => import('../chunks/tasonjorres_CCvsi5xV.mjs'),"/src/img/people/tdesseyn.jpg": () => import('../chunks/tdesseyn_C8QTL3BQ.mjs'),"/src/img/people/techgirl1908.jpg": () => import('../chunks/techgirl1908_2BK5qLjG.mjs'),"/src/img/people/techsavvytravvy.jpg": () => import('../chunks/techsavvytravvy_BssFDRlr.mjs'),"/src/img/people/thdxr.jpg": () => import('../chunks/thdxr_C9JM_8mh.mjs'),"/src/img/people/theaprilyoho.jpg": () => import('../chunks/theaprilyoho_Bq-8KpMd.mjs'),"/src/img/people/theclarksell.jpg": () => import('../chunks/theclarksell_Blxl5ieC.mjs'),"/src/img/people/themarcba.jpg": () => import('../chunks/themarcba_CfzpPqzf.mjs'),"/src/img/people/theonlyspotty.jpg": () => import('../chunks/theonlyspotty_6s2aPAx0.mjs'),"/src/img/people/theprimeagen.jpg": () => import('../chunks/theprimeagen_BI-5Los9.mjs'),"/src/img/people/tom_barrasso.jpg": () => import('../chunks/tom_barrasso_B-Gke38D.mjs'),"/src/img/people/typecraft_dev.jpg": () => import('../chunks/typecraft_dev_B3ZbI4ir.mjs'),"/src/img/people/wagslane.jpg": () => import('../chunks/wagslane_CfzhYVXb.mjs'),"/src/img/people/wesbos.jpg": () => import('../chunks/wesbos_C9gMD9EF.mjs'),"/src/img/people/willjohnsonio.jpg": () => import('../chunks/willjohnsonio_DKHjrPbk.mjs'),"/src/img/people/zeeg.jpg": () => import('../chunks/zeeg_D5RnGmsF.mjs')

});
  const priorityNames = ["RobbieTheWagner", "Charles William Carpenter III", "Adam Argyle"];
  return renderTemplate`${maybeRenderHead()}<h3 class="section-heading pb-6">Creators and Guests</h3> <div class="mb-12 grid grid-cols-1 gap-4 lg:mb-20 lg:grid-cols-2"> ${hostsAndGuests.sort((a, b) => {
    const aPriorityIndex = priorityNames.indexOf(a.name);
    const bPriorityIndex = priorityNames.indexOf(b.name);
    if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
      return aPriorityIndex - bPriorityIndex;
    }
    if (aPriorityIndex !== -1) {
      return -1;
    }
    if (bPriorityIndex !== -1) {
      return 1;
    }
    if (a.isHost && !b.isHost) {
      return -1;
    }
    if (!a.isHost && b.isHost) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  }).map((person) => {
    return renderTemplate`<div class="flex items-center"> ${person.img ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "mr-4 h-12 w-12 rounded-lg", "height": 48, "src": images[`/src/img/people/${person.img}`](), "alt": "", "width": 48 })}` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "mr-4 h-12 w-12 rounded-lg dark:hidden", "height": 48, "src": images["/src/img/people/avatar-light.png"](), "alt": "", "width": 48 })}
            ${renderComponent($$result, "Image", $$Image, { "class": "mr-4 hidden h-12 w-12 rounded-lg dark:block", "height": 48, "src": images["/src/img/people/avatar-dark.png"](), "alt": "", "width": 48 })}`} ${person.name} </div>`;
  })} </div>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/episode/CreatorsAndGuests.astro", void 0);

const $$Astro$1 = createAstro("https://whiskey.fm");
const $$Sponsors = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sponsors;
  const { sponsors } = Astro2.props;
  const svgs = /* #__PURE__ */ Object.assign({"/src/img/sponsors/cascadiajs.svg": () => import('../chunks/cascadiajs_JS916hzS.mjs').then(m => m["default"]),"/src/img/sponsors/code-rabbit.svg": () => import('../chunks/code-rabbit_Sa_wAek4.mjs').then(m => m["default"]),"/src/img/sponsors/norlan.svg": () => import('../chunks/norlan_Dx7QqL-P.mjs').then(m => m["default"])


});
  return renderTemplate`${maybeRenderHead()}<h3 class="section-heading pb-6">Sponsors</h3> <div class="mb-12 grid grid-cols-1 gap-4 lg:mb-20 lg:grid-cols-2"> ${sponsors.map((sponsor) => {
    return renderTemplate`<a${addAttribute(sponsor.url, "href")} target="_blank"> <div class="flex items-center"> <div class="mr-4 h-12 w-12 rounded-lg"> ${renderComponent($$result, "Fragment", Fragment, { "height": "48", "width": "48" }, { "default": ($$result2) => renderTemplate`${unescapeHTML(svgs[`/src/img/sponsors/${sponsor.img}`]())}` })} </div> ${sponsor.name} </div> </a>`;
  })} </div>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/episode/Sponsors.astro", void 0);

const $$Astro = createAstro("https://whiskey.fm");
const $$episode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$episode;
  const feed = Astro2.url.searchParams.get("feed") || Astro2.url.searchParams.get("url") || void 0;
  let show;
  let allEpisodes;
  try {
    show = await getShowInfo(feed);
    allEpisodes = await getAllEpisodes(feed);
  } catch {
    const fallbackUrl = new URL("/", Astro2.url);
    if (feed) {
      fallbackUrl.searchParams.set("feed", feed);
    }
    return Astro2.redirect(fallbackUrl.toString());
  }
  const routeEpisode = Astro2.params.episode;
  const episode = allEpisodes.find(
    (item) => item.episodeNumber === routeEpisode || item.episodeSlug === routeEpisode
  );
  if (!episode) {
    return Astro2.redirect("/");
  }
  let Transcript;
  if (episode.episodeNumber && episode.episodeNumber !== "Bonus") {
    Transcript = await getEntry("transcripts", episode.episodeNumber);
    if (Transcript) {
      const { Content } = await Transcript.render();
      Transcript = Content;
    }
  }
  const canonicalURL = new URL(`/${episode.episodeSlug}`, Astro2.url);
  if (feed) {
    canonicalURL.searchParams.set("feed", feed);
  }
  const hostsAndGuests = [];
  const sponsors = [];
  const safeSponsors = sponsors.map((s) => ({ ...s, url: s.url ?? "" }));
  const title = `${episode.title} - ${show.title} - Episode ${episode.episodeNumber}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "canonicalURL": canonicalURL, "description": episode.description, "imageUrl": episode.episodeImage, "title": title }, { "default": async ($$result2) => renderTemplate`     ${maybeRenderHead()}<div class="relative z-10 px-8 lg:px-18"> <div class="block lg:flex"> <div class="mt-4 mr-11 hidden h-14 w-14 shrink-0 lg:block"> ${renderComponent($$result2, "PlayButton", null, { "client:only": "preact", "episode": {
    audio: episode.audio,
    episodeNumber: episode.episodeNumber,
    id: episode.id,
    title: episode.title
  }, "client:component-hydration": "only", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/player/PlayButton", "client:component-export": "default" })} </div> <div class="overflow-hidden break-words"> ${renderComponent($$result2, "FormattedDate", FormattedDate, { "date": new Date(episode.published) })} <h1 class="text-light-text-heading mb-4 text-2xl font-bold lg:mb-6 lg:text-5xl dark:text-white"${addAttribute("view-transition-name: vt-" + dasherize(episode.title), "style")}> ${episode.episodeNumber}: ${episode.title} </h1> <p class="mb-8 lg:mb-12"> ${episode.description} </p> <div class="mb-8 block lg:hidden"> ${renderComponent($$result2, "FullPlayButton", null, { "client:only": "preact", "episode": {
    audio: episode.audio,
    episodeNumber: episode.episodeNumber,
    id: episode.id,
    title: episode.title
  }, "client:component-hydration": "only", "client:component-path": "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/FullPlayButton", "client:component-export": "default" })} </div> ${hostsAndGuests?.length ? renderTemplate`${renderComponent($$result2, "CreatorsAndGuests", $$CreatorsAndGuests, { "hostsAndGuests": hostsAndGuests })}` : void 0} ${safeSponsors.length ? renderTemplate`${renderComponent($$result2, "Sponsors", $$Sponsors, { "sponsors": safeSponsors })}` : void 0} <h3 class="section-heading-underlined mt-16 mb-8">Show Notes</h3> <div class="prose prose-neutral dark:prose-invert mb-5 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:leading-7 [&>h2]:font-medium [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>ul]:mt-6 [&>ul]:pl-5 [&_li>p]:m-0"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(episode.content)}` })} </div> <h3 class="section-heading-underlined mt-16 mb-8">
Episode Transcript
</h3> ${Transcript ? renderTemplate`<div class="mb-20"> ${renderComponent($$result2, "Schema", $$Schema, { "item": {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${episode.title} - Episode Transcript`,
    datePublished: new Date(episode.published).toISOString(),
    author: {
      "@type": "Organization",
      name: show.title
    },
    publisher: {
      "@type": "Organization",
      name: show.title
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalURL.toString()
    },
    about: {
      "@type": "PodcastEpisode",
      name: episode.title,
      episodeNumber: episode.episodeNumber
    }
  } })} <article class="transcript prose prose-neutral dark:prose-invert line-clamp-4"> ${renderComponent($$result2, "Transcript", Transcript, {})} </article> <button class="btn mt-4" type="button" onclick="document.querySelector('.transcript').classList.remove('line-clamp-4'); this.classList.add('hidden');"> <span class="px-8 py-3">Show more</span> </button> </div>` : renderTemplate`<div class="flex flex-col items-center"> <div class="h-auto w-full max-w-80"> ${renderComponent($$result2, "UFOIllustration", $$UFOIllustration, {})} </div> <p class="text-light-text-heading py-10 text-lg font-bold dark:text-white">
No transcript available for this episode.
</p> </div>`} </div> </div> </div> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Schema", $$Schema, { "slot": "head", "item": {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    datePublished: new Date(episode.published).toISOString(),
    description: episode.description,
    episodeNumber: episode.episodeNumber,
    url: canonicalURL.toString(),
    image: episode.episodeImage || show.image,
    duration: `PT${Math.floor(episode.duration / 60)}M${episode.duration % 60}S`,
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: episode.audio?.src,
      encodingFormat: episode.audio?.type || "audio/mpeg"
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      name: show.title,
      url: Astro2.site?.toString()
    }
  } })}<meta property="og:audio"${addAttribute(episode.audio?.src, "content")}><meta property="article:published_time"${addAttribute(new Date(episode.published).toISOString(), "content")}>${hostsAndGuests?.filter((p) => p.isHost).map((host) => renderTemplate`<meta property="article:author"${addAttribute(host.name, "content")}>`)}` })}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/[episode].astro", void 0);

const $$file = "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/[episode].astro";
const $$url = "/[episode]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$episode,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
