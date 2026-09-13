// Day-by-day trip plan with the ACTUAL dates for this trip (Sep–Oct 2026).
// Source: the group's dated schedule. Edit here if plans change.

export type DayKind = 'fly' | 'city' | 'travel' | 'trek' | 'rest' | 'pass';

export interface ItineraryDay {
  id: string;
  date: string; // YYYY-MM-DD
  icon: string;
  title: string;
  detail: string;
  kind: DayKind;
}

export const itinerary: ItineraryDay[] = [
  {
    id: 'd-fly-out',
    date: '2026-09-16',
    icon: '✈️',
    title: 'Fly to Kathmandu (via Dubai)',
    detail:
      'FZ573 flydubai DXB → KTM. Lands ~00:55 (Thu, KTM time). Hotel booked for the night of the 16th; arrival ~02:00.',
    kind: 'fly',
  },
  {
    id: 'd-ktm',
    date: '2026-09-17',
    icon: '🏙️',
    title: 'Kathmandu — finalise & shop',
    detail:
      'Close out the trip arrangements with the agency, confirm permits (RAP + MCAP + ACAP), and shop for the hike in Thamel.',
    kind: 'city',
  },
  {
    id: 'd-drive-in',
    date: '2026-09-18',
    icon: '🚙',
    title: 'Kathmandu → Machha Khola',
    detail: 'Long jeep day to the trailhead at Machha Khola (~900 m).',
    kind: 'travel',
  },
  {
    id: 'd-t1',
    date: '2026-09-19',
    icon: '🥾',
    title: 'Machha Khola → Jagat',
    detail: 'Up the Budhi Gandaki past Tatopani hot springs to Jagat (~1,340 m). Permit check.',
    kind: 'trek',
  },
  {
    id: 'd-t2',
    date: '2026-09-20',
    icon: '🥾',
    title: 'Jagat → Deng',
    detail: 'Through Philim/Ekle Bhatti (Tsum Valley junction) into the gorge to Deng (~1,860 m).',
    kind: 'trek',
  },
  {
    id: 'd-t3',
    date: '2026-09-21',
    icon: '🥾',
    title: 'Deng → Namrung',
    detail: 'Cross to Buddhist country via Ghap; climb to Namrung (~2,630 m). Permit check.',
    kind: 'trek',
  },
  {
    id: 'd-t4',
    date: '2026-09-22',
    icon: '🥾',
    title: 'Namrung → Lho',
    detail: 'Through Lihi & Sho to Lho (~3,180 m) — first big Manaslu views, Ribung Gompa.',
    kind: 'trek',
  },
  {
    id: 'd-t5',
    date: '2026-09-23',
    icon: '🥾',
    title: 'Lho → Sama Gaun',
    detail: 'Through Shyala to Sama Gaun / Samagaon (~3,530 m), the acclimatisation hub.',
    kind: 'trek',
  },
  {
    id: 'd-accl',
    date: '2026-09-24',
    icon: '🧗',
    title: 'Acclimatisation — Sama Gaun',
    detail:
      'Rest & acclimatise. Day hike to Manaslu Base Camp (~4,800 m) or Birendra Lake / Pungyen Gompa. Climb high, sleep low.',
    kind: 'rest',
  },
  {
    id: 'd-t6',
    date: '2026-09-25',
    icon: '🥾',
    title: 'Sama Gaun → Samdo',
    detail: 'Gentle high-valley walk to Samdo (~3,860 m), the last permanent village.',
    kind: 'trek',
  },
  {
    id: 'd-t7',
    date: '2026-09-26',
    icon: '🥾',
    title: 'Samdo → Dharamsala',
    detail: 'Short climb to Dharamsala / Larke Phedi (~4,460 m). Rest early for the pass.',
    kind: 'trek',
  },
  {
    id: 'd-pass',
    date: '2026-09-27',
    icon: '🏔️',
    title: 'Dharamsala → Larkya La → Bhimthang',
    detail:
      'THE BIG DAY. Pre-dawn start over Larkya La (5,106 m), then a long descent to Bhimthang (~3,720 m). 8–10 h.',
    kind: 'pass',
  },
  {
    id: 'd-t8',
    date: '2026-09-28',
    icon: '🥾',
    title: 'Bhimthang → Dharapani',
    detail: 'Long descent through forest via Karche/Gho/Tilije to Dharapani (~1,860 m), joining the Annapurna Circuit.',
    kind: 'trek',
  },
  {
    id: 'd-drive-out',
    date: '2026-09-29',
    icon: '🚙',
    title: 'Dharapani → Kathmandu',
    detail: 'Jeep out via Besisahar back to Kathmandu.',
    kind: 'travel',
  },
  {
    id: 'd-buffer',
    date: '2026-09-30',
    icon: '🏙️',
    title: 'Kathmandu — buffer / rest',
    detail: '30 Sep–2 Oct: contingency + celebration. Rest, souvenirs, repack. A nicer hotel post-trek.',
    kind: 'city',
  },
  {
    id: 'd-fly-home',
    date: '2026-10-03',
    icon: '✈️',
    title: 'Fly home',
    detail: 'Departure from Kathmandu. Reconfirm the flight and airport transfer the day before.',
    kind: 'fly',
  },
];
