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
} as const;

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
    author: { '@type': 'Organization', name: SITE.publisher },
    publisher: { '@id': `${SITE.url}/#org` },
    url: p.url,
    reviewBody: p.description,
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
