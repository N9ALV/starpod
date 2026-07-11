Summary of recent changes (2026-03-02)

Overview
- Diagnosed and mitigated Cloudflare Pages build failure caused by pinned `pnpm` in `.tool-versions`. Prefer `packageManager` in `package.json` for deploy environments.
- Added an editor-friendly CSS color preview helper file for VS Code.
- Hid the left sidebar by default in the IQPod site. The temporary iframe PIN gate added at that time was removed on 2026-07-12 when Vault and the canonical `/iq/app/iqpod` route became the access boundary.
- Migrated the deployed site from Netlify-style hosting to Cloudflare Workers SSR and attached `iqpod.tradegpt.ai` as the active custom domain.
- Hardened external feed parsing and contact-form failure handling for more reliable Cloudflare runtime behavior.
- Added favicon / mask-icon / `safari-pinned-tab.svg` parity in the `IQweb-Smartsearch-widgets` project.

Files changed or added
- IQpod site (Astro)
  - `src/layouts/Layout.astro` — static left sidebar hidden by default; the later access clean-up removed the obsolete inline gate.
  - `src/css-colors-preview.css` — new helper file to make CSS variables show color swatches in editors.
- `astro.config.mjs` — moved to `@astrojs/cloudflare`, set SSR output, memory-backed sessions, and the production `site` URL.
- `wrangler.jsonc` — new Worker deployment config for Cloudflare.
- `public/.assetsignore` — excludes `_worker.js` from static asset upload.
- `src/layouts/Layout.astro` — removed the old Vercel Speed Insights client include.
- `package.json` — removed stale Vercel/Netlify deploy packages that were no longer used after the Cloudflare migration.
- `src/lib/rss.ts` and `src/pages/api/feed.json.ts` — parser import handling fixed for Worker/runtime compatibility.
- `src/pages/api/contact.ts` — graceful 503/502 handling when `DISCORD_WEBHOOK` is missing or downstream fails.
- `src/pages/[episode].astro` — transcript rendering changed to link out to markdown transcripts so the Worker stays under Cloudflare size limits.

- IQweb Smartsearch Widgets
  - `client/src/components/IframeGate.tsx` — allowlist updated to include `https://iqpod.tradegpt.ai` and `https://www.iqpod.tradegpt.ai`.
  - `client/index.html` — added `mask-icon` and `theme-color` meta.
  - `client/public/safari-pinned-tab.svg` — new asset added.

- Repo/tooling
  - `.tool-versions` — removed `pnpm` entry to avoid deploy environment tool install failures.
  - `package.json` — added/confirmed `packageManager` entry (preferred strategy for Pages build environments).

Why these changes
- Cloud providers (Cloudflare Pages, Netlify, etc.) often ignore or fail on local `.tool-versions` entries; a `packageManager` field in `package.json` is more predictable and avoids failing the "install tools" step.
- Hiding the left sidebar by default improves embed/syndication UX and aligns with the product request to keep the site compact when embedded.
- Access now belongs to the WordPress/Vault identity layer and canonical IU app route, rather than a client-visible PIN in IQPod.
- Cloudflare Workers needed a smaller and more runtime-safe bundle than the previous deploy path, so transcript rendering and feed parser handling were tightened.
- Direct custom-domain attachment in Cloudflare proved more reliable than the failed GitHub import / Pages attempt for this site.
- Favicon parity ensures widgets match the main site branding across browsers.

Completed follow-up (2026-07-12)
- Regenerated `pnpm-lock.yaml` with the repository-pinned pnpm version.
- Restored clean frozen installs and fixed the config import used by unit tests.
- Removed obsolete tracked Netlify output from the Cloudflare Worker repository.
- Removed the client-side PIN gate; the canonical IU route now owns access.

Production deploy flow

```powershell
pnpm install --frozen-lockfile
Cloudflare Management/ops/cloudflare-access-all.ps1 -Persist
pnpm run deploy:cloudflare
```

Contact
- If you want me to push these docs into other project docs (AGENTS.md or CHANGELOGs), tell me which files to update and whether to commit directly to `main` or a feature branch.
- NFly update status: the feed/panel refresh has been deployed through the NFly sync, so the documented NFly update process can be marked as complete and the latest payload is live.
- Cloudflare status: `https://starpod.a-b21.workers.dev` and `https://iqpod.tradegpt.ai` are now serving from Cloudflare.
