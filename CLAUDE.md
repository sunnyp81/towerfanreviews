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
53 pages built / 51 in sitemap (`/404/` and `/thank-you/` excluded): home + 7 roundups + 7 brand hubs + 21 model reviews + 9 guides + static. 22 products (was 23; the duplicate `dyson-am07` was merged into `dyson-cool-am07`). All JSON-LD valid, no thin pages.

## Monetisation
- Amazon affiliate (tag `towerfan-21`) — product cards/tables/CTAs, `rel="nofollow sponsored noopener noreferrer"`.
- Ad slots reserved (`AdSlot.astro`, `[data-ad]`, CLS-safe) — wire Ezoic/AdSense later.
- Email capture via StaticForms (key `sf_9e906eb6c00416b9d3354749`) — newsletter + contact.

## RULES
- **British English. NO em/en dashes (— –) anywhere** in user-facing content. (Scan: `grep -rn $'[—–]' src/content src/data src/pages src/components`.)
- 🔴 **We do NOT run a test lab.** Never write "we tested", "we measured", "hands-on", "our lab", "real UK homes", or invent hours-of-testing / dB / airflow figures. The site rates fans on published specs + verified owner reviews + running costs calculated from rated wattage. Canonical statement of method: `/how-we-rate/` (`src/pages/how-we-rate.astro`). Allowed verbs: compared, ranked, calculated, weighed up; "owners report", "the manufacturer quotes".
- Hero stats on the homepage are **counted from data**, never asserted. Do not hardcode them.
- Affiliate disclosure must render **before the first affiliate link** (`[...slug].astro`, gated on `hasAffiliateLinks`), not just in the footer. ASA/CAP + Amazon Associates require this.
- Contrast: white text needs `heat-600`/`heat-700` behind it (`heat-400`/`heat-500` fail WCAG AA). Orange **text** on white must be `heat-700`.
- `ADS_ENABLED` in `src/lib/seo.ts` gates `AdSlot`. Keep false until an ad network is actually wired, or empty "Advertisement" boxes ship to users.
- `GA4_ID` reads `PUBLIC_GA4_ID` from the build env. `privacy.astro` branches on it, so the privacy policy can never claim analytics we do not run.
- Run `npm run build` before shipping. Don't run concurrent builds (dist race).

## Audit + fix pass, 2026-07-10 (Opus, multi-agent)
Full UX/content/SEO audit and remediation. **Not yet deployed at time of writing: needs `git push` (auto-deploys).**
Fixed: sitewide fabricated testing claims (incl. homepage "120+ hours of testing" and `Review` schema rating fiction) rewritten as research-led; `/how-we-test/` renamed `/how-we-rate/` (301); duplicate Dyson AM07 review + product entry merged into `dyson-cool-am07` (301) and price contradictions (£300 vs £330) resolved; all 9 `kind: guide` pages given `items:` product picks so they finally monetise (incl. `/used-on-its-side/`, the top page, which earned £0 on 372 impressions); affiliate disclosure moved above first CTA; empty "Advertisement" placeholders gated off; CTA/badge/meta-text/focus-ring contrast fixed to WCAG AA; comparison-table scroll region made keyboard reachable; `BreadcrumbList` self-collision on `/best-tower-fans/` fixed; Google Fonts self-hosted via `@fontsource` (was render-blocking third-party); `/thank-you/` page added + excluded from sitemap; footer heading-order skip fixed; Shark/Silvercrest/mini/where-to-buy added to footer links.

### 🔴 Open items that CANNOT be fixed from this repo
1. **Cloudflare is injecting a managed robots.txt** that `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot, CCBot, Bytespider, meta-externalagent, and sets `Content-Signal: ai-train=no`. It is prepended to our own file, which Allows them all, so the live file self-contradicts. This blocks the AI-citation strategy and blocks Amazon's own crawler on an Amazon affiliate site. Fix in CF dashboard: zone `towerfanreviews.uk` → AI Crawl Control / managed robots.txt → stop injecting, or allow-list those agents.
2. **`www.towerfanreviews.uk` and `towerfanreviews.pages.dev` both serve 200**, byte-identical to apex, with no 301. Canonicals point to apex so Google should consolidate, but add a CF Redirect Rule (Pages `_redirects` is path-only, cannot do host).
3. **0 of 22 products have an `asin`**, so every "Check price on Amazon" button goes to a tagged Amazon **search results page**, not the product. Biggest single conversion lever on the site. Backfill `asin:` in `src/data/products/*.ts`; `affiliateUrl()` already prefers `/dp/{asin}`. Start with `dimplex-dxmbcf`, `dyson-cool-am07`, `vortex-air-pro`, `dimplex-mont-blanc`, `igenix-df0030-oscillating-tower-fan` (the pages with impressions).
4. **No GA4 property exists for this site.** Set `PUBLIC_GA4_ID` in the CF Pages build env to switch analytics + the privacy policy paragraph on together.
5. **Hardcoded `priceGBP` + prices in prose.** Amazon's Operating Agreement expects prices sourced live from PA-API. ~30 static prices across `src/data/products/` and article bodies. Decide: strip numeric prices in favour of bands, or wire PA-API.
6. **StaticForms key `sf_9e906eb6c00416b9d3354749` is in client HTML** on every page (`EmailCapture.astro`, `contact.astro`). Treat as public; rotate if it ever gates anything.

## DEPLOY — ✅ LIVE on towerfanreviews.uk (Jun 26)
- **GitHub:** `github.com/sunnyp81/towerfanreviews` (public, `master`). Pushed.
- **LIVE:** https://towerfanreviews.uk + www + https://towerfanreviews.pages.dev — all serve the Astro site (verified Jun 26: `Server: cloudflare`, correct title, no Hostinger remnants, http→https 301 works). CF Pages project `towerfanreviews`, account sunnypat81@gmail.com (`aba0a672…`).
- **Deploy = git push.** Project is **Git-connected** to `sunnyp81/towerfanreviews` (Jun 25): pushing to `master` auto-builds and deploys. Build `npm run build`, output `dist`, env `NODE_VERSION=22`. Verified working (push → build → Active prod). `npm run deploy` (wrangler direct upload) still works as a manual fallback. `_redirects` + `_headers` live.
- **Apex blocker RESOLVED Jun 26:** zone now IS in the sunnypat81 CF account (NS `meg/sergi.ns.cloudflare.com`). Apex+www are `CNAME → towerfanreviews.pages.dev` (Proxied). The old proxied Hostinger A/AAAA records (→217.21.71.90) that shadowed the Pages route were **deleted** → apex stopped serving old WP and now serves Pages. (Earlier WP responses post-deletion were stale CF edge content; cleared on propagation.)
- **DNS cleanup TODO (non-blocking):** `autoconfig`/`autodiscover` CNAMEs → Hostinger mail are set **Proxied**; should be **DNS only** (grey) or mail-client autodiscovery breaks (only matters if Hostinger email is used on this domain). Old `google-site-verification` TXT is Hostinger's, harmless. MX/SPF still point to Hostinger mail.
- **NEXT:** submit `https://towerfanreviews.uk/sitemap-index.xml` to GSC + Bing; re-attach Ezoic.
- `public/_redirects` maps old WP slugs to new structure. **Jun 24 summer pass:** completed the map from 16-month GSC export (`Downloads/towerfanreviews.uk-Performance-on-Search-2026-06-24.xlsx`). 34 rules now transfer ~30k indexed impressions that previously had no matching page/redirect (e.g. `/dyson-pure-cool/` 5k, `/pedestal-vs-tower-fan/` 3.8k, `/dimplex-mont-blanc-cooling-fan-review/` 4.5k, winners `/why-not-working/`, `/ctf-100-ctf-200-climatik/`). Old WP was hacked: casino/slots spam URLs left to 404 (not redirected). All 34 targets verified to resolve. CTR pass found titles already strong (UK+2026); only `/tower-fan-vs-pedestal-fan/` retitled for freshness.
5. Submit sitemap `https://towerfanreviews.uk/sitemap-index.xml` to GSC + Bing.
6. Re-attach Ezoic / set up AdSense when traffic returns.

## Old site assets
Drive workspace `G:\My Drive\SEO\sites\towerfanreviews.uk\` (old WP config, ugc-content, backups) — historical only.
