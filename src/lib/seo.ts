// Site-wide constants + JSON-LD schema builders.

export const SITE = {
  name: 'Tower Fan Reviews',
  url: 'https://towerfanreviews.uk',
  domain: 'towerfanreviews.uk',
  tagline: 'Independent UK tower fan reviews & buying guides',
  description:
    'Independent, hands-on UK tower fan reviews, comparisons and buying guides. We test bladeless, hot & cold and quiet tower fans to help you stay cool for less.',
  locale: 'en_GB',
  twitter: '@towerfanreviews',
  publisher: 'Tower Fan Reviews',
  logo: 'https://towerfanreviews.uk/logo.svg',
  email: 'hello@towerfanreviews.uk',
  founded: '2026',
  sameAs: [
    'https://www.sunnypatel.co.uk',
  ],
} as const;

// Real, named editor for E-E-A-T (the site owner). Never fabricate credentials.
export const EDITOR = {
  name: 'Sunny Patel',
  url: 'https://www.sunnypatel.co.uk',
  jobTitle: 'Editor',
  bio: 'Sunny Patel runs Tower Fan Reviews, buying and testing tower fans in real UK homes to give honest, independent buying advice.',
} as const;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': `${SITE.url}/#editor`,
    name: EDITOR.name,
    url: EDITOR.url,
    jobTitle: EDITOR.jobTitle,
    description: EDITOR.bio,
    knowsAbout: ['Tower fans', 'Home cooling', 'Consumer electronics reviews'],
    sameAs: [EDITOR.url],
  };
}

function iso(d?: Date): string | undefined {
  return d ? new Date(d).toISOString() : undefined;
}

export function canonical(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return new URL(p, SITE.url).href;
}

export function orgSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#org`,
    name: SITE.publisher,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: SITE.logo },
    description: SITE.description,
    foundingDate: SITE.founded,
    sameAs: [...SITE.sameAs],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#org` },
    inLanguage: 'en-GB',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/?s={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function reviewSchema(p: {
  name: string;
  brand: string;
  rating: number;
  description: string;
  url: string;
  image?: string;
  datePublished?: Date;
  dateModified?: Date;
}) {
  return {
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: p.name,
      brand: { '@type': 'Brand', name: p.brand },
      ...(p.image ? { image: p.image } : {}),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: p.rating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
    },
    author: { '@type': 'Person', name: EDITOR.name, url: EDITOR.url },
    publisher: { '@id': `${SITE.url}/#org` },
    url: p.url,
    reviewBody: p.description,
    ...(iso(p.datePublished) ? { datePublished: iso(p.datePublished) } : {}),
    ...(iso(p.dateModified) ? { dateModified: iso(p.dateModified) } : {}),
  };
}

/** Article schema for guides and roundups (freshness + authorship signals). */
export function articleSchema(p: {
  headline: string;
  description: string;
  url: string;
  datePublished?: Date;
  dateModified?: Date;
  image?: string;
}) {
  return {
    '@type': 'Article',
    headline: p.headline,
    description: p.description,
    mainEntityOfPage: p.url,
    url: p.url,
    author: { '@type': 'Person', name: EDITOR.name, url: EDITOR.url },
    publisher: { '@id': `${SITE.url}/#org` },
    inLanguage: 'en-GB',
    ...(p.image ? { image: p.image } : {}),
    ...(iso(p.datePublished) ? { datePublished: iso(p.datePublished) } : {}),
    ...(iso(p.dateModified) ? { dateModified: iso(p.dateModified) } : {}),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

/** Wrap one or more schema nodes into a graph document. */
export function graph(...nodes: (object | null)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
