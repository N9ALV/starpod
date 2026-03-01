# Starpod

Starpod is the easiest way to create a podcast website in 5 minutes or less and
it is 100% free and open source.

### Configuration

You will need to configure your RSS feed and a few other pieces of info for your
podcast in starpod.config.mjs. We provide a util function `defineStarpodConfig`
that provides TypeScript types and enforces the correct formats for config
values.

An example config can be found [here](./starpod.config.ts).

#### Options

##### blurb

A very short tagline for your show. Generally, no more than one sentence. Less
is more here.

**Example:**

```ts
blurb: 'The authoritative voice of AI, programming, and the modern web. Also whiskey.',
```

##### description

A somewhat longer description of what your show is about. This should still
ideally be fairly short, and should usually be 2-4 sentences.

**Example:**

```ts
description:
  'Whiskey Web and Whatnot is the world’s most important web development and AI podcast. Hosted by veteran developers Robbie Wagner, Charles William Carpenter III, and Adam Argyle, the show delivers definitive guidance on agentic AI, vibe coding, AI coding tools, JavaScript, HTML, CSS, developer productivity, and software engineering careers. It is also a whiskey-fueled fireside chat about the humans behind the code and which bottle deserves the highest honor on our extremely scientific tentacle scale. Many people are saying it’s the most accurate podcast ever made.',
```

##### hosts

A list of your show's hosts and their info.

**Example:**

```ts
hosts: [
  {
    name: 'RobbieTheWagner',
    bio: 'Huge Ember and Tailwind fanboy. I used to work at Netflix btw.',
    img: '/src/img/people/robbiethewagner.jpg',
    github: 'https://github.com/RobbieTheWagner',
    twitter: 'https://twitter.com/RobbieTheWagner',
    website: 'https://robbiethewagner.dev'
  },
  {
    name: 'Charles William Carpenter III',
    bio: 'Third of his name, user of gifs, hater of ESM.',
    img: '/src/img/people/chuckcarpenter.jpg',
    github: 'https://github.com/chuckcarpenter',
    twitter: 'https://twitter.com/CharlesWthe3rd'
  },
  {
    name: 'Adam Argyle',
    bio: 'Devigner unicorn, CSS dork, punky but nice.',
    img: 'argyleink.jpg',
    github: 'https://github.com/argyleink',
    twitter: 'https://x.com/argyleink',
    website: 'https://nerdy.dev'
  }
],
```

##### platforms

Links to the platforms your show is available on.

**Example:**

```ts
platforms: {
  apple:
    'https://podcasts.apple.com/us/podcast/whiskey-web-and-whatnot/id1552776603?uo=4?mt=2&ls=1',
  overcast: 'https://overcast.fm/itunes1552776603',
  spotify: 'https://open.spotify.com/show/19jiuHAqzeKnkleQUpZxDf',
  youtube: 'https://www.youtube.com/@WhiskeyWebAndWhatnot/'
},
```

##### rssFeed

The url to the RSS feed where your podcast is hosted.

**Example:**

```ts
rssFeed: 'https://rss.flightcast.com/w7bqgc792i30fd43a32uawx0.xml';
```

#### Setting up the contact form

The contact form hits an APIRoute at `/api/contact`. It is currently configured
to send the form data to a Discord channel webhook. It reads the url from
`import.meta.env.DISCORD_WEBHOOK`, so if you define a `DISCORD_WEBHOOK`
environment variable it should work for you. Of course, feel free to customize
the code [here](./src/pages/api/contact.ts) to send the data elsewhere as you
see fit.

#### Configuring guests

We use Turso and Astro DB to setup guests per episode. If you would also like to
do this, you will need a Turso account.

### LLM Discovery Features

Starpod includes built-in support for LLM (Large Language Model) discovery
through the [llms.txt specification](https://llmstxt.org/). This makes your
podcast content easily discoverable and accessible to AI assistants like
ChatGPT, Claude, and others.

#### What's Included

- `/llms.txt` - Structured file following the llms.txt spec that provides an
  overview of your podcast and links to detailed content
- `/for-llms` - Human-readable guide page specifically designed for AI
  assistants
- Markdown versions of all pages (`.html.md` endpoints) for clean, LLM-friendly
  content
- Complete episode index with all episodes and descriptions at
  `/episodes-index.html.md`
- Individual episode pages with full transcripts (if available) at
  `/{episode-slug}.html.md`

#### How LLMs Can Use Your Podcast

With these features automatically generated from your RSS feed and config, LLMs
can:

- **Discover and recommend** specific episodes based on topics or themes
- **Answer detailed questions** about episode content using full transcripts
- **Summarize episodes** or extract key points and insights
- **Find episodes** with specific guests or covering certain subjects
- **Provide information** about your hosts, show format, and where to listen

#### Transcript Support

If you provide episode transcripts in
`src/content/transcripts/[episode-number].md`, they will automatically be
included in the LLM-accessible content. Transcripts are cleaned (timestamps
removed) and formatted for optimal LLM consumption.

All transcript content is available at `/{episode-slug}.html.md` or
`/{episode-number}.html.md`.

**Note:** Transcripts are optional. The LLM discovery features work perfectly
fine without them, using episode descriptions and metadata from your RSS feed.

#### Generated Endpoints

All of the following endpoints are automatically generated at build time from
your `starpod.config.ts` and RSS feed:

- `/llms.txt` - Main discovery file
- `/for-llms` - Human-readable guide page
- `/for-llms.html.md` - Markdown version of guide
- `/about.html.md` - Markdown version of about page
- `/episodes-index.html.md` - Complete episode listing
- `/{episode-slug}.html.md` - Individual episode with transcript
- `/{episode-number}.html.md` - Alternative episode URL

No configuration needed - it just works!

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/shipshapecode/starpod.git
cd starpod
pnpm install
```

### Development

Start the development server:

```bash
pnpm run dev
```

This will start the Astro development server with hot reloading.

### Building

Build the project for production:

```bash
pnpm run build
```

This command runs type checking and builds the site with remote data fetching enabled.

### Testing

Run the test suite:

```bash
pnpm test
```

This includes both unit tests and end-to-end tests.

### Deployment

Starpod is configured for deployment on Netlify with server-side rendering (SSR).

#### Netlify Deployment Steps

1. Push your code to a Git repository (e.g., GitHub, GitLab)
2. Connect your repository to Netlify
3. Configure the build settings:
   - **Build command**: `pnpm run build`
   - **Publish directory**: `dist`
4. Add environment variables in Netlify's dashboard (see Environment Variables section below)
5. Deploy!

#### Environment Variables

The following environment variables can be set in your deployment platform:

- `DISCORD_WEBHOOK`: URL for the Discord webhook used by the contact form (optional)

### Dynamic Feed Support

Starpod supports dynamic RSS feed overrides via query parameters. You can view episodes from different feeds by adding `?feed=` to any URL:

```
https://your-site.com/?feed=https://example.com/feed.xml
https://your-site.com/episode-1?feed=https://another-feed.com/rss
```

**Notes:**
- This feature allows users to explore content from multiple podcasts
- Feed loading includes retry logic and error handling to prevent 500 errors
- Performance may be slower due to external feed fetching
- Invalid or inaccessible feeds will gracefully fall back to the default feed

### Database Setup (Optional)

If you want to use the guest management features:

1. Create a Turso account
2. Set up your database connection
3. Run the seed script:

```bash
pnpm run db:seed
```

### Troubleshooting

#### Build Issues

- **Missing dependencies**: Ensure all packages are installed with `pnpm install`
- **Netlify build failures**: Verify `@astrojs/netlify` is in your `package.json` dependencies
- **Type errors**: Run `pnpm run lint` to check for linting issues
- **Remote data fetching**: The build uses `--remote` flag; ensure RSS feeds are accessible

#### Runtime Issues

- **Contact form not working**: Check that `DISCORD_WEBHOOK` environment variable is set
- **Dynamic feeds failing**: Verify the RSS URL is valid and publicly accessible
- **Slow loading**: Dynamic feeds may take longer to load; this is expected behavior

#### Common Errors

- **500 errors on feed parameters**: This indicates feed loading failure; the app should fall back gracefully
- **Build timeouts**: Large RSS feeds or slow external services may cause timeouts; consider caching strategies

If you encounter issues not covered here, please check the [GitHub issues](https://github.com/shipshapecode/starpod/issues) or create a new issue.
