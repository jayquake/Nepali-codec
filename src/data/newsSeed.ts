// Starter news / notes shown when the backend is not configured, or before any posts
// exist. Once Supabase is set up, signed-in users post live updates that replace these.
// Categories: permits | weather | route | safety | general

export interface NewsItem {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  category: string;
  summary: string;
  source?: string;
  /** Link to the original article (present on auto-fetched items). */
  link?: string;
}

export const NEWS_CATEGORIES = ['all', 'permits', 'weather', 'route', 'safety', 'general'];

export const newsSeed: NewsItem[] = [
  {
    id: 'seed-permit-rules-2026',
    date: '2026-09-08',
    title: '2026 rules: solo trekkers can get the RAP, but a licensed guide is still mandatory',
    category: 'permits',
    summary:
      'Under the 2026 permit rules, solo trekkers may now obtain the Manaslu Restricted Area Permit ' +
      '(RAP) individually — but fully independent trekking is still prohibited: a licensed guide is ' +
      'required, and you still need RAP + MCAP + ACAP. Checkpoints at Jagat, Namrung and Dharapani ' +
      'verify them.',
    source: 'Himalayas on Foot',
    link: 'https://himalayasonfoot.com/blog/manaslu-circuit-trek-permit',
  },
  {
    id: 'seed-permit-fees-2026',
    date: '2026-09-05',
    title: 'Autumn RAP fee: US$100 for the first 7 days, +US$15/day after',
    category: 'permits',
    summary:
      'For the autumn season (September–November) the Manaslu Restricted Area Permit costs about ' +
      'US$100 per person for the first 7 days, then roughly US$15 per additional day — higher than ' +
      'the winter/low season. MCAP and ACAP are extra.',
    source: 'Himalayan Recreation',
    link: 'https://www.himalayanrecreation.com/blog/manaslu-circuit-trek-permits-and-fees',
  },
  {
    id: 'seed-larke-open',
    date: '2026-09-07',
    title: 'Larke La (5,106 m) open with stable terrain for the autumn season',
    category: 'route',
    summary:
      'The high pass via Larke La is reported open with stable conditions for autumn. From ' +
      'Dharamsala most groups leave 04:00–05:00 to cross before wind and cloud build — a long ' +
      '8–10 h day to Bimthang. Pace it and keep the acclimatisation days.',
    source: 'Rugged Trails Nepal',
    link: 'https://www.ruggedtrailsnepal.com/blog/manaslu-circuit-trek-guide-larke-pass',
  },
  {
    id: 'seed-weather-2026',
    date: '2026-09-06',
    title: 'Early September: residual monsoon in the lower valleys; Oct–Nov most stable',
    category: 'weather',
    summary:
      'Early-to-mid September can still see leftover monsoon showers and cloud in the lower ' +
      'valleys as the monsoon retreats; October and November are the clearest, most popular ' +
      'months. Nights above 3,500 m drop below freezing — check the Weather tab for the live ' +
      'Larke La forecast before your pass day.',
    source: 'Nepal Independent Guide',
    link: 'https://www.nepalindependentguide.com/activities/manaslu-circuit-trek/',
  },
  {
    id: 'seed-safety',
    date: '2026-09-01',
    title: 'Acclimatise: the two-night rule and the AMS warning signs',
    category: 'safety',
    summary:
      'Take the acclimatisation days at Samagaon and Samdo. Watch for headache, nausea, dizziness ' +
      'and breathlessness — if they worsen, descend. Carry insurance that covers helicopter ' +
      'evacuation above 4,000 m.',
  },
];
