// GETTING OUT — exit options from Sama Gaun, saved for OFFLINE reading.
//
// Status reflects the 26 Sep 2026 reporting saved in src/data/alerts.ts.
// Road and trail status in this valley changes daily: ALWAYS confirm with your
// guide, the lodge and the MCAP/army checkpost before committing to a plan.

export type RouteStatus = 'blocked' | 'restricted' | 'caution' | 'open' | 'unknown';

export interface ExitRoute {
  id: string;
  name: string;
  status: RouteStatus;
  statusNote: string;
  /** Rough time to reach a road head / airport. */
  timing: string;
  steps: string[];
  pros: string[];
  cons: string[];
}

export const EXIT_AS_OF = '2026-09-26';

export const exitRoutes: ExitRoute[] = [
  {
    id: 'exit-larke',
    name: 'Forward over Larke La → Bhimthang → Tilje → Dharapani',
    status: 'blocked',
    statusNote:
      'Manang district BANNED high-altitude trekking Fri–Sun, explicitly naming Bhimthang. The Chame–Besisahar road beyond Dharapani is also completely blocked by flood/landslide. Fresh snow is lying on the pass.',
    timing: 'Normally 3 days Sama Gaun → Dharapani, then ~8–10 h jeep to Kathmandu',
    steps: [
      'Sama Gaun → Samdo (8.1 km, ~3–4 h)',
      'Samdo → Dharamsala / Larke Phedi (6.1 km, ~3–4 h)',
      'Dharamsala → Larke La 5,106 m → Bhimthang (15.6 km, 8–10 h) — the committing day',
      'Bhimthang → Tilje → Dharapani (23.7 km, 7–8 h)',
      'Dharapani → Besisahar → Kathmandu by jeep (road currently blocked)',
    ],
    pros: [
      'Completes the circuit as planned',
      'Shortest walking distance to a road head once the pass is crossed',
    ],
    cons: [
      'Larke La after heavy snow is the highest-risk part of the whole trek: avalanche, whiteout, no shelter for 8–10 h',
      'Dharamsala is a handful of basic huts at 4,460 m — a bad place to be stuck if weather closes in',
      'Even after crossing, the onward road from Dharapani is blocked, so you may be stranded on the far side',
      'Trekking to Bhimthang is currently prohibited by the Manang administration',
    ],
  },
  {
    id: 'exit-back',
    name: 'Turn around — walk back down the Budhi Gandaki',
    status: 'caution',
    statusNote:
      'This is the direction authorities are pointing trekkers (descend to lower, safer elevations). But MCAP warns of landslides, rockfall and damaged bridges on this trail through 27 Sep, and a flood already took out a crossing at Therang Khola this month.',
    timing: '4–5 days walking to Machha Khola, then jeep to Kathmandu',
    steps: [
      'Sama Gaun → Lho / Lihi (retrace, losing altitude fast — the right direction in bad weather)',
      'Lihi → Ghap → Deng',
      'Deng → Jagat → Machha Khola',
      'A rough jeep road now runs well up the Budhi Gandaki — how far it is drivable changes constantly. Ask at each village; you may be able to shorten this by a day or more.',
      'Machha Khola / Soti Khola / Arughat → Kathmandu by jeep (via Dhading — Prithvi Highway is disrupted, expect long delays)',
    ],
    pros: [
      'Loses altitude immediately — the standard advice in this weather',
      'Teahouses, food and shelter the whole way; never committing to a high pass',
      'You can stop and wait anywhere if it worsens',
      'Follows the official advice to descend rather than go higher',
    ],
    cons: [
      'Several days of walking in rain, on a trail with landslide and rockfall risk',
      'Bridges and crossings can wash out — may mean waiting for repairs',
      'Prithvi Highway into Kathmandu is itself damaged and restricted',
      'Does not complete the circuit',
    ],
  },
  {
    id: 'exit-heli',
    name: 'Helicopter out from Sama Gaun',
    status: 'restricted',
    statusNote:
      'Sama Gaun is a normal helicopter pickup point with a landing area, but nothing flies in this weather. Flights resume only in a clear window — often early morning. Lukla flights were already suspended and Khumbu was moving people by heli when weather allowed.',
    timing: '~1 h to Kathmandu once a weather window opens',
    steps: [
      'Your guide / agency arranges it — they have the operator contacts and will negotiate a seat or a share.',
      'Check your travel insurance FIRST: many policies cover evacuation only when it is medically necessary, not for convenience or a missed flight.',
      'Expect roughly US$2,000–4,500 for a charter to Kathmandu, commonly shared between 4–5 passengers. Confirm the price and who pays before lifting off.',
      'Have cash or a card ready — operators often want payment secured up front.',
      'Be packed and ready at first light: windows open and close within minutes.',
    ],
    pros: [
      'By far the fastest way out and avoids both the pass and the damaged roads',
      'Bypasses every blocked highway',
      'Genuinely the right answer if anyone becomes ill or injured',
    ],
    cons: [
      'Completely weather-dependent — may not fly for days',
      'Expensive if not covered by insurance',
      'Demand spikes when many trekkers are stuck; expect a queue',
    ],
  },
];

/** Road sections that matter for getting home, as reported 26 Sep 2026. */
export const roadStatus: { road: string; status: RouteStatus; note: string }[] = [
  {
    road: 'Chame – Besisahar (Manang ↔ Lamjung)',
    status: 'blocked',
    note: 'COMPLETELY BLOCKED by flood/landslide. This is the road out from Dharapani — the far side of Larke La.',
  },
  {
    road: 'Prithvi Highway (Kathmandu ↔ west / Mugling)',
    status: 'restricted',
    note: 'Damaged at several points. Dhading has fully stopped traffic at Parewabhir, Kamerobhir and Chalise. Single-lane near Kurintar. Mud at Krishnabhir.',
  },
  {
    road: 'Mugling – Narayanghat – Pokhara',
    status: 'open',
    note: 'Reported open and lower-risk as of Friday — the better way round if you reach Pokhara side.',
  },
  {
    road: 'Nagdhunga – Mugling',
    status: 'blocked',
    note: 'Completely blocked by flood/landslide per police headquarters.',
  },
  {
    road: 'Budhi Gandaki jeep road (Arughat → up-valley)',
    status: 'unknown',
    note: 'A rough road has been pushed well up the valley and keeps extending. Drivable distance changes weekly and with every flood — ask locally at each village.',
  },
];

/** Practical things worth having written down when there is no signal. */
export const stuckChecklist: string[] = [
  'Stay put while the warning stands — the official advice is do not go higher, wait somewhere safe. Sama Gaun (3,530 m) with lodges and food is a good place to be stuck.',
  'Tell someone at home your plan and check in daily if you get any signal. Agree what happens if they do not hear from you.',
  'Ration cash. Lodges charge more when trekkers are stuck and there is no ATM until Kathmandu.',
  'Charge everything whenever power is on, and keep a power bank for the phone with the offline maps.',
  'Keep drinking and eating properly — appetite drops at altitude, and dehydration mimics and worsens AMS.',
  'Watch each other for AMS: worsening headache, nausea, breathlessness at rest, poor balance. If it appears, DESCEND — that is not a wait-and-see situation.',
  'Do not cross a flooding side-stream or a damaged bridge to save a day. This valley has already lost bridges this month.',
  'Keep your permits, passport and insurance policy number photographed and stored on the phone.',
];
