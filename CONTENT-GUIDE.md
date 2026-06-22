# CONTENT-GUIDE — towerfanreviews.uk

You are writing content for an Astro affiliate review site. The design system, layouts and
components are ALREADY BUILT. You only create **content files** and **product data files**.
Cards, comparison tables, spec boxes, pros/cons, FAQ accordions, schema, ad slots and email
capture are auto-rendered by the layout — DO NOT write HTML for them.

## Golden rules
- **British English** always: -ise, -our, -re, £. (optimise, colour, centre, programme)
- **NEVER use em dashes (—) or en dashes (–).** Use commas, colons, or hyphens only. This is critical.
- **Affiliate honesty:** never invent precise lab measurements (exact dB, exact CFM) as if we measured them. Use realistic ranges and editorial judgement ("quiet on low", "around 26W", "roughly 1-2p per hour"). Product specs (type, speeds, oscillation, remote, height) should be realistic and accurate to the model.
- Tone: confident, helpful, plain-English. Like a knowledgeable friend, not a brochure. No hype words ("ultimate", "game-changing").
- Each review = **700-1000 words**. Each roundup intro/body = **500-800 words**. Each guide = **700-1100 words**.
- Internal links: link to the pillar(s) and 2-3 related pages using **exact slugs from the registry below**. In markdown body use root-relative links like `[best tower fans](/best-tower-fans/)`.

## File locations
- Articles: `src/content/articles/<slug>.md`  (the filename IS the slug; URL is `/<slug>/`)
- Product data: `src/data/products/<yourfile>.ts`  (each agent uses its OWN uniquely-named file — never edit another file)

## Article frontmatter schema
```yaml
---
kind: review | roundup | brand | guide   # required
title: "SEO title, <60 chars ideally, include year 2026 for roundups"
description: "Meta description 140-160 chars, compelling, includes primary keyword"
h1: "Optional H1 if different from title"          # optional
heroEyebrow: "Short label e.g. 'Bladeless tower fan review'"  # optional
productSlug: dyson-cool-am07      # REVIEW ONLY — must match a product in data
items:                            # ROUNDUP/BRAND ONLY — ranked product slugs (curated order)
  - slug-1
  - slug-2
category: best                    # roundup only: best|bladeless|heater|remote|quiet|mini|budget
brand: Dyson                      # brand hub only
updatedDate: 2026-06-21
featured: false
faqs:                             # 3-5 FAQs targeting real People-Also-Ask questions
  - q: "Question in natural language?"
    a: "Direct 40-70 word answer. First sentence answers immediately (for AI citation). British English."
relatedSlugs:                     # 2-4 exact slugs from registry
  - some-slug
---
Markdown body here (prose only — NO component HTML).
```

## What the layout auto-renders (so you DON'T write it)
- **review**: hero + at-a-glance SpecBox (image/illustration, rating, price, key specs, Amazon CTA) from `productSlug`; then YOUR prose; then Pros/Cons (from product data); then FAQ; related; email capture; ad slots.
- **roundup / brand**: hero; "At a glance" comparison table + ranked product cards (from `items`); then YOUR prose buying-advice body; FAQ; related; email capture. **Your body must NOT re-list each product as a card — the cards are auto-generated. Write the buying guidance, how-we-chose, what-to-look-for, and brief context instead.**
- **guide**: hero; YOUR prose; FAQ; related; email capture.

## Review body structure (prose, use ## H2 headings)
1. Short intro (2-3 sentences, the hook + who it's for)
2. `## Design and build quality`
3. `## Airflow and cooling` (or performance)
4. `## Noise`
5. `## Running costs`
6. `## Features` (timer, remote, modes, app) — optional merge
7. `## Is the <model> worth it?` (verdict, who should buy)
End with 1-2 internal links to pillar + a related model.

## Product data format (TypeScript)
Create `src/data/products/<yourfile>.ts`:
```ts
import type { Product } from '../products';
export const products: Product[] = [
  {
    slug: 'dreo-pilot-max',           // kebab-case, MUST equal the review filename if hasReview
    name: 'Dreo Pilot Max',
    brand: 'Dreo',
    category: ['best','quiet','remote'],   // keys: best,bladeless,heater,remote,quiet,mini,budget,premium
    illustration: 'standard',          // standard|bladeless|tall|mini|heater  (no real image needed)
    priceGBP: 90,                      // realistic typical UK price (number, no £)
    rating: 4.3,                       // 3.4 - 4.6 realistic spread; reserve 4.5+ for genuine standouts
    ratingBreakdown: [{label:'Airflow',score:4.4},{label:'Noise',score:4.2},{label:'Features',score:4.5},{label:'Value',score:4.3}],
    pros: ['4-6 short concrete pros'],
    cons: ['2-3 honest cons'],
    bestFor: 'One line: who this suits',
    verdict: 'One or two sentence verdict, British English, no em dashes.',
    award: 'Best Budget',              // optional, only for standout picks
    // OMIT asin — links fall back to a tagged Amazon search (safe, no broken /dp/ links)
    specs: [
      {label:'Type', value:'Bladed'},
      {label:'Speeds', value:'9'},
      {label:'Oscillation', value:'Yes (90°)'},
      {label:'Remote', value:'Yes'},
      {label:'Timer', value:'1-12h'},
      {label:'Height', value:'107 cm'},
    ],
    hasReview: true,                   // true if you also create the review article
  },
];
```
Keep spec `label`s consistent across products (Type, Speeds, Oscillation, Remote, Timer, Height) so comparison tables align.

## Verification before you finish
Run `npm run build` from the repo root. It MUST complete with no errors. Fix any frontmatter/TS issues. Report the slugs you created.

---

# MASTER SLUG REGISTRY (use these EXACT slugs for all links & items)

### Pillars / roundups
- `best-tower-fans` (home pillar — already exists, link to it)
- `best-bladeless-tower-fans`
- `best-tower-fan-heaters`
- `best-quiet-tower-fans`
- `best-tower-fans-with-remote`
- `best-mini-tower-fans`
- `best-cheap-tower-fans`

### Brand hubs
- `dyson-tower-fans`, `dreo-tower-fans`, `levoit-tower-fans`, `honeywell-tower-fans`, `dimplex-tower-fans`, `shark-tower-fans`, `silvercrest-tower-fans`

### Guides
- `tower-fan-buying-guide` (already exists, link to it)
- `used-on-its-side`, `why-making-noise-rattling`, `how-to-clean-a-tower-fan`, `tower-fan-running-cost`, `do-tower-fans-cool-a-room`, `bladeless-vs-bladed-tower-fans`, `where-to-buy-tower-fans-uk`, `tower-fan-vs-pedestal-fan`

### Model reviews (product slug = review slug)
Dyson (exists): `dyson-cool-am07`, `dyson-purifier-cool`
- `dyson-am07`, `dyson-hot-cool`, `dreo-pilot-max`, `dreo-cruiser`, `levoit-tower-fan`, `shark-flexbreeze-tower`, `meacofan-1056`
- `dimplex-dxmbcf`, `dimplex-mont-blanc`, `honeywell-hy254e-quietset`, `honeywell-ho-5500re-oscillating`, `netta`, `igenix-df0030-oscillating-tower-fan`
- `vortex-air-pro`, `mylek`, `ansio`, `seville`, `silvercrest-bladeless-tower-fan`, `pifco`, `vonhaus`, `russell-hobbs-tower-fan`

> Brands/Guides indexes, About, How-we-test, Contact, Privacy already exist as static pages.
