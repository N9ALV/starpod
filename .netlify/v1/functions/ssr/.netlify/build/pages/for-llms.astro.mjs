import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from '../chunks/astro/server_bMrKh8MO.mjs';
import { $ as $$Layout } from '../chunks/Layout_b1U6WeUI.mjs';
import { g as getShowInfo, a as getAllEpisodes, s as starpodConfig } from '../chunks/rss_D0GbRL7n.mjs';
import { f as formatDuration, b as formatDate } from '../chunks/llms_BmSyglTy.mjs';
export { renderers } from '../renderers.mjs';

const $$ForLlms = createComponent(async ($$result, $$props, $$slots) => {
  const show = await getShowInfo();
  const episodes = await getAllEpisodes();
  const recentEpisodes = episodes.slice(0, 10);
  let avgDuration = 0;
  let episodesPerWeek = 0;
  if (episodes.length > 0) {
    const totalDuration = episodes.reduce((sum, ep) => sum + ep.duration, 0);
    avgDuration = totalDuration / episodes.length;
    if (episodes.length > 1) {
      const newest = episodes[0].published;
      const oldest = episodes[episodes.length - 1].published;
      const daysBetween = (newest - oldest) / (1e3 * 60 * 60 * 24);
      episodesPerWeek = episodes.length / daysBetween * 7;
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "For LLMs - AI Assistant Guide", "description": `Comprehensive guide for AI assistants about ${show.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative z-10 px-8 lg:px-18"> <h1 class="text-light-text-heading mb-4 text-2xl font-bold lg:mb-6 lg:text-5xl dark:text-white"> ${show.title} - Guide for AI Assistants
</h1> <section class="mb-8"> <h2 class="section-heading-underlined">Podcast Overview</h2> <p class="mb-2"> <strong>Tagline:</strong> ${starpodConfig.blurb} </p> <p>${starpodConfig.description}</p> </section> <section class="mb-8"> <h2 class="section-heading-underlined">Hosts</h2> ${starpodConfig.hosts.map((host) => renderTemplate`<div class="mb-4"> <h3 class="text-light-text-heading text-xl font-bold dark:text-white"> ${host.name} </h3> <p class="mt-2">${host.bio}</p> ${(host.website || host.github || host.twitter) && renderTemplate`<div class="mt-2"> <strong>Links: </strong> ${host.website && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <a${addAttribute(host.website, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
Website
</a> ${" | "}` })}`} ${host.github && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <a${addAttribute(host.github, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
GitHub
</a> ${" | "}` })}`} ${host.twitter && renderTemplate`<a${addAttribute(host.twitter, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
Twitter
</a>`} </div>`} </div>`)} </section> <section class="mb-8"> <h2 class="section-heading-underlined">Episode Information</h2> <ul class="list-disc pl-6"> <li> <strong>Total Episodes:</strong> ${episodes.length} </li> ${avgDuration > 0 && renderTemplate`<li> <strong>Average Episode Duration:</strong>${" "} ${formatDuration(avgDuration)} </li>`} ${episodesPerWeek > 0 && renderTemplate`<li> <strong>Publishing Frequency:</strong> Approximately${" "} ${episodesPerWeek.toFixed(1)} episodes per week
</li>`} </ul> </section> <section class="mb-8"> <h2 class="section-heading-underlined">Recent Episodes</h2> <ul class="list-disc pl-6"> ${recentEpisodes.map((episode) => renderTemplate`<li> <strong>Episode ${episode.episodeNumber}:</strong>${" "} <a${addAttribute(`/${episode.episodeSlug}.html.md`, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white"> ${episode.title} </a>${" "}
- ${formatDate(episode.published)} </li>`)} </ul> </section> <section class="mb-8"> <h2 class="section-heading-underlined">Transcript Availability</h2> <p>
Transcripts are available for many episodes and are included in the
        individual episode markdown files. Access any episode at
<code>/${"{episode-slug}"}.html.md</code> to view the full transcript if
        available.
</p> </section> <section class="mb-8"> <h2 class="section-heading-underlined">How to Listen</h2> <ul class="list-disc pl-6"> ${starpodConfig.platforms.apple && renderTemplate`<li> <a${addAttribute(starpodConfig.platforms.apple, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
Apple Podcasts
</a> </li>`} ${starpodConfig.platforms.spotify && renderTemplate`<li> <a${addAttribute(starpodConfig.platforms.spotify, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
Spotify
</a> </li>`} ${starpodConfig.platforms.youtube && renderTemplate`<li> <a${addAttribute(starpodConfig.platforms.youtube, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
YouTube
</a> </li>`} ${starpodConfig.platforms.overcast && renderTemplate`<li> <a${addAttribute(starpodConfig.platforms.overcast, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
Overcast
</a> </li>`} ${starpodConfig.platforms.pocketCasts && renderTemplate`<li> <a${addAttribute(starpodConfig.platforms.pocketCasts, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">
Pocket Casts
</a> </li>`} </ul> </section> <section class="mb-8"> <h2 class="section-heading-underlined">RSS Feed</h2> <p>
Direct RSS feed access: <a${addAttribute(starpodConfig.rssFeed, "href")} class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">${starpodConfig.rssFeed}</a> </p> </section> <section class="mb-8"> <h2 class="section-heading-underlined">Complete Episode List</h2> <p>
For a complete list of all episodes with descriptions, see <a href="/episodes-index.html.md" class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">Episodes Index</a>.
</p> <p class="mt-2">
Markdown version of this page: <a href="/for-llms.html.md" class="animated-bottom-border text-light-text-heading font-bold after:mt-1 dark:text-white">for-llms.html.md</a> </p> </section> </div> ` })}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/for-llms.astro", void 0);

const $$file = "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/for-llms.astro";
const $$url = "/for-llms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForLlms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
