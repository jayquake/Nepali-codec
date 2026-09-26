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

import { routeGeometry } from './routeGeometry.generated';

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
      { name: 'Machha Khola', lat: 28.2293, lng: 84.8738, ele: 900 },
      { name: 'Khorlabesi', lat: 28.2544, lng: 84.8831, ele: 970 },
      { name: 'Tatopani (hot spring)', lat: 28.2757, lng: 84.8985, ele: 990 },
      { name: 'Dobhan', lat: 28.2955, lng: 84.9059, ele: 1070 },
      { name: 'Yaru', lat: 28.3254, lng: 84.9081, ele: 1170 },
      { name: 'Jagat', lat: 28.3514, lng: 84.8959, ele: 1340 },
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
      { name: 'Jagat', lat: 28.3514, lng: 84.8959, ele: 1340 },
      { name: 'Sirdibas', lat: 28.3809, lng: 84.8891, ele: 1420 },
      { name: 'Philim', lat: 28.3933, lng: 84.8966, ele: 1590 },
      { name: 'Ekle Bhatti', lat: 28.4091, lng: 84.8945, ele: 1600 },
      { name: 'Deng', lat: 28.4791, lng: 84.867, ele: 1860 },
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
      { name: 'Deng', lat: 28.4791, lng: 84.867, ele: 1860 },
      { name: 'Ghap', lat: 28.5312, lng: 84.8257, ele: 2160 },
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
      { name: 'Ghap', lat: 28.5312, lng: 84.8257, ele: 2160 },
      { name: 'Namrung', lat: 28.5451, lng: 84.7679, ele: 2630 },
      { name: 'Lihi', lat: 28.5613, lng: 84.7383, ele: 2920 },
    ],
  },
  {
    id: 'stage-5',
    day: 5,
    date: '2026-09-23',
    from: 'Lihi',
    to: 'Shyala',
    distanceKm: 10,
    ascentM: 620,
    descentM: 90,
    maxEleM: 3500,
    hours: '4–5 h',
    description:
      'Through Sho and Lho (hilltop Ribung Gompa, sunset on Manaslu) to Shyala, ringed by ' +
      'Himalchuli, Manaslu and Ngadi Chuli. Night at Shyala.',
    waypoints: [
      { name: 'Lihi', lat: 28.5613, lng: 84.7383, ele: 2920 },
      { name: 'Lho', lat: 28.574, lng: 84.702, ele: 3180 },
      { name: 'Shyala', lat: 28.5742, lng: 84.6726, ele: 3500 },
    ],
  },
  {
    id: 'stage-11',
    day: 6,
    date: '2026-09-24',
    from: 'Shyala',
    to: 'Sama Gaun',
    distanceKm: 3,
    ascentM: 90,
    descentM: 60,
    maxEleM: 3530,
    hours: '1–2 h',
    description:
      'Short walk up the valley to Sama Gaun / Samagaon, the big Tibetan-style village that is ' +
      'the acclimatisation hub for Manaslu Base Camp and Birendra Lake.',
    waypoints: [
      { name: 'Shyala', lat: 28.5742, lng: 84.6726, ele: 3500 },
      { name: 'Sama Gaun', lat: 28.5847, lng: 84.644, ele: 3530 },
    ],
  },
  {
    id: 'stage-6',
    day: 7,
    date: '2026-09-25',
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
    waypoints: [{ name: 'Sama Gaun', lat: 28.5847, lng: 84.644, ele: 3530 }],
  },
  {
    id: 'stage-7',
    day: 8,
    date: '2026-09-27',
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
      { name: 'Sama Gaun', lat: 28.5847, lng: 84.644, ele: 3530 },
      { name: 'Samdo', lat: 28.6509, lng: 84.6341, ele: 3860 },
    ],
  },
  {
    id: 'stage-8',
    day: 9,
    date: '2026-09-28',
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
      { name: 'Samdo', lat: 28.6509, lng: 84.6341, ele: 3860 },
      { name: 'Dharamsala (Larke Phedi)', lat: 28.659, lng: 84.5843, ele: 4460 },
    ],
  },
  {
    id: 'stage-9',
    day: 10,
    date: '2026-09-29',
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
      { name: 'Dharamsala (Larke Phedi)', lat: 28.659, lng: 84.5843, ele: 4460 },
      { name: 'Larke La Pass', lat: 28.6639, lng: 84.5203, ele: 5106 },
      { name: 'Bhimthang', lat: 28.6338, lng: 84.4713, ele: 3720 },
    ],
  },
  {
    id: 'stage-10',
    day: 11,
    date: '2026-09-30',
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
      { name: 'Bhimthang', lat: 28.6338, lng: 84.4713, ele: 3720 },
      { name: 'Gho', lat: 28.5684, lng: 84.4032, ele: 2515 },
      { name: 'Thonje', lat: 28.5272, lng: 84.3541, ele: 1965 },
      { name: 'Dharapani', lat: 28.519, lng: 84.3584, ele: 1860 },
    ],
  },
];

/**
 * Flattened polyline of the whole route for the map. Prefers the trail-snapped
 * geometry generated by scripts/build-route.mjs (real OSM foot paths); falls back
 * to the raw waypoints for any stage without generated geometry.
 */
export const routeLine: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const push = (lat: number, lng: number) => {
    const last = pts[pts.length - 1];
    if (!last || last[0] !== lat || last[1] !== lng) pts.push([lat, lng]);
  };
  for (const stage of stages) {
    const geo = routeGeometry[stage.id];
    if (geo?.line?.length) {
      for (const [lat, lng] of geo.line) push(lat, lng);
    } else {
      for (const wp of stage.waypoints) push(wp.lat, wp.lng);
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

/**
 * Measured trail distance for a stage (from the routed OSM geometry), falling back
 * to the planned estimate. Rest days stay at 0.
 */
export function stageDistanceKm(stage: Stage): number {
  if (stage.distanceKm === 0) return 0;
  return routeGeometry[stage.id]?.distanceKm ?? stage.distanceKm;
}

/** Measured ascent / descent for a stage, falling back to the planned estimate. */
export function stageGains(stage: Stage): { ascentM: number; descentM: number } {
  const geo = routeGeometry[stage.id];
  if (stage.distanceKm === 0 || !geo) return { ascentM: stage.ascentM, descentM: stage.descentM };
  return { ascentM: geo.ascentM, descentM: geo.descentM };
}

export const totalDistanceKm = stages.reduce((sum, s) => sum + stageDistanceKm(s), 0);
export const highestPointM = Math.max(...stages.map((s) => s.maxEleM));
