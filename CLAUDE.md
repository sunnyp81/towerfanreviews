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

## DEPLOY — pending Sunny (NOT yet live)
1. Create GitHub repo `sunnyp81/towerfanreviews`, push `master`.
2. Cloudflare Pages: connect repo, build `npm run build`, output `dist`, NODE_VERSION=22.
3. DNS: point `towerfanreviews.uk` to the CF Pages project.
4. `public/_redirects` maps old WP slugs → new structure (preserved `/used-on-its-side/`, `/dyson-cool-am07/`, `/honeywell-hy254e-quietset/`).
5. Submit sitemap `https://towerfanreviews.uk/sitemap-index.xml` to GSC + Bing.
6. Re-attach Ezoic / set up AdSense when traffic returns.

## Old site assets
Drive workspace `G:\My Drive\SEO\sites\towerfanreviews.uk\` (old WP config, ugc-content, backups) — historical only.
