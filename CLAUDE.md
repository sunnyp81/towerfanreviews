# towerfanreviews.uk — repo brain

UK tower fan affiliate review site. **Rebuilt from scratch 2026-06-21** (Opus, multi-agent) replacing the dead WordPress site.

## Why rebuilt
Old WP+Ezoic site was effectively dead: ~1,100 impressions / **2 clicks in 3 months**, avg pos ~50, thin individual product pages. The "high RPM $8.46" note was misleading (near-zero pageviews). Keyword opportunity is strong: "tower fan" 23k vol, hundreds of brand/model long-tails, almost all **KD 0**. Rebuilt as a fast static site for topical authority + AI citation.

## Stack
- **Astro 5 + Tailwind 4** (`@tailwindcss/vite`), static output. Cloudflare Pages target.
- Build: `npm run build` (output `dist`, NODE_VERSION=22). Dev: `npm run dev`.
- Design system: `src/styles/global.css` ("Cool Breeze" palette — breeze cyan + heat-orange CTA, Sora/Inter fonts).

## Architecture (how content works)
- **Product data**: `src/data/products/*.ts` — each file exports `const products: Product[]`. Auto-aggregated via glob in `src/data/products.ts` (dedupe by slug). Add a new file, never edit a shared list. Affiliate links auto-built with tag `towerfan-21` (ASIN omitted → tagged Amazon **search** fallback, so no broken /dp/ links; add real `asin` when known).
- **Articles**: `src/content/articles/*.md` (content collection, schema in `src/content.config.ts`). `kind`: review | roundup | brand | guide. Filename = slug = URL `/<slug>/`.
- **Routing**: `src/pages/[...slug].astro` renders all articles. Layout auto-renders SpecBox/ComparisonTable/ProductCard/ProsCons/FAQ/AdSlot/EmailCapture/schema — markdown body is **prose only**.
- Static pages: index, brands, guides, about, how-we-test, contact, privacy.
- **CONTENT-GUIDE.md** = the rules + master slug registry used to brief content agents. Read it before adding pages.

## Scale (built)
52 pages: home + 7 pillars/roundups + 7 brand hubs + ~23 model reviews + 8 guides + 5 static. 23 products. All JSON-LD valid, no thin pages.

## Monetisation
- Amazon affiliate (tag `towerfan-21`) — product cards/tables/CTAs, `rel="nofollow sponsored noopener noreferrer"`.
- Ad slots reserved (`AdSlot.astro`, `[data-ad]`, CLS-safe) — wire Ezoic/AdSense later.
- Email capture via StaticForms (key `sf_9e906eb6c00416b9d3354749`) — newsletter + contact.

## RULES
- **British English. NO em/en dashes (— –) anywhere** in user-facing content. (Scan: `grep -rn $'[—–]' src/content src/data src/pages src/components`.)
- Affiliate honesty: no fabricated lab measurements; realistic spec ranges only.
- Run `npm run build` before shipping. Don't run concurrent builds (dist race).

## DEPLOY — LIVE on pages.dev (custom domain pending)
- **GitHub:** `github.com/sunnyp81/towerfanreviews` (public, `master`). Pushed.
- **LIVE:** https://towerfanreviews.pages.dev — CF Pages project `towerfanreviews`, account sunnypat81@gmail.com (`aba0a672…`).
- **Deploy = git push.** Project is **Git-connected** to `sunnyp81/towerfanreviews` (Jun 25): pushing to `master` auto-builds and deploys. Build `npm run build`, output `dist`, env `NODE_VERSION=22`. Verified working (push → build → Active prod). `npm run deploy` (wrangler direct upload) still works as a manual fallback. `_redirects` + `_headers` live.
- **Point towerfanreviews.uk at it (needs Sunny):** DNS is at **Hostinger** (NS `ns1/ns2.dns-parking.com`, old WP IP 217.21.71.90); zone is NOT in Cloudflare and wrangler token is zone:read only, so DNS can't be set from CLI. Recommended: add the zone in the sunnypat81 CF account → switch NS at Hostinger to CF → CF Pages → `towerfanreviews` → Custom domains → add `towerfanreviews.uk` + `www` (DNS auto-created). Then submit `https://towerfanreviews.uk/sitemap-index.xml` to GSC + Bing; re-attach Ezoic.
- `public/_redirects` maps old WP slugs to new structure. **Jun 24 summer pass:** completed the map from 16-month GSC export (`Downloads/towerfanreviews.uk-Performance-on-Search-2026-06-24.xlsx`). 34 rules now transfer ~30k indexed impressions that previously had no matching page/redirect (e.g. `/dyson-pure-cool/` 5k, `/pedestal-vs-tower-fan/` 3.8k, `/dimplex-mont-blanc-cooling-fan-review/` 4.5k, winners `/why-not-working/`, `/ctf-100-ctf-200-climatik/`). Old WP was hacked: casino/slots spam URLs left to 404 (not redirected). All 34 targets verified to resolve. CTR pass found titles already strong (UK+2026); only `/tower-fan-vs-pedestal-fan/` retitled for freshness.
5. Submit sitemap `https://towerfanreviews.uk/sitemap-index.xml` to GSC + Bing.
6. Re-attach Ezoic / set up AdSense when traffic returns.

## Old site assets
Drive workspace `G:\My Drive\SEO\sites\towerfanreviews.uk\` (old WP config, ugc-content, backups) — historical only.
