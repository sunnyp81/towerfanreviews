import type { Product } from '../products';

export const products: Product[] = [
  {
    slug: 'dyson-cool-am07',
    name: 'Dyson Cool AM07',
    brand: 'Dyson',
    category: ['best', 'bladeless', 'quiet', 'premium', 'remote'],
    illustration: 'bladeless',
    priceGBP: 330,
    rating: 4.4,
    ratingBreakdown: [
      { label: 'Airflow', score: 4.3 },
      { label: 'Noise', score: 4.6 },
      { label: 'Features', score: 4.2 },
      { label: 'Value', score: 3.6 },
    ],
    pros: [
      'Smooth, consistent airflow with no chopping sensation',
      'Genuinely quiet on lower settings, fine for bedrooms',
      'No exposed blades, so safe around children and easy to wipe clean',
      'Remote control stores magnetically on the loop',
    ],
    cons: [
      'Expensive next to conventional tower fans that move similar air',
      'No heating function (see the Hot+Cool for year-round use)',
      'Maximum setting is loud and rarely needed',
    ],
    bestFor: 'Design-conscious buyers who want quiet, safe, fuss-free cooling',
    verdict:
      'The AM07 is the tower fan to beat for refinement: quiet, beautifully made and effortless to clean. You pay a clear premium over conventional fans, but nothing else feels this polished.',
    award: 'Best Premium',
    specs: [
      { label: 'Type', value: 'Bladeless' },
      { label: 'Speeds', value: '10' },
      { label: 'Oscillation', value: 'Yes (70°)' },
      { label: 'Remote', value: 'Yes' },
      { label: 'Timer', value: 'Sleep timer' },
      { label: 'Height', value: '100 cm' },
    ],
    hasReview: true,
  },
  {
    slug: 'dyson-purifier-cool',
    name: 'Dyson Purifier Cool',
    brand: 'Dyson',
    category: ['bladeless', 'quiet', 'premium', 'remote'],
    illustration: 'bladeless',
    priceGBP: 400,
    rating: 4.3,
    pros: [
      'Cools and filters the air with a sealed HEPA + carbon filter',
      'App and voice control with real-time air-quality reporting',
      'Quiet night mode dims the display and drops the noise',
    ],
    cons: ['Premium price plus ongoing filter costs', 'Overkill if you only want cooling'],
    bestFor: 'Allergy and hay-fever sufferers who want cooling and purification in one',
    verdict:
      'A clever two-in-one for allergy season: you get Dyson’s smooth bladeless airflow plus genuine HEPA purification, at a price that only makes sense if you actually need the filtering.',
    specs: [
      { label: 'Type', value: 'Bladeless + purifier' },
      { label: 'Filter', value: 'HEPA H13 + carbon' },
      { label: 'Oscillation', value: 'Yes (350°)' },
      { label: 'App control', value: 'Yes' },
      { label: 'Remote', value: 'Yes' },
    ],
    hasReview: false,
  },
];
