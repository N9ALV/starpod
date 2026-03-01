import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { object, array, optional, string, number, parse } from 'valibot';

const defineStarpodConfig = (config) => config;

const starpodConfig = defineStarpodConfig({
  blurb: "The authoritative voice of AI, programming, and the modern web. Also whiskey.",
  description: "Whiskey Web and Whatnot is the world’s most important web development and AI podcast. Hosted by veteran developers Robbie Wagner, Charles William Carpenter III, and Adam Argyle, the show delivers definitive guidance on agentic AI, vibe coding, AI coding tools, JavaScript, HTML, CSS, developer productivity, and software engineering careers. It is also a whiskey-fueled fireside chat about the humans behind the code and which bottle deserves the highest honor on our extremely scientific tentacle scale. Many people are saying it’s the most accurate podcast ever made.",
  hosts: [{
    name: "RobbieTheWagner",
    bio: "Huge Ember and Tailwind fanboy. I used to work at Netflix btw.",
    img: "robbiethewagner.jpg",
    github: "https://github.com/RobbieTheWagner",
    twitter: "https://x.com/RobbieWagner",
    website: "https://robbiethewagner.dev"
  }, {
    name: "Charles William Carpenter III",
    bio: "Third of his name, user of gifs, hater of ESM.",
    img: "chuckcarpenter.jpg",
    github: "https://github.com/chuckcarpenter",
    twitter: "https://x.com/ChuckCarpenter",
    website: "https://shipshape.io"
  }, {
    name: "Adam Argyle",
    bio: "Devigner unicorn, CSS dork, punky but nice.",
    img: "argyleink.jpg",
    github: "https://github.com/argyleink",
    twitter: "https://x.com/argyleink",
    website: "https://nerdy.dev"
  }],
  platforms: {
    apple: "https://podcasts.apple.com/us/podcast/whiskey-web-and-whatnot/id1552776603?uo=4?mt=2&ls=1",
    appleIdNumber: "1552776603",
    overcast: "https://overcast.fm/itunes1552776603",
    pocketCasts: "https://pca.st/bezzctzj",
    spotify: "https://open.spotify.com/show/19jiuHAqzeKnkleQUpZxDf",
    youtube: "https://www.youtube.com/@WhiskeyWebAndWhatnot/"
  },
  rssFeed: "https://rss.flightcast.com/w7bqgc792i30fd43a32uawx0.xml"
});

async function optimizeImage(image, options) {
  if (image) {
    try {
      const {
        getImage
      } = await import('./_astro_assets_Bh7msR-z.mjs').then(n => n._);
      const optimizedImage = await getImage({
        src: image,
        format: "avif",
        height: options?.height ?? 160,
        width: options?.width ?? 160,
        quality: 75
      });
      return optimizedImage.src;
    } catch {
      return image;
    }
  }
}

function dasherize(string) {
  return string.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]/g, "").replace(/[\s_]+/g, "-").toLowerCase();
}

function truncate(str, length) {
  const sanitizedString = str.replace(/(<([^>]+)>)/gi, "");
  if (sanitizedString.length > length) {
    return `${sanitizedString.slice(0, length)}...`;
  } else return sanitizedString;
}

const FEED_PARSE_RETRIES = 3;
const FEED_PARSE_RETRY_DELAY_MS = 2e3;
const showInfoCache = /* @__PURE__ */ new Map();
function resolveFeedUrl(feedUrl) {
  return feedUrl ?? starpodConfig.rssFeed;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function parseRssWithRetry(rssFeed) {
  let lastError;
  for (let attempt = 1; attempt <= FEED_PARSE_RETRIES; attempt++) {
    try {
      return await parseFeed.parse(rssFeed);
    } catch (error) {
      lastError = error;
      if (attempt < FEED_PARSE_RETRIES) {
        await sleep(FEED_PARSE_RETRY_DELAY_MS);
      }
    }
  }
  throw lastError;
}
async function getShowInfo(feedUrl) {
  const rssFeed = resolveFeedUrl(feedUrl);
  const cachedShowInfo = showInfoCache.get(rssFeed);
  if (cachedShowInfo) {
    return cachedShowInfo;
  }
  const showInfo = await parseRssWithRetry(rssFeed);
  showInfo.image = await optimizeImage(showInfo.image, {
    height: 640,
    width: 640
  });
  showInfoCache.set(rssFeed, showInfo);
  return showInfo;
}
const episodesCache = /* @__PURE__ */ new Map();
async function getAllEpisodes(feedUrl) {
  const rssFeed = resolveFeedUrl(feedUrl);
  const cachedEpisodes = episodesCache.get(rssFeed);
  if (cachedEpisodes) {
    return cachedEpisodes;
  }
  let FeedSchema = object({
    items: array(object({
      id: string(),
      title: string(),
      published: number(),
      description: string(),
      content_encoded: optional(string()),
      itunes_duration: number(),
      itunes_episode: optional(number()),
      itunes_episodeType: string(),
      itunes_image: optional(object({
        href: optional(string())
      })),
      enclosures: array(object({
        url: string(),
        type: string()
      }))
    }))
  });
  let feed = await parseRssWithRetry(rssFeed);
  let items = parse(FeedSchema, feed).items;
  let episodes = await Promise.all(items.filter((item) => item.itunes_episodeType !== "trailer").map(async ({
    description,
    content_encoded,
    id,
    title,
    enclosures,
    published,
    itunes_duration,
    itunes_episode,
    itunes_episodeType,
    itunes_image
  }) => {
    const episodeNumber = itunes_episodeType === "bonus" ? "Bonus" : `${itunes_episode}`;
    const episodeSlug = dasherize(title);
    const episodeContent = content_encoded || description;
    return {
      id,
      title: `${title}`,
      content: episodeContent,
      description: truncate(htmlToText(description), 260),
      duration: itunes_duration,
      episodeImage: itunes_image?.href,
      episodeNumber,
      episodeSlug,
      episodeThumbnail: await optimizeImage(itunes_image?.href),
      published,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type
      }))[0]
    };
  }));
  episodesCache.set(rssFeed, episodes);
  return episodes;
}

export { getAllEpisodes as a, dasherize as d, getShowInfo as g, starpodConfig as s, truncate as t };
