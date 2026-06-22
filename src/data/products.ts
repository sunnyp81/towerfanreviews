// ============================================================
// Product data layer, single source of truth for specs,
// pricing, ratings and affiliate links.
//
// PARALLEL-SAFE: each content batch drops its own file in
// src/data/products/<group>.ts exporting `const products: Product[]`.
// This index auto-aggregates them via glob, never edit a shared list.
// ============================================================

export type Illustration = 'standard' | 'bladeless' | 'tall' | 'mini' | 'heater';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  /** kebab-case, must match the review article slug if one exists */
  slug: string;
  /** Display name, e.g. "Dyson Cool AM07" */
  name: string;
  brand: string;
  /** category keys: best, bladeless, heater, remote, quiet, mini, budget, premium */
  category: string[];
  /** Optional real image in /public/images/. Falls back to SVG illustration. */
  image?: string;
  illustration?: Illustration;
  priceGBP?: number;
  priceNote?: string;
  /** 0-5, one decimal */
  rating: number;
  ratingBreakdown?: { label: string; score: number }[];
  pros: string[];
  cons: string[];
  bestFor: string;
  /** One or two sentence verdict */
  verdict: string;
  /** Award badge, e.g. "Best Overall", "Best Budget", "Editor's Choice" */
  award?: string;
  /** Amazon ASIN, preferred. Builds a tagged /dp/ link. */
  asin?: string;
  /** Full affiliate URL override (must already include tag=towerfan-21) */
  affiliateUrl?: string;
  specs: ProductSpec[];
  /** True if a full review article exists at /<slug>/ */
  hasReview?: boolean;
}

const AFFILIATE_TAG = 'towerfan-21';

const modules = import.meta.glob<{ products: Product[] }>('./products/*.ts', { eager: true });

const all: Product[] = Object.values(modules).flatMap((m) => m.products ?? []);

// De-duplicate by slug (last write wins) and keep stable
const bySlug = new Map<string, Product>();
for (const p of all) bySlug.set(p.slug, p);

export const products: Product[] = [...bySlug.values()];

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getProducts(slugs: string[]): Product[] {
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

export function byCategory(cat: string): Product[] {
  return products.filter((p) => p.category.includes(cat)).sort((a, b) => b.rating - a.rating);
}

export function byBrand(brand: string): Product[] {
  return products
    .filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    .sort((a, b) => b.rating - a.rating);
}

/** Build a tagged Amazon UK affiliate URL for a product. */
export function affiliateUrl(p: Product): string {
  if (p.affiliateUrl) return p.affiliateUrl;
  if (p.asin) return `https://www.amazon.co.uk/dp/${p.asin}?tag=${AFFILIATE_TAG}`;
  const q = encodeURIComponent(p.name);
  return `https://www.amazon.co.uk/s?k=${q}&tag=${AFFILIATE_TAG}`;
}

export { AFFILIATE_TAG };
