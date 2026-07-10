import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string() });

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    /** review = single product, roundup = best-of list, brand = brand hub, guide = info/FAQ */
    kind: z.enum(['review', 'roundup', 'brand', 'guide']),
    title: z.string(),
    /** Meta description, 140-160 chars */
    description: z.string(),
    /** Defaults to title if omitted */
    h1: z.string().optional(),
    heroEyebrow: z.string().optional(),
    /** review only: the product slug in src/data/products */
    productSlug: z.string().optional(),
    /** roundup/brand: ranked list of product slugs, rendered as a comparison table.
     *  guide: optional short list of recommended products, rendered as a pick block. */
    items: z.array(z.string()).optional(),
    /** category key for roundups (best, bladeless, heater, remote, quiet, mini) */
    category: z.string().optional(),
    /** brand name for brand hubs */
    brand: z.string().optional(),
    publishDate: z.coerce.date().default(new Date('2026-06-21')),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    faqs: z.array(faq).default([]),
    relatedSlugs: z.array(z.string()).default([]),
    /** override default OG/social image */
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
