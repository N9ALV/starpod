Summary of recent changes (2026-03-02)

Overview
- Diagnosed and mitigated Cloudflare Pages build failure caused by pinned `pnpm` in `.tool-versions`. Prefer `packageManager` in `package.json` for deploy environments.
- Added an editor-friendly CSS color preview helper file for VS Code.
- Hid the left sidebar by default in the IQpod site and added an iframe protection/"gate" with an allowlist + PIN unlock.
- Added favicon / mask-icon / `safari-pinned-tab.svg` parity in the `IQweb-Smartsearch-widgets` project.

Files changed or added
- IQpod site (Astro)
  - `src/layouts/Layout.astro` — static left sidebar hidden by default; inline iframe gate script + UI added (PIN `'131342'`).
  - `src/css-colors-preview.css` — new helper file to make CSS variables show color swatches in editors.

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
- The iframe gate prevents unauthorized embedding; a PIN fallback allows controlled access when parent origin detection fails.
- Favicon parity ensures widgets match the main site branding across browsers.

Recommended follow-ups (high priority)
1) Regenerate or replace `pnpm-lock.yaml` using a pnpm version matching `packageManager` (or update `packageManager` to the repo's required pnpm). Run locally:

```powershell
corepack prepare pnpm@8.10.2 --activate
pnpm install --frozen-lockfile
pnpm build
```

Adjust pnpm version as appropriate.

2) When ready, trigger an official Cloudflare Pages build (user approval required). Watch the install-tools step logs.

3) If you want the iframe gate PIN changed or centralized, update the two implementations to use a shared env/config value rather than hardcoded `'131342'`.

Contact
- If you want me to push these docs into other project docs (AGENTS.md or CHANGELOGs), tell me which files to update and whether to commit directly to `main` or a feature branch.
