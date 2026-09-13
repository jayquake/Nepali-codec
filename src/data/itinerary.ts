// Day-by-day trip plan with real dates. Pre-trek + post-trek days are fixed here;
// trek days are derived from the stages in trail.ts so they stay in sync.
// Edit the anchors below as the plan firms up.

import { stages } from './trail';

export type DayKind = 'fly' | 'city' | 'travel' | 'trek' | 'rest';

export interface ItineraryDay {
  id: string;
  date: string; // YYYY-MM-DD
  icon: string;
  title: string;
  detail: string;
  kind: DayKind;
}

/** First trekking day (drive-in is the day before). */
const TREK_START = '2026-09-20';

function addDays(iso: string, n: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const preTrek: ItineraryDay[] = [
  {
    id: 'd-fly-out',
    date: '2026-09-16',
    icon: '✈️',
    title: 'Fly to Kathmandu',
    detail: 'FZ573 flydubai DXB → KTM. Lands ~00:55 (Thu). Hotel booked for the night of the 16th; arrival ~02:00.',
    kind: 'fly',
  },
  {
    id: 'd-ktm-1',
    date: '2026-09-17',
    icon: '🏙️',
    title: 'Kathmandu — organise',
    detail: 'Meet the agency, start permits (RAP + MCAP + ACAP), sort gear in Thamel. Verify TAAN membership.',
    kind: 'city',
  },
  {
    id: 'd-ktm-2',
    date: '2026-09-18',
    icon: '🏙️',
    title: 'Kathmandu — permits / buffer',
    detail: 'Permits take 2–3 working days; Immigration is closed at weekends, so keep this as buffer. Confirm trail conditions.',
    kind: 'city',
  },
  {
    id: 'd-travel-in',
    date: '2026-09-19',
    icon: '🚙',
    title: 'Travel to trailhead',
    detail: 'Long jeep day: Kathmandu → Machha Khola / Soti Khola. Early start.',
    kind: 'travel',
  },
];

const trekDays: ItineraryDay[] = stages.map((s, i) => ({
  id: `d-${s.id}`,
  date: addDays(TREK_START, i),
  icon: s.distanceKm === 0 ? '🧗' : '🥾',
  title: `D${s.day} · ${s.from} → ${s.to}`,
  detail:
    s.distanceKm === 0
      ? `Acclimatisation. ${s.hours}.`
      : `${s.distanceKm} km · ↑${s.ascentM} / ↓${s.descentM} m · ${s.hours}.`,
  kind: s.distanceKm === 0 ? 'rest' : 'trek',
}));

const lastTrek = addDays(TREK_START, stages.length - 1);

const postTrek: ItineraryDay[] = [
  {
    id: 'd-drive-out',
    date: addDays(lastTrek, 1),
    icon: '🚙',
    title: 'Drive out to Kathmandu',
    detail: 'Jeep Dharapani → Besisahar, then on to Kathmandu (or overnight Besisahar/Pokhara).',
    kind: 'travel',
  },
  {
    id: 'd-ktm-buffer',
    date: addDays(lastTrek, 2),
    icon: '🏙️',
    title: 'Kathmandu — rest / buffer',
    detail: 'Contingency + celebration. Consider a nicer hotel post-trek. Souvenirs, repack.',
    kind: 'city',
  },
  {
    id: 'd-fly-home',
    date: addDays(lastTrek, 3),
    icon: '✈️',
    title: 'Fly home',
    detail: 'Departure (~19:00 per notes). Adjust this date to your actual return flight.',
    kind: 'fly',
  },
];

export const itinerary: ItineraryDay[] = [...preTrek, ...trekDays, ...postTrek];
