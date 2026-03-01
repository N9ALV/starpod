import { g as getEntry } from '../chunks/_astro_content_sANV-5OO.mjs';
import { e as cleanTranscript, h as generateEpisodeMarkdown } from '../chunks/llms_BmSyglTy.mjs';
import { a as getAllEpisodes, g as getShowInfo, s as starpodConfig } from '../chunks/rss_D0GbRL7n.mjs';
export { renderers } from '../renderers.mjs';

async function getStaticPaths() {
  const allEpisodes = await getAllEpisodes();
  return allEpisodes.flatMap((episode) => {
    return [{
      params: {
        episode: episode.episodeNumber
      },
      props: {
        episode
      }
    }, {
      params: {
        episode: episode.episodeSlug
      },
      props: {
        episode
      }
    }];
  });
}
const GET = async ({
  props
}) => {
  const {
    episode
  } = props;
  const show = await getShowInfo();
  let transcriptContent = "";
  if (episode.episodeNumber && episode.episodeNumber !== "Bonus") {
    const transcript = await getEntry("transcripts", episode.episodeNumber);
    if (transcript) {
      transcriptContent = cleanTranscript(transcript.body);
    }
  }
  const markdown = generateEpisodeMarkdown(episode, show, starpodConfig, transcriptContent);
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
