// Manaslu Circuit Trek — route data.
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
  'A ~14-day teahouse circuit around Mt. Manaslu (8,163 m), the world’s 8th-highest ' +
  'peak, crossing the Larke La pass (5,106 m). A restricted area: Restricted Area Permit ' +
  '(RAP) + Manaslu (MCAP) + Annapurna (ACAP) permits and a registered guide are required.';

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
    from: 'Soti Khola',
    to: 'Machha Khola',
    distanceKm: 14,
    ascentM: 380,
    descentM: 210,
    maxEleM: 930,
    hours: '5–6 h',
    description:
      'Warm, low-altitude start along the Budhi Gandaki through Sal forest and rice terraces, ' +
      'crossing suspension bridges to the riverside village of Machha Khola.',
    waypoints: [
      { name: 'Soti Khola', lat: 28.293, lng: 84.876, ele: 730 },
      { name: 'Khursane', lat: 28.316, lng: 84.884, ele: 810 },
      { name: 'Machha Khola', lat: 28.348, lng: 84.895, ele: 900 },
    ],
  },
  {
    id: 'stage-2',
    day: 2,
    from: 'Machha Khola',
    to: 'Jagat',
    distanceKm: 22,
    ascentM: 640,
    descentM: 200,
    maxEleM: 1410,
    hours: '6–7 h',
    description:
      'Past the hot springs at Tatopani, up stone staircases to Dobhan and Yaru, then a climb ' +
      'to the flagstone-paved village of Jagat, where the restricted-area permit is checked.',
    waypoints: [
      { name: 'Machha Khola', lat: 28.348, lng: 84.895, ele: 900 },
      { name: 'Tatopani (hot spring)', lat: 28.374, lng: 84.888, ele: 990 },
      { name: 'Dobhan', lat: 28.408, lng: 84.878, ele: 1070 },
      { name: 'Jagat', lat: 28.451, lng: 84.858, ele: 1340 },
    ],
  },
  {
    id: 'stage-3',
    day: 3,
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
    id: 'stage-4',
    day: 4,
    from: 'Deng',
    to: 'Namrung',
    distanceKm: 19,
    ascentM: 980,
    descentM: 210,
    maxEleM: 2660,
    hours: '6–7 h',
    description:
      'Cross to the north bank at Ghap and enter Buddhist country — mani walls, prayer ' +
      'wheels and pine forest — climbing to the permit checkpoint at Namrung with first ' +
      'glimpses of the high peaks.',
    waypoints: [
      { name: 'Deng', lat: 28.523, lng: 84.845, ele: 1860 },
      { name: 'Ghap', lat: 28.530, lng: 84.803, ele: 2160 },
      { name: 'Namrung', lat: 28.541, lng: 84.797, ele: 2630 },
    ],
  },
  {
    id: 'stage-5',
    day: 5,
    from: 'Namrung',
    to: 'Lho',
    distanceKm: 10,
    ascentM: 620,
    descentM: 70,
    maxEleM: 3180,
    hours: '3–4 h',
    description:
      'A shorter day through Lihi and Sho with big views. Lho offers a stunning sunset on ' +
      'Manaslu and the hilltop Ribung Gompa — an important acclimatisation step.',
    waypoints: [
      { name: 'Namrung', lat: 28.541, lng: 84.797, ele: 2630 },
      { name: 'Lihi', lat: 28.552, lng: 84.768, ele: 2920 },
      { name: 'Lho', lat: 28.573, lng: 84.740, ele: 3180 },
    ],
  },
  {
    id: 'stage-6',
    day: 6,
    from: 'Lho',
    to: 'Samagaon',
    distanceKm: 8,
    ascentM: 420,
    descentM: 70,
    maxEleM: 3530,
    hours: '3–4 h',
    description:
      'Through Shyala, ringed by Himalchuli, Manaslu and Ngadi Chuli, to the large Tibetan-style ' +
      'village of Samagaon — the hub for acclimatisation and side trips.',
    waypoints: [
      { name: 'Lho', lat: 28.573, lng: 84.740, ele: 3180 },
      { name: 'Shyala', lat: 28.590, lng: 84.662, ele: 3500 },
      { name: 'Samagaon', lat: 28.606, lng: 84.629, ele: 3530 },
    ],
  },
  {
    id: 'stage-7',
    day: 7,
    from: 'Samagaon',
    to: 'Samagaon (acclimatisation)',
    distanceKm: 0,
    ascentM: 0,
    descentM: 0,
    maxEleM: 4400,
    hours: 'Rest day',
    description:
      'Acclimatisation day. Options: day hike to Manaslu Base Camp (~4,800 m) or the turquoise ' +
      'Birendra Lake and Pungyen Gompa. Climb high, sleep low — do not skip this.',
    waypoints: [{ name: 'Samagaon', lat: 28.606, lng: 84.629, ele: 3530 }],
  },
  {
    id: 'stage-8',
    day: 8,
    from: 'Samagaon',
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
      { name: 'Samagaon', lat: 28.606, lng: 84.629, ele: 3530 },
      { name: 'Kermo Kharka', lat: 28.626, lng: 84.628, ele: 3700 },
      { name: 'Samdo', lat: 28.640, lng: 84.630, ele: 3860 },
    ],
  },
  {
    id: 'stage-9',
    day: 9,
    from: 'Samdo',
    to: 'Samdo (acclimatisation)',
    distanceKm: 0,
    ascentM: 0,
    descentM: 0,
    maxEleM: 4900,
    hours: 'Rest day',
    description:
      'Second acclimatisation day. A hike toward the Rui La pass on the old Tibet trade route ' +
      '(~4,900 m) prepares the body for the Larke La crossing.',
    waypoints: [{ name: 'Samdo', lat: 28.640, lng: 84.630, ele: 3860 }],
  },
  {
    id: 'stage-10',
    day: 10,
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
    id: 'stage-11',
    day: 11,
    from: 'Dharamsala',
    to: 'Bimthang',
    distanceKm: 25,
    ascentM: 650,
    descentM: 1390,
    maxEleM: 5106,
    hours: '8–10 h',
    description:
      'The big day. A pre-dawn start up moraine to the prayer-flag-draped Larke La (5,106 m), ' +
      'then a long, knee-testing descent past glaciers to the meadows of Bimthang.',
    waypoints: [
      { name: 'Dharamsala (Larke Phedi)', lat: 28.657, lng: 84.575, ele: 4460 },
      { name: 'Larke La Pass', lat: 28.671, lng: 84.508, ele: 5106 },
      { name: 'Bimthang', lat: 28.648, lng: 84.451, ele: 3720 },
    ],
  },
  {
    id: 'stage-12',
    day: 12,
    from: 'Bimthang',
    to: 'Tilije',
    distanceKm: 25,
    ascentM: 120,
    descentM: 1540,
    maxEleM: 3720,
    hours: '6–7 h',
    description:
      'Descend through rhododendron and pine forest along the Dudh Khola, past Karche and Gho, ' +
      'to the Gurung village of Tilije with its apple orchards and lower, warmer air.',
    waypoints: [
      { name: 'Bimthang', lat: 28.648, lng: 84.451, ele: 3720 },
      { name: 'Karche', lat: 28.598, lng: 84.418, ele: 2785 },
      { name: 'Gho', lat: 28.575, lng: 84.408, ele: 2515 },
      { name: 'Tilije', lat: 28.560, lng: 84.400, ele: 2300 },
    ],
  },
  {
    id: 'stage-13',
    day: 13,
    from: 'Tilije',
    to: 'Dharapani',
    distanceKm: 9,
    ascentM: 120,
    descentM: 560,
    maxEleM: 2300,
    hours: '2–3 h',
    description:
      'A short final walk to Dharapani, joining the Annapurna Circuit and the road head. From ' +
      'here jeeps run to Besisahar and on to Kathmandu or Pokhara.',
    waypoints: [
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
