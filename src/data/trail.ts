// Manaslu Circuit Trek — route data.
//
// This is OUR actual walked route (Sep 2026), matching the day-by-day plan in
// src/data/itinerary.ts: trailhead at Machha Khola, an extra night added at Ghap,
// Ghap → Lihi, Lihi → Shyala / Sama Gaun, one acclimatisation day at Sama Gaun,
// then Samdo, Dharamsala, over Larke La to Bhimthang and out to Dharapani.
//
// Coordinates and elevations are approximate waypoints intended for MAPPING and
// planning only. They are NOT survey-grade and must NOT be used for turn-by-turn
// navigation in the field — always carry an offline topo map, a GPS device and a
// licensed guide (the Manaslu Circuit is a restricted area and a guide is mandatory).
//
// Edit this file to refine the route, add villages, or adjust stages.

export interface Waypoint {
  name: string;
  lat: number;
  lng: number;
  /** Elevation in metres. */
  ele: number;
}

export interface Stage {
  id: string;
  day: number;
  /** Actual calendar date for this stage, YYYY-MM-DD (matches itinerary.ts). */
  date: string;
  from: string;
  to: string;
  /** Approximate walking distance for the stage, in km. 0 for rest / acclimatisation days. */
  distanceKm: number;
  ascentM: number;
  descentM: number;
  maxEleM: number;
  /** Typical walking time, human readable. */
  hours: string;
  description: string;
  /** Ordered points along the stage; the last one is the overnight stop. */
  waypoints: Waypoint[];
}

export const TREK_NAME = 'Manaslu Circuit Trek';
export const TREK_SUMMARY =
  'Our ~10-day teahouse trek around Mt. Manaslu (8,163 m), the world’s 8th-highest ' +
  'peak, crossing the Larke La pass (5,106 m) from Machha Khola to Dharapani. A restricted ' +
  'area: Restricted Area Permit (RAP) + Manaslu (MCAP) + Annapurna (ACAP) permits and a ' +
  'registered guide are required.';

export const PERMITS = [
  'Restricted Area Permit (RAP) — Jagat to Dharapani section',
  'Manaslu Conservation Area Permit (MCAP)',
  'Annapurna Conservation Area Permit (ACAP)',
];

export const BEST_SEASONS =
  'Best seasons: Spring (mid-March to May) and Autumn (late September to November). ' +
  'Winter snow can close Larke La; monsoon (June–August) brings leeches, landslides and cloud.';

export const stages: Stage[] = [
  {
    id: 'stage-1',
    day: 1,
    date: '2026-09-19',
    from: 'Machha Khola',
    to: 'Jagat',
    distanceKm: 22,
    ascentM: 640,
    descentM: 200,
    maxEleM: 1410,
    hours: '6–7 h',
    description:
      'Up the Budhi Gandaki past the hot springs at Tatopani, over stone staircases through ' +
      'Dobhan and Yaru, then a climb to the flagstone-paved village of Jagat, where the ' +
      'restricted-area permit is checked.',
    waypoints: [
      { name: 'Machha Khola', lat: 28.348, lng: 84.895, ele: 900 },
      { name: 'Tatopani (hot spring)', lat: 28.374, lng: 84.888, ele: 990 },
      { name: 'Dobhan', lat: 28.408, lng: 84.878, ele: 1070 },
      { name: 'Jagat', lat: 28.451, lng: 84.858, ele: 1340 },
    ],
  },
  {
    id: 'stage-2',
    day: 2,
    date: '2026-09-20',
    from: 'Jagat',
    to: 'Deng',
    distanceKm: 20,
    ascentM: 720,
    descentM: 200,
    maxEleM: 1900,
    hours: '6–7 h',
    description:
      'Through Philim and Ekle Bhatti, where the Tsum Valley trail branches off, into the ' +
      'steep, narrowing Budhi Gandaki gorge to the small settlement of Deng.',
    waypoints: [
      { name: 'Jagat', lat: 28.451, lng: 84.858, ele: 1340 },
      { name: 'Philim', lat: 28.484, lng: 84.833, ele: 1590 },
      { name: 'Ekle Bhatti', lat: 28.505, lng: 84.836, ele: 1600 },
      { name: 'Deng', lat: 28.523, lng: 84.845, ele: 1860 },
    ],
  },
  {
    id: 'stage-3',
    day: 3,
    date: '2026-09-21',
    from: 'Deng',
    to: 'Ghap',
    distanceKm: 10,
    ascentM: 450,
    descentM: 150,
    maxEleM: 2200,
    hours: '3–4 h',
    description:
      'A short day up the gorge, crossing and re-crossing the river into Buddhist country — ' +
      'mani walls, prayer wheels and pine forest — to the hamlet of Ghap. Overnight added ' +
      'here on the trail to ease the climb.',
    waypoints: [
      { name: 'Deng', lat: 28.523, lng: 84.845, ele: 1860 },
      { name: 'Rana', lat: 28.527, lng: 84.822, ele: 1980 },
      { name: 'Ghap', lat: 28.530, lng: 84.803, ele: 2160 },
    ],
  },
  {
    id: 'stage-4',
    day: 4,
    date: '2026-09-22',
    from: 'Ghap',
    to: 'Lihi',
    distanceKm: 11,
    ascentM: 900,
    descentM: 140,
    maxEleM: 2920,
    hours: '4–5 h',
    description:
      'Climb through forest to the permit checkpoint at Namrung, then on past mani walls to ' +
      'Lihi with its chortens and first big views of Manaslu and the high peaks.',
    waypoints: [
      { name: 'Ghap', lat: 28.530, lng: 84.803, ele: 2160 },
      { name: 'Namrung', lat: 28.541, lng: 84.797, ele: 2630 },
      { name: 'Lihi', lat: 28.552, lng: 84.768, ele: 2920 },
    ],
  },
  {
    id: 'stage-5',
    day: 5,
    date: '2026-09-23',
    from: 'Lihi',
    to: 'Shyala / Sama Gaun',
    distanceKm: 14,
    ascentM: 800,
    descentM: 190,
    maxEleM: 3530,
    hours: '5–6 h',
    description:
      'Through Sho and Lho (hilltop Ribung Gompa, sunset on Manaslu) to Shyala, ringed by ' +
      'Himalchuli, Manaslu and Ngadi Chuli, and on to the Tibetan-style village of ' +
      'Sama Gaun — the acclimatisation hub. Overnight at Shyala or Sama Gaun (decided on the trail).',
    waypoints: [
      { name: 'Lihi', lat: 28.552, lng: 84.768, ele: 2920 },
      { name: 'Lho', lat: 28.573, lng: 84.740, ele: 3180 },
      { name: 'Shyala', lat: 28.590, lng: 84.662, ele: 3500 },
      { name: 'Sama Gaun', lat: 28.606, lng: 84.629, ele: 3530 },
    ],
  },
  {
    id: 'stage-6',
    day: 6,
    date: '2026-09-24',
    from: 'Sama Gaun',
    to: 'Sama Gaun (acclimatisation)',
    distanceKm: 0,
    ascentM: 0,
    descentM: 0,
    maxEleM: 4800,
    hours: 'Rest day',
    description:
      'Acclimatisation day. Options: day hike to Manaslu Base Camp (~4,800 m) or the turquoise ' +
      'Birendra Lake and Pungyen Gompa. Climb high, sleep low — do not skip this.',
    waypoints: [{ name: 'Sama Gaun', lat: 28.606, lng: 84.629, ele: 3530 }],
  },
  {
    id: 'stage-7',
    day: 7,
    date: '2026-09-25',
    from: 'Sama Gaun',
    to: 'Samdo',
    distanceKm: 8,
    ascentM: 380,
    descentM: 50,
    maxEleM: 3875,
    hours: '3–4 h',
    description:
      'A gentle high-valley walk above the tree line, following the Budhi Gandaki toward the ' +
      'Tibet border to Samdo, the last permanent village on the circuit.',
    waypoints: [
      { name: 'Sama Gaun', lat: 28.606, lng: 84.629, ele: 3530 },
      { name: 'Kermo Kharka', lat: 28.626, lng: 84.628, ele: 3700 },
      { name: 'Samdo', lat: 28.640, lng: 84.630, ele: 3860 },
    ],
  },
  {
    id: 'stage-8',
    day: 8,
    date: '2026-09-26',
    from: 'Samdo',
    to: 'Dharamsala (Larke Phedi)',
    distanceKm: 7,
    ascentM: 640,
    descentM: 40,
    maxEleM: 4460,
    hours: '3–4 h',
    description:
      'A short but important day to Dharamsala (Larke Phedi), a basic cluster of stone huts that ' +
      'is the staging camp below the pass. Rest, hydrate and sleep early.',
    waypoints: [
      { name: 'Samdo', lat: 28.640, lng: 84.630, ele: 3860 },
      { name: 'Larke Bazaar (ruins)', lat: 28.650, lng: 84.600, ele: 4090 },
      { name: 'Dharamsala (Larke Phedi)', lat: 28.657, lng: 84.575, ele: 4460 },
    ],
  },
  {
    id: 'stage-9',
    day: 9,
    date: '2026-09-27',
    from: 'Dharamsala',
    to: 'Bhimthang',
    distanceKm: 25,
    ascentM: 650,
    descentM: 1390,
    maxEleM: 5106,
    hours: '8–10 h',
    description:
      'The big day. A pre-dawn start up moraine to the prayer-flag-draped Larke La (5,106 m), ' +
      'then a long, knee-testing descent past glaciers to the meadows of Bhimthang.',
    waypoints: [
      { name: 'Dharamsala (Larke Phedi)', lat: 28.657, lng: 84.575, ele: 4460 },
      { name: 'Larke La Pass', lat: 28.671, lng: 84.508, ele: 5106 },
      { name: 'Bhimthang', lat: 28.648, lng: 84.451, ele: 3720 },
    ],
  },
  {
    id: 'stage-10',
    day: 10,
    date: '2026-09-28',
    from: 'Bhimthang',
    to: 'Dharapani',
    distanceKm: 25,
    ascentM: 120,
    descentM: 1980,
    maxEleM: 3720,
    hours: '7–8 h',
    description:
      'The final walk: down through rhododendron and pine forest along the Dudh Khola past ' +
      'Karche, Gho and Tilije, then Thonje to Dharapani — joining the Annapurna Circuit and the ' +
      'road head, where jeeps run to Besisahar and on to Kathmandu.',
    waypoints: [
      { name: 'Bhimthang', lat: 28.648, lng: 84.451, ele: 3720 },
      { name: 'Karche', lat: 28.598, lng: 84.418, ele: 2785 },
      { name: 'Gho', lat: 28.575, lng: 84.408, ele: 2515 },
      { name: 'Tilije', lat: 28.560, lng: 84.400, ele: 2300 },
      { name: 'Thonje', lat: 28.540, lng: 84.372, ele: 1965 },
      { name: 'Dharapani', lat: 28.523, lng: 84.362, ele: 1860 },
    ],
  },
];

/** Flattened, de-duplicated polyline of the whole route for the map. */
export const routeLine: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (const stage of stages) {
    for (const wp of stage.waypoints) {
      const last = pts[pts.length - 1];
      if (!last || last[0] !== wp.lat || last[1] !== wp.lng) {
        pts.push([wp.lat, wp.lng]);
      }
    }
  }
  return pts;
})();

/** All named waypoints across the route (for map markers). */
export const allWaypoints: Waypoint[] = (() => {
  const seen = new Set<string>();
  const out: Waypoint[] = [];
  for (const stage of stages) {
    for (const wp of stage.waypoints) {
      if (!seen.has(wp.name)) {
        seen.add(wp.name);
        out.push(wp);
      }
    }
  }
  return out;
})();

export const totalDistanceKm = stages.reduce((sum, s) => sum + s.distanceKm, 0);
export const highestPointM = Math.max(...stages.map((s) => s.maxEleM));
