// Day-by-day trip plan with the ACTUAL dates for this trip (Sep–Oct 2026).
// Source: the group's dated schedule, kept in step with what actually happened on
// the trail: an extra night at Ghap, Ghap -> Lihi, a night at Shyala, then Sama Gaun
// from 24 Sep with a weather hold while the late-September storm passes.
// Days from 27 Sep are marked provisional: Larke La is closed to trekkers and the
// road beyond Dharapani is blocked (see src/data/alerts.ts).

export type DayKind = 'fly' | 'city' | 'travel' | 'trek' | 'rest' | 'pass';

export interface ItineraryDay {
  id: string;
  date: string; // YYYY-MM-DD
  icon: string;
  title: string;
  detail: string;
  kind: DayKind;
  /** Plans past the weather hold — not yet possible to commit to. */
  provisional?: boolean;
}

export const itinerary: ItineraryDay[] = [
  {
    id: 'd-fly-out',
    date: '2026-09-16',
    icon: '✈️',
    title: 'Fly to Kathmandu (via Dubai)',
    detail:
      'FZ573 flydubai DXB → KTM. Lands ~00:55 (Thu, KTM time). 🛏️ Vastu Boutique Hotel (Jyatha, Thamel) booked for the night of the 16th; arrival ~02:00.',
    kind: 'fly',
  },
  {
    id: 'd-ktm',
    date: '2026-09-17',
    icon: '🏙️',
    title: 'Kathmandu — finalise & shop',
    detail:
      'Close out the trip arrangements with the agency, confirm permits (RAP + MCAP + ACAP), and shop for the hike in Thamel. 🛏️ Vastu Boutique Hotel.',
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
    id: 'd-ghap',
    date: '2026-09-21',
    icon: '🥾',
    title: 'Deng → Ghap',
    detail:
      'Short day up the gorge, crossing the river to Ghap (~2,160 m) — mani walls, prayer wheels, pine forest. Night at Ghap (added on the trail).',
    kind: 'trek',
  },
  {
    id: 'd-t3',
    date: '2026-09-22',
    icon: '🥾',
    title: 'Ghap → Lihi',
    detail:
      'Past the Namrung checkpoint and on to Lihi (~2,920 m) — mani walls, first big Manaslu views. Night at Lihi.',
    kind: 'trek',
  },
  {
    id: 'd-t4',
    date: '2026-09-23',
    icon: '🥾',
    title: 'Lihi → Shyala',
    detail:
      'Through Sho and Lho (Ribung Gompa) to Shyala (~3,500 m), ringed by Himalchuli, Manaslu and Ngadi Chuli. Night at Shyala.',
    kind: 'trek',
  },
  {
    id: 'd-shyala-sama',
    date: '2026-09-24',
    icon: '🥾',
    title: 'Shyala → Sama Gaun',
    detail:
      'Short walk up the valley to Sama Gaun / Samagaon (~3,530 m), the big Tibetan-style village that is the acclimatisation hub.',
    kind: 'trek',
  },
  {
    id: 'd-accl',
    date: '2026-09-25',
    icon: '🧗',
    title: 'Acclimatisation — Sama Gaun',
    detail:
      'Rest & acclimatise. Day hike to Manaslu Base Camp (~4,800 m) or Birendra Lake / Pungyen Gompa. Climb high, sleep low.',
    kind: 'rest',
  },
  {
    id: 'd-hold',
    date: '2026-09-26',
    icon: '🌧️',
    title: 'Sama Gaun — weather hold',
    detail:
      'Storm. Heavy rain and snow above; authorities suspended high-altitude trekking and told trekkers to stay low and safe. Sitting it out in Sama Gaun — lodges, food, and the right altitude to wait at. See the Alerts tab.',
    kind: 'rest',
  },
  {
    id: 'd-t6',
    date: '2026-09-27',
    icon: '🥾',
    title: 'Sama Gaun → Samdo',
    detail:
      'Gentle high-valley walk to Samdo (~3,860 m), the last permanent village. Only once the weather warning lifts.',
    kind: 'trek',
    provisional: true,
  },
  {
    id: 'd-t7',
    date: '2026-09-28',
    icon: '🥾',
    title: 'Samdo → Dharamsala',
    detail: 'Short climb to Dharamsala / Larke Phedi (~4,460 m). Rest early for the pass.',
    kind: 'trek',
    provisional: true,
  },
  {
    id: 'd-pass',
    date: '2026-09-29',
    icon: '🏔️',
    title: 'Dharamsala → Larkya La → Bhimthang',
    detail:
      'THE BIG DAY. Pre-dawn start over Larkya La (5,106 m), then a long descent to Bhimthang (~3,720 m). 8–10 h. NOTE: trekking to Bhimthang was banned by the Manang administration during the storm and fresh snow is lying on the pass — confirm it has reopened before committing.',
    kind: 'pass',
    provisional: true,
  },
  {
    id: 'd-t8',
    date: '2026-09-30',
    icon: '🥾',
    title: 'Bhimthang → Tilije (last walking day)',
    detail:
      'Long descent through forest along the Dudh Khola via Karche and Gho to the Gurung village of Tilije (~2,300 m) — apple orchards and much thicker air.',
    kind: 'trek',
    provisional: true,
  },
  {
    id: 'd-drive-out',
    date: '2026-10-01',
    icon: '🚙',
    title: 'Tilije → Kathmandu (jeep)',
    detail:
      'The road reaches Tilije, so the jeep picks up here — no walk out to Dharapani. Long drive down via Dharapani and Besisahar to Kathmandu. NOTE: the Chame–Besisahar road was completely blocked by flood and landslide — check before relying on this.',
    kind: 'travel',
    provisional: true,
  },
  {
    id: 'd-buffer',
    date: '2026-10-02',
    icon: '🏙️',
    title: 'Kathmandu — buffer / repack',
    detail:
      'The buffer is down to a single day now. Rest, repack, sort the flight home. Any further delay on the trail eats into the 3 Oct departure.',
    kind: 'city',
    provisional: true,
  },
  {
    id: 'd-fly-home',
    date: '2026-10-03',
    icon: '✈️',
    title: 'Fly home',
    detail:
      'Departure from Kathmandu. The DXB→TLV leg was cancelled — see the Alerts tab for 4 Oct replacements and the rebooking email.',
    kind: 'fly',
    provisional: true,
  },
];
