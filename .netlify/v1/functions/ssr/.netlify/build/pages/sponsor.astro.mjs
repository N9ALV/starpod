import { e as createAstro, c as createComponent, m as maybeRenderHead, b as renderTemplate, r as renderComponent, d as addAttribute } from '../chunks/astro/server_bMrKh8MO.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_Bh7msR-z.mjs';
import { $ as $$Layout } from '../chunks/Layout_b1U6WeUI.mjs';
import { g as getShowInfo } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://whiskey.fm");
const $$AdPackageCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdPackageCard;
  const { bullets, heading, price } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="dark:bg-dark-background relative z-10 mb-6 rounded-lg bg-white p-1"> <h2 class="bg-light-card text-light-text-heading dark:bg-dark-card px-5 py-4 font-bold lg:py-6 dark:text-white"> ${heading} </h2> <ul class="list-disc px-8"> ${bullets.map((bullet) => {
    return renderTemplate`<li class="dark:border-dark-border border-b py-6">${bullet}</li>`;
  })} <h3 class="text-light-text-heading mt-8 mb-12 px-5 text-4xl font-bold tabular-nums dark:text-white"> ${price} <span class="text-light-text-body dark:text-dark-text-body text-3xl font-light">
/
</span> <span class="text-light-text-body dark:text-dark-text-body text-2xl">
per episode
</span> </h3> <div class="flex w-full"> <a class="btn mb-8 w-full justify-center" href="/contact"> <span class="text-light-text-heading rounded-full px-8 py-3 text-center text-sm dark:text-white">
Become a sponsor
</span> </a> </div> </ul> </div>`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/components/AdPackageCard.astro", void 0);

const $$Sponsor = createComponent(async ($$result, $$props, $$slots) => {
  const show = await getShowInfo();
  const title = `${show.title}`;
  const countryFlags = /* #__PURE__ */ Object.assign({"/src/img/countries/Australia.png": () => import('../chunks/Australia_C1CRzhXf.mjs'),"/src/img/countries/Canada.png": () => import('../chunks/Canada_CV2s8haH.mjs'),"/src/img/countries/Germany.png": () => import('../chunks/Germany_CjVry2SQ.mjs'),"/src/img/countries/UK.png": () => import('../chunks/UK_CkK2NhcD.mjs'),"/src/img/countries/USA.png": () => import('../chunks/USA_DtH4-KOQ.mjs')

});
  const countries = [
    { name: "United States", flag: "USA.png", percentage: 52 },
    { name: "United Kingdom", flag: "UK.png", percentage: 7 },
    { name: "Canada", flag: "Canada.png", percentage: 5 },
    { name: "Germany", flag: "Germany.png", percentage: 4 },
    { name: "Australia", flag: "Australia.png", percentage: 4 }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sponsor" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative z-10 px-8 lg:px-18"> <h1 class="mb-4 text-2xl font-bold text-light-text-heading lg:mb-6 lg:text-5xl dark:text-white">
Sponsor ${title} </h1> <p class="mb-5">
Want to dazzle a crowd of tech nerds and whiskey connoisseurs? Throw your
      brand into the mix! Our listeners love innovation, good banter, and a
      stiff drink—so get in on the fun and make some magic happen. Stay classy,
      sponsor.
</p> <div class="grid grid-cols-1 gap-6 lg:grid-cols-2"> ${renderComponent($$result2, "AdPackageCard", $$AdPackageCard, { "bullets": ["Host read ad", "10% off for 3+", "20% off for 6+"], "heading": "30 second ad", "price": "$500" })} ${renderComponent($$result2, "AdPackageCard", $$AdPackageCard, { "bullets": ["Host read ad", "10% off for 3+", "20% off for 6+"], "heading": "60 second ad", "price": "$1,000" })} </div> <h2 class="mb-4 mt-16 text-2xl font-bold text-light-text-heading lg:mb-6 lg:mt-20 lg:text-5xl dark:text-white">
Your overall ad reach
</h2> <h3 class="section-heading mb-8 mt-8 lg:mt-12">Listener Metrics</h3> <div class="grid grid-cols-1 lg:grid-cols-2"> <figure> <span class="text-6xl font-bold tabular-nums text-light-text-heading dark:text-white">
1,000
</span> <figcaption class="mt-2 font-bold">listeners per episode</figcaption> </figure> <figure> <span class="text-6xl font-bold tabular-nums text-light-text-heading dark:text-white">
15,000
</span> <figcaption class="mt-2 font-bold">listeners per 90 days</figcaption> </figure> </div> <h3 class="section-heading mb-8 mt-8 lg:mt-12">
Top Listeners By Location
</h3> <div class="grid grid-cols-[minmax(0,max-content)_1fr_minmax(0,max-content)] gap-x-4 gap-y-12 border-b py-6 text-light-text-heading dark:border-dark-border dark:text-white"> ${countries.map((country) => {
    return renderTemplate`<div class="flex items-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "mr-4 h-6 w-6 rounded-xs", "height": 24, "src": countryFlags[`/src/img/countries/${country.flag}`](), "alt": "", "width": 24 })} ${country.name} </div>

            <div class="relative flex items-center"> <div class="absolute z-0 h-1 w-full rounded-lg bg-gray-200 outline-hidden dark:bg-gray-700"></div> <div class="absolute z-10 h-1 rounded-lg bg-linear-to-r from-[#D8CCFF] to-[#8A63FF] dark:from-[#42C8F3] dark:to-[#B6EDFF]"${addAttribute(`width:${country.percentage}%`, "style")}></div> </div>

            <div class="flex items-center justify-end"> ${country.percentage}%
</div>`;
  })} </div> </div> ` })}`;
}, "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/sponsor.astro", void 0);

const $$file = "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/pages/sponsor.astro";
const $$url = "/sponsor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sponsor,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
