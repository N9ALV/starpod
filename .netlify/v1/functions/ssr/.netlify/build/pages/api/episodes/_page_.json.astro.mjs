import { a as getAllEpisodes } from '../../../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../../../renderers.mjs';

const episodesPerPage = 15;
const allEpisodes = await getAllEpisodes();
async function getStaticPaths({
  paginate
}) {
  return paginate(allEpisodes, {
    pageSize: episodesPerPage
  });
}
const GET = async ({
  props
}) => {
  const canLoadMore = props.page.currentPage < props.page.lastPage;
  return new Response(JSON.stringify({
    canLoadMore,
    episodes: props.page
  }));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
