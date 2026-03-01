import { htmlToText } from 'html-to-text';
import { t as truncate } from './rss_D0GbRL7n.mjs';

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function cleanTranscript(markdown) {
  let cleaned = markdown.replace(/\[\d{1,2}:\d{2}(?::\d{2})?\]/g, "");
  cleaned = cleaned.split("\n").map((line) => line.trim()).join("\n").replace(/\n{3,}/g, "\n\n");
  return cleaned.trim();
}
function truncateDescription(text, length) {
  return truncate(text, length);
}
function htmlToMarkdown(html) {
  return htmlToText(html, {
    wordwrap: false,
    preserveNewlines: true,
    selectors: [{
      selector: "a",
      options: {
        ignoreHref: false
      }
    }, {
      selector: "img",
      format: "skip"
    }]
  });
}
function generateLlmsTxt(show, recentEpisodes, config, siteUrl) {
  const baseUrl = siteUrl?.origin || "";
  const hostNames = config.hosts.map((h) => h.name).join(", ");
  let content = `# ${show.title}

`;
  content += `> ${config.blurb}

`;
  content += `${config.description}

`;
  content += `Hosted by: ${hostNames}

`;
  content += `## Main Documentation

`;
  content += `- [About the Show](${baseUrl}/about.html.md): Information about the podcast and hosts
`;
  content += `- [For LLMs](${baseUrl}/for-llms.html.md): Comprehensive guide for AI assistants
`;
  content += `- [Episodes Index](${baseUrl}/episodes-index.html.md): Complete list of all episodes

`;
  if (recentEpisodes.length > 0) {
    content += `## Recent Episodes

`;
    for (const episode of recentEpisodes) {
      const episodeUrl = `${baseUrl}/${episode.episodeSlug}.html.md`;
      const description = truncateDescription(episode.description, 150);
      content += `- [${episode.title}](${episodeUrl}): ${description}
`;
    }
    content += `
`;
  }
  content += `## Optional

`;
  content += `- [RSS Feed](${config.rssFeed}): Direct access to podcast RSS
`;
  if (config.platforms.apple) {
    content += `- [Listen on Apple Podcasts](${config.platforms.apple})
`;
  }
  if (config.platforms.spotify) {
    content += `- [Listen on Spotify](${config.platforms.spotify})
`;
  }
  if (config.platforms.youtube) {
    content += `- [Watch on YouTube](${config.platforms.youtube})
`;
  }
  if (config.platforms.overcast) {
    content += `- [Listen on Overcast](${config.platforms.overcast})
`;
  }
  if (config.platforms.pocketCasts) {
    content += `- [Listen on Pocket Casts](${config.platforms.pocketCasts})
`;
  }
  return content;
}
function generateEpisodeMarkdown(episode, show, config, transcriptContent) {
  const hostNames = config.hosts.map((h) => h.name).join(", ");
  const episodeContent = htmlToMarkdown(episode.content);
  let markdown = `# Episode ${episode.episodeNumber}: ${episode.title}

`;
  markdown += `**Show**: ${show.title}
`;
  markdown += `**Published**: ${formatDate(episode.published)}
`;
  markdown += `**Duration**: ${formatDuration(episode.duration)}
`;
  markdown += `**Episode Number**: ${episode.episodeNumber}

`;
  markdown += `## Hosts

${hostNames}

`;
  markdown += `## Description

${episodeContent}

`;
  markdown += `## Audio

[Download or listen to episode](${episode.audio.src})

`;
  if (transcriptContent) {
    markdown += `## Transcript

${transcriptContent}
`;
  } else {
    markdown += `## Transcript

Transcript not available for this episode.
`;
  }
  return markdown;
}
function generateEpisodesIndex(show, episodes, siteUrl) {
  const baseUrl = siteUrl?.origin || "";
  let markdown = `# ${show.title} - Episodes

`;
  markdown += `Complete listing of all ${episodes.length} episodes.

`;
  markdown += `---

`;
  for (const episode of episodes) {
    markdown += `## Episode ${episode.episodeNumber}: ${episode.title}

`;
    markdown += `**Published**: ${formatDate(episode.published)}
`;
    markdown += `**Duration**: ${formatDuration(episode.duration)}
`;
    markdown += `**Description**: ${truncateDescription(episode.description, 200)}

`;
    markdown += `[Full episode details](${baseUrl}/${episode.episodeSlug}.html.md) | [Audio](${episode.audio.src})

`;
    markdown += `---

`;
  }
  return markdown;
}
function generateForLlmsMarkdown(show, episodes, config, siteUrl) {
  const baseUrl = siteUrl?.origin || "";
  let markdown = `# ${show.title} - Guide for AI Assistants

`;
  markdown += `## Podcast Overview

`;
  markdown += `**Tagline**: ${config.blurb}

`;
  markdown += `${config.description}

`;
  markdown += `## Hosts

`;
  for (const host of config.hosts) {
    markdown += `### ${host.name}

`;
    markdown += `${host.bio}

`;
    if (host.website || host.github || host.twitter) {
      markdown += `**Links**: `;
      const links = [];
      if (host.website) links.push(`[Website](${host.website})`);
      if (host.github) links.push(`[GitHub](${host.github})`);
      if (host.twitter) links.push(`[Twitter](${host.twitter})`);
      markdown += links.join(" | ");
      markdown += `

`;
    }
  }
  markdown += `## Episode Information

`;
  markdown += `- **Total Episodes**: ${episodes.length}
`;
  if (episodes.length > 0) {
    const totalDuration = episodes.reduce((sum, ep) => sum + ep.duration, 0);
    const avgDuration = totalDuration / episodes.length;
    markdown += `- **Average Episode Duration**: ${formatDuration(avgDuration)}
`;
    if (episodes.length > 1) {
      const newest = episodes[0].published;
      const oldest = episodes[episodes.length - 1].published;
      const daysBetween = (newest - oldest) / (1e3 * 60 * 60 * 24);
      const episodesPerWeek = episodes.length / daysBetween * 7;
      markdown += `- **Publishing Frequency**: Approximately ${episodesPerWeek.toFixed(1)} episodes per week
`;
    }
  }
  markdown += `
## Recent Episodes

`;
  const recentEpisodes = episodes.slice(0, 10);
  for (const episode of recentEpisodes) {
    markdown += `- **Episode ${episode.episodeNumber}**: [${episode.title}](${baseUrl}/${episode.episodeSlug}.html.md) - ${formatDate(episode.published)}
`;
  }
  markdown += `
## Transcript Availability

`;
  markdown += `Transcripts are available for many episodes and are included in the individual episode markdown files. `;
  markdown += `Access any episode at \`/{episode-slug}.html.md\` to view the full transcript if available.

`;
  markdown += `## How to Listen

`;
  if (config.platforms.apple) {
    markdown += `- [Apple Podcasts](${config.platforms.apple})
`;
  }
  if (config.platforms.spotify) {
    markdown += `- [Spotify](${config.platforms.spotify})
`;
  }
  if (config.platforms.youtube) {
    markdown += `- [YouTube](${config.platforms.youtube})
`;
  }
  if (config.platforms.overcast) {
    markdown += `- [Overcast](${config.platforms.overcast})
`;
  }
  if (config.platforms.pocketCasts) {
    markdown += `- [Pocket Casts](${config.platforms.pocketCasts})
`;
  }
  markdown += `
## RSS Feed

`;
  markdown += `Direct RSS feed access: ${config.rssFeed}

`;
  markdown += `## Complete Episode List

`;
  markdown += `For a complete list of all episodes with descriptions, see [Episodes Index](${baseUrl}/episodes-index.html.md).
`;
  return markdown;
}
function generateAboutMarkdown(show, config) {
  let markdown = `# About ${show.title}

`;
  markdown += `${config.description}

`;
  markdown += `## Meet the Hosts

`;
  for (const host of config.hosts) {
    markdown += `### ${host.name}

`;
    markdown += `${host.bio}

`;
    if (host.website || host.github || host.twitter) {
      if (host.twitter) markdown += `- Twitter: ${host.twitter}
`;
      if (host.github) markdown += `- GitHub: ${host.github}
`;
      if (host.website) markdown += `- Website: ${host.website}
`;
      markdown += `
`;
    }
  }
  markdown += `## Listen to the Show

`;
  if (config.platforms.apple) {
    markdown += `- [Apple Podcasts](${config.platforms.apple})
`;
  }
  if (config.platforms.spotify) {
    markdown += `- [Spotify](${config.platforms.spotify})
`;
  }
  if (config.platforms.youtube) {
    markdown += `- [YouTube](${config.platforms.youtube})
`;
  }
  if (config.platforms.overcast) {
    markdown += `- [Overcast](${config.platforms.overcast})
`;
  }
  if (config.platforms.pocketCasts) {
    markdown += `- [Pocket Casts](${config.platforms.pocketCasts})
`;
  }
  return markdown;
}

export { generateEpisodesIndex as a, formatDate as b, generateForLlmsMarkdown as c, generateLlmsTxt as d, cleanTranscript as e, formatDuration as f, generateAboutMarkdown as g, generateEpisodeMarkdown as h };
