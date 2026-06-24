# SEO + AEO Audit — towerfanreviews.uk

> **REMEDIATION (2026-06-24): Critical + High + quick-Medium fixes applied.**
> Done: titles trimmed (>60 chars: 45 → **0**); Person + Article schema with datePublished/dateModified added (Article 0→23, Person 0→46, all JSON-LD valid); named editor byline (Sunny Patel) + Person schema + org sameAs/foundingDate; real PNG OG image; external citations added (Ofgem, Electrical Safety First, manufacturers — 7→**28** pages); answer-first 40-60 word openers on all reviews/roundups; per-product Power(W) spec + differentiated running-cost prose; in-prose review links from roundups (0→**43**) lifting review inbound links (e.g. used-on-its-side 1→3, dyson-cool-am07 →7); circular FAQs fixed; buying guide expanded 340→~1,500 words; custom 404; llms.txt; security `_headers`; 3 meta descriptions fixed; Vortx→Vortex.
> Deferred (optional/post-launch): real product photography (L3), self-host fonts (L2), dedicated "vs" comparison pages (M3), Wikidata entry (L1). Revised scores: Technical ~92, On-page ~78, AEO ~68.



**Date:** 2026-06-22 · **Method:** technical-seo-checker + ai-seo rubrics, mechanical extraction over 52 built pages, plus 2 independent adversarial agent reads (AEO + on-page). Pre-deploy audit (CWV/security items to confirm once live on Cloudflare Pages).

## Scores
| Track | Score | Verdict |
|-------|-------|---------|
| **Technical SEO health** | **81 / 100** | Strong, launch-ready foundation |
| **On-page / semantic SEO** | **~55 / 100** | Good structure; thin in depth, E-E-A-T, internal links |
| **AEO / AI citation readiness** | **~40 / 100** | Cite-able structure exists; missing authors, sources, dates |

> Note: an agent scored on-page 38/100 partly on a premise that product cards/tables might be client-rendered and invisible to crawlers. **Verified false** — Astro outputs static HTML (0 client scripts on page; all product text present). Card/table content is fully indexable, so the real on-page score is higher (~55).

---

## What's already strong (keep)
- **Crawl/index hygiene:** every page has a self-referencing canonical, exactly one H1, consistent trailing slashes, no accidental `noindex`, **no duplicate titles or descriptions**, **no orphan pages**, auto sitemap.
- **AI bot access:** robots.txt explicitly allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended.
- **Schema breadth:** BreadcrumbList ×51, FAQPage ×45, Review ×22, ItemList ×14, Organization + WebSite. All JSON-LD valid.
- **Speed/CLS:** static HTML, ~zero client JS, fonts `display=swap`, SVG illustrations (no layout shift), ad slots have reserved min-height. Projected CWV strong (confirm with PSI post-deploy).
- **Mobile:** responsive, viewport set, hamburger nav, 16px+ body, `lang="en-GB"`.
- **Content-type mix:** roundups (most-cited AEO type), reviews, definitive guides — good coverage.

---

## CRITICAL (rank + AI-trust blockers)

**C1. Titles overflow 60 chars on 45/52 pages.** The `| Tower Fan Reviews` suffix (+20 chars) pushes nearly every review/guide title past the SERP truncation limit, so Google rewrites them and you lose keyword control. Fix: drop or shorten the suffix (e.g. `| TFR`) on review/guide pages, keep brand only on pillars/home; rewrite the longest titles, front-load the searched name (e.g. "Dimplex Mont Blanc", not the "DXMBCF" code).

**C2. No named author / E-E-A-T evidence.** Reviews are written by an anonymous "we"; `reviewSchema` author is `Organization`, not `Person`; `how-we-test` describes a process with no specifics; some lines (e.g. "cross-referenced verified owner feedback across multiple seasons") imply testing a new site can't evidence. This is the #1 Product-Review-Update risk. Fix: add a real named editor/byline + `Person` schema + a credible, honest How-We-Test page. **Do not fabricate credentials, photos, or testing claims** (per the no-unverified-claims rule and the shecookssheeats author lesson) — use an honest editorial identity and only claims you can stand behind.

**C3. No dates in structured data.** `reviewSchema` emits no `datePublished`/`dateModified`; guides emit only FAQ + Breadcrumb (no `Article` schema at all). Freshness is a direct AI-Overview ranking signal. Fix: pass `updatedDate` into Review schema and add an `articleSchema()` (with both dates) for guides; surface a visible "Last updated" line.

---

## HIGH

**H1. Zero external citations/stats.** No factual claim links to a source (Ofgem price cap, manufacturer wattage, Energy Saving Trust, NHS/Met Office for wind-chill). Cited sources = +40% AI visibility, stats = +37%. Add 3-5 authority links per guide/review.

**H2. Openers aren't answer-first.** Only ~2 of 7 sampled articles open with a liftable 40-60 word direct answer (`do-tower-fans-cool-a-room`, `used-on-its-side` do it well). Rewrite each article's first paragraph as: [direct answer] + [why] + [qualifier].

**H3. Weak internal linking into reviews.** Reviews get only 1-2 inbound links (the historical top performer `/used-on-its-side/` has just 1). Buying guide and roundup *bodies* link only to other hubs, never to individual reviews in prose; `where-to-buy` names Dyson/Dreo/Argos with no links. Fix: add 5-8 descriptive in-prose links into each review from guides/roundups/brand hubs; vary anchor text.

**H4. OG image is an SVG.** `og-default.svg` won't render on most social/AI link previews (they require PNG/JPG). Generate a PNG OG image (Satori, per stack) and per-page OG where useful.

**H5. Flagship buying guide is thin (~340 words).** Below the 1,200-3,000 words competitors rank with. Missing entities: room-size→power mapping, safety standard (BS EN 60335), cord length/placement, cleaning (link the guide), energy label. Expand.

---

## MEDIUM

- **M1. Templated, interchangeable sections.** "Running costs" and "noise" prose is near-identical across reviews (swap the name and it still reads true). Add a per-product `Power (W)` spec and real specifics; vary section openers (the mandated H2 order makes the AI-tell structural).
- **M2. Circular FAQ answers.** e.g. best-tower-fans FAQ defers to "the comparison above"; netta opens "For the price, yes." Make every FAQ answer self-contained (restate the subject + a figure).
- **M3. Add comparison "vs" content** (highest-cited product format): "Dyson AM07 vs Dreo Pilot Max", "tower fan vs air conditioning" (you have tower-fan-vs-pedestal already).
- **M4. 3 meta descriptions out of range:** best-cheap-tower-fans (182, trim), contact (117), privacy (113).
- **M5. No custom 404 page** — add `src/pages/404.astro`.
- **M6. Data realism:** "Vortx" name/brand vs `vortex-air-pro` slug (pick one — likely "Vortex"); verify Seville/Silvercrest UK availability; rating spread is narrow (3.2-4.4).
- **M7. AEO extras:** add `SpeakableSpecification` on key answers and an `/llms.txt`.
- **M8. Security headers** on deploy: add `public/_headers` (CSP, X-Content-Type-Options, HSTS via Cloudflare).

---

## LOW
- L1. `orgSchema`: add `sameAs` (socials) + `foundingDate` for entity disambiguation.
- L2. Self-host or `preload` fonts (Google Fonts stylesheet is render-blocking).
- L3. Real product photography (Amazon Associates permits product images) — adds trust + image-search traffic; current SVGs are clean but generic.
- L4. AggregateRating on products (only if you have a real rating basis — don't fabricate review counts).

---

## Suggested order (post-launch, highest ROI first)
1. C1 titles + C3 schema dates + M4 meta + M5 404 (fast, mechanical, site-wide).
2. C2 author/E-E-A-T + H4 OG PNG (trust + previews).
3. H2 answer-first openers + H1 citations (AEO lift) on the top ~12 pages by opportunity.
4. H3 internal-link pass + H5 buying-guide expansion.
5. M1/M2/M3 differentiation + vs pages; then LOW polish.

**Bottom line:** technically clean and launch-ready; the gap to ranking + AI citation is **depth and trust** — named authorship, external sources, dates in schema, deeper pillars, and real internal-link routing. None require a rebuild; all are content/schema layer changes.
