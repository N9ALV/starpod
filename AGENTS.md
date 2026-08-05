# IQPod agent guide

This repository is the source for IQPod, an Astro application deployed as the Cloudflare Worker service `starpod`.

## Production ownership

- Product URL: `https://iu.com.au/iq/app/iqpod`
- Protected origin: `https://iqpod.tradegpt.ai`
- Worker service: `starpod`
- Source repository: `N9ALV/starpod`
- Canonical route owner: `N9ALV/iq-app-router`
- Member identity and access owner: `N9ALV/iq-vault`

The canonical IU route is the product surface. WordPress and Vault establish member identity, then the app router delivers IQPod. Do not add a client-side PIN, premium check, or second authentication system to this app. IQPod currently requires membership but no premium tier.

## Change workflow

1. Work on `main` unless explicitly directed otherwise.
2. Run `pnpm install --frozen-lockfile` after dependency changes.
3. Run `pnpm lint`, `pnpm test:unit run`, and `pnpm run build`.
4. Load Cloudflare access using the canonical IU operations guide.
5. Deploy with `pnpm run deploy:cloudflare`.
6. Verify `https://iu.com.au/iq/app/iqpod` in a logged-in member browser, then
   verify that direct top-level origin navigation redirects to it and direct
   origin subresources fail closed.
7. Re-run the central IQ suite smoke test in `N9ALV/IQweb-Smartsearch-widgets`.

GitHub Actions is not a production deployment mechanism for this app. Do not reintroduce scheduled rebuild or deploy workflows.

## Source boundaries

- Application source belongs in `src/`.
- Static assets belong in `public/`.
- Cloudflare deployment configuration belongs in `wrangler.jsonc`.
- Do not commit `dist/`, `.netlify/`, `.wrangler/`, `.astro/`, or `node_modules/`.
- Keep the upstream Starpod attribution and licence intact while documenting IQ-specific ownership separately.

Use British spelling for new user-facing IQ copy.
