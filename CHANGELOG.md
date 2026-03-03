# CHANGELOG.md

USE DIRECT ACCESS INSTRUCTIONS PER POLICY: C:\Users\adam\Zoho WorkDrive (ML)\My Folders\OneDrive\Desktop\AWS + CF Management\docs\ACCESS-NOW.md

## 2026-03-02 — Feed & Panel Fixes Walkthrough

**Changes Made (6 files on GitHub main):**
- **rss.ts — Core feed parsing**
  - Loosened Valibot schema: `itunes_duration` now accepts number | string; most fields wrapped in `optional()`
  - Added `parseDuration()` helper for HH:MM:SS / MM:SS / numeric-string formats
  - Per-episode try/catch on `optimizeImage` — one failed image no longer breaks the whole feed
  - `getShowInfo()` now extracts author from `itunes_author`, `author`, or `managingEditor`
  - Added `author?: string` to the Show interface
  - Fallback to raw `feed.items` when strict schema parse fails
- **index.astro — Page layout**
  - Left panel now hidden by default; only shows with `?show=true`
  - Both `getAllEpisodes()` and `getShowInfo()` receive the resolved feed URL
  - Uses `Promise.allSettled` so a failing `getShowInfo()` doesn't crash the page
- **EpisodeList.astro — Episode list**
  - Fixed field names: uses `episodeImage`, `published` (unix ms), `episodeNumber`, `audio.src`
  - Added inline `<audio>` player per episode
  - Graceful image fallback with `onerror` handler
- **InfoCard.astro — Left panel card**
  - Shows author from feed data when available
  - Hides image entirely when not present (vs broken image)
  - Suppresses `<Hosts>` component for external feeds
- **Hosts.astro — Hosts component**
  - Accepts `hide` prop to suppress for external feeds
- **optimize-episode-image.ts — Image optimiser**
  - Always returns raw URL on failure instead of throwing

**Verification Results**
| Test | Result |
|------|--------|
| Default URL (no params) | ✅ Loads default episodes, panel hidden |
| ?feed=buzzsprout/1410787.rss | ✅ "The Auto Hub Show" with 100+ episodes |
| Netlify build | ✅ All builds completed |
| GitHub Actions | ✅ No runs still active |
| ?feed=flightcast | ⏳ Needs visual browser check |
| ?show=true panel | ⏳ Needs visual browser check |

**NOTE**
The real `Layout.astro` on the repo has a "Hosted By" section baked into it at the layout level, which is separate from the `Hosts.astro` component. This may still appear. You may want to check in the browser and let me know if that needs removing too.
[blank line]
---

## Cloudflare Migration
- Project has moved to Cloudflare for hosting.
- First build attempt on Cloudflare failed; further investigation required.

## 2026-03-02 — Cloudflare Status Check

- Authenticated via the canonical Cloudflare token and listed every Pages project; none are named `iqpod` or `starpod`, so no deployment corresponds to this repo yet.
- The `Z:\My Folders\IQpod-Starpod` checkout contains empty `src/`, `public/`, and `tests/` directories plus no `.git` metadata; installing deps there fails with `EPERM` symlink errors because the share forbids creating node_module symlinks.
- Copied the repo to a native Linux temp dir, ran `npm install`/`npm run build`, and Astro succeeded but emitted `Missing pages directory: src/pages` and produced zero pages, proving the bundle itself is just a stub with no UI yet.
- Recommendation: pause Cloudflare deploy work until the actual source tree is restored or another branch with the feed/panel updates is available, then point the Pages project (new or existing) at that payload before rerunning `wrangler`/`npm run build`.

---

## 2026-03-02 — Embedding, Favicon, and Tooling updates

**Summary:** small product and deployment hygiene updates pushed locally.

- Left sidebar default: the static left panel is now hidden by default to improve embed/syndication UX. It will show when explicitly requested (query param or host override).
- Iframe gate: an allowlist + PIN-based fallback was added to guard against unauthorized embedding (PIN: `131342`). Consider centralizing this secret if needed.
- Favicon parity: the widget project received `mask-icon`/`safari-pinned-tab.svg` and `theme-color` metadata to match main site branding.
- Tooling: removed `pnpm` from `.tool-versions` and documented `packageManager` guidance to reduce Pages build failures.

Verify these changes locally before triggering any remote Pages builds.
