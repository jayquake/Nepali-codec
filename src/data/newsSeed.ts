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
}

export const NEWS_CATEGORIES = ['all', 'permits', 'weather', 'route', 'safety', 'general'];

export const newsSeed: NewsItem[] = [
  {
    id: 'seed-permits',
    date: '2025-09-01',
    title: 'Restricted-area permit requires a licensed guide and 2 trekkers',
    category: 'permits',
    summary:
      'The Manaslu Restricted Area Permit (RAP) must be arranged through a registered agency; ' +
      'solo trekking is not allowed. Carry RAP + MCAP + ACAP — checkpoints at Jagat, Namrung and ' +
      'Dharapani verify them. RAP fees are higher in Sep–Nov than in the low season.',
    source: 'Nepal Dept. of Immigration',
  },
  {
    id: 'seed-larke',
    date: '2025-09-01',
    title: 'Larke La (5,106 m): start before dawn, watch for afternoon wind',
    category: 'route',
    summary:
      'From Dharamsala most groups leave 04:00–05:00 to cross the pass before the wind and cloud ' +
      'build. It is a long 8–10 h day to Bimthang — pace it and keep the acclimatisation days.',
  },
  {
    id: 'seed-weather',
    date: '2025-09-01',
    title: 'Autumn window opening as the monsoon retreats',
    category: 'weather',
    summary:
      'Late September clears as the monsoon ends; October is the most stable month. Nights above ' +
      '3,500 m drop below freezing. Check the Weather tab for the live Larke La forecast before ' +
      'your pass day.',
  },
  {
    id: 'seed-safety',
    date: '2025-09-01',
    title: 'Acclimatise: two nights’ rule and the AMS warning signs',
    category: 'safety',
    summary:
      'Take the acclimatisation days at Samagaon and Samdo. Watch for headache, nausea, dizziness ' +
      'and breathlessness — if they worsen, descend. Consider travel insurance that covers ' +
      'helicopter evacuation above 4,000 m.',
  },
  {
    id: 'seed-getting-here',
    date: '2025-09-01',
    title: 'Getting to the trailhead and back',
    category: 'general',
    summary:
      'Most itineraries drive Kathmandu → Machha Khola / Soti Khola (a long jeep day) to start, and ' +
      'finish at Dharapani, driving out via Besisahar. Buy any last supplies in Kathmandu; villages ' +
      'have basic shops but limited stock and no ATMs on the restricted section.',
  },
];
