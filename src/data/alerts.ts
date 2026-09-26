// TRAVEL ALERTS — saved for OFFLINE reading.
//
// Full article text is baked into the bundle on purpose: on the trail there is
// often no data, so the app must still show the whole story after a refresh.
// Refreshed by scripts/fetch-news.mjs on each deploy; this file is the offline
// fallback that always ships.

export type AlertLevel = 'critical' | 'warning' | 'info';

export interface SavedArticle {
  id: string;
  level: AlertLevel;
  headline: string;
  summary: string;
  source: string;
  url: string;
  published: string; // ISO date
  /** Bullet points — the operative facts, readable at a glance. */
  keyPoints: string[];
  /** Full saved text so it can be read with no connection. */
  body: string[];
}

/** Shown as the banner headline while still relevant. */
export const ALERT_VALID_UNTIL = '2026-09-29';

export const alerts: SavedArticle[] = [
  {
    id: 'alert-2026-09-26-roads',
    level: 'critical',
    headline: 'Heavy rain cuts roads to Kathmandu; trekking suspended in places',
    summary:
      'Three days of rain have blocked or restricted major highways. Manang has banned high-altitude trekking Fri–Sun (incl. Bhimthang). Manaslu Conservation Area warns of heavy rain through 27 Sep.',
    source: 'The Kathmandu Post',
    url: 'https://kathmandupost.com/national/2026/09/26/heavy-rains-cut-off-key-roads-to-kathmandu',
    published: '2026-09-26',
    keyPoints: [
      'CHAME–BESISAHAR ROAD (Manang–Lamjung) COMPLETELY BLOCKED by flood/landslide — this is the jeep road out from Dharapani.',
      'Manang district BANNED trekking in high-altitude areas Fri–Sun, explicitly including BHIMTHANG, Thorong La, Tilicho and Kang La.',
      'Manaslu Conservation Area Project warns of heavy to very heavy rain through 27 Sep: landslides, rockfall, rising rivers, damage to trails and bridges.',
      'Movement along parts of the Manaslu trekking route has been restricted by authorities.',
      'Snowfall reported in SAMDO on Friday morning; snow above Manaslu Base Camp for ~2 weeks.',
      'Prithvi Highway (Kathmandu–west) damaged at several points; Dhading has fully stopped traffic on sections at Parewabhir, Kamerobhir and Chalise.',
      'Trekkers already on trails told NOT to go higher and to stay in a safe place until conditions improve.',
    ],
    body: [
      'Three days of continuous rain have disrupted several major road links to Kathmandu, with floods and landslides blocking or damaging highways and forcing authorities to halt traffic on several routes.',
      'The Prithvi Highway, a major road connecting Kathmandu with western Nepal, has been affected at several locations, while flooding has washed away newly built diversions on the BP Highway in Kavrepalanchok.',
      'The District Administration Office in Dhading has completely stopped traffic on sections of the Prithvi Highway, citing the risk of landslides at Parewabhir, Kamerobhir and Chalise areas. Authorities said traffic would resume after the rain subsides and obstructions are cleared.',
      'Police headquarters said several other roads had been completely blocked by floods and landslides, including the Nagdhunga-Mugling road, the Hetauda-Bhimphedi-Kathmandu road, the BP Highway in Kavrepalanchok, and THE CHAME-BESISAHAR ROAD connecting Manang and Lamjung districts.',
      'The prolonged rain has brought snowfall to higher elevations, prompting authorities to suspend trekking in parts of the mountain trails.',
      'In Manang, the district administration has banned trekking in high-altitude areas for three days, from Friday to Sunday, as rain and snowfall continue across the upper reaches. The restrictions cover popular destinations and passes including Tilicho Lake, Thorong La, Ice Lake, Kang La and Bhimthang. Tourists already on the trails have been told not to proceed to higher elevations and to remain in safe locations until conditions improve.',
      'The weather has also disrupted trekking along the Manaslu trail. Snowfall has continued above Manaslu Base Camp for about two weeks and affected mountaineering activities, while heavy rain since Thursday has led authorities to restrict movement along parts of the trekking route.',
      'The Manaslu Conservation Area Project, citing a special weather bulletin, has warned of possible heavy to very heavy rain through September 27, with risks of landslides, rockfalls, rising river levels and damage to trails and bridges.',
      'The Annapurna Conservation Area Project reported light snowfall in Manang and rain in several popular trekking areas.',
      'In Gorkha, snowfall was reported for a short period on Friday morning in Samdo, while temperatures have fallen following the snowfall.',
      'Authorities have urged tourists and trekkers to follow instructions from local administrations, conservation areas, and security agencies and to remain in safe locations until conditions improve.',
    ],
  },
  {
    id: 'alert-2026-09-23-met',
    level: 'warning',
    headline: 'Met office: suspend Himalayan treks, avoid long-distance travel',
    summary:
      'Weather experts urged trekkers already in the mountains to descend to safer, lower elevations and asked the public to avoid long-distance travel Friday to Sunday.',
    source: 'The Kathmandu Post',
    url: 'https://kathmandupost.com/weather/2026/09/23/avoid-long-distance-travel-from-friday-to-sunday-suspend-himalayan-treks-met-office',
    published: '2026-09-23',
    keyPoints: [
      'Met office advised SUSPENDING Himalayan treks for the Friday–Sunday window.',
      'Trekkers already in the mountains urged to return to safer, LOWER elevations.',
      'Public advised to avoid long-distance road travel across the country.',
    ],
    body: [
      'Nepal’s meteorological office urged trekkers already in the mountains to return to safer, lower elevations, and asked the public to avoid long-distance travel from Friday to Sunday.',
      'The advisory followed a special weather bulletin warning of heavy rain across much of the country, with snowfall at higher elevations.',
      'Trekking agencies were asked to suspend departures into high Himalayan terrain until the system passes.',
    ],
  },
  {
    id: 'alert-2026-09-06-therang',
    level: 'info',
    headline: 'Manaslu route reopened after flood damage at Therang Khola',
    summary:
      'An earlier flood cut a key section of the Manaslu Circuit at Therang Khola; locals rebuilt the crossing and the route reopened. Useful background on how quickly crossings can go and be restored.',
    source: 'Everest Chronicle',
    url: 'https://everestchronicle.com/manaslu-trekking-route-reopens-after-locals-rebuild-flood-damaged-crossing',
    published: '2026-09-06',
    keyPoints: [
      'Flooding in Therang Khola swept away four homes and two bridges, cutting the circuit.',
      'Locals rebuilt the crossing and the route reopened within days.',
      'Bridges and crossings in this valley can fail fast in heavy rain — check locally before committing to a stage.',
    ],
    body: [
      'Heavy overnight rain triggered flooding in Therang Khola, cutting a key section of the Manaslu Circuit as locals raced to restore access.',
      'Four homes and two bridges were swept away in the Manaslu region.',
      'The trekking route later reopened after locals rebuilt the flood-damaged crossing.',
    ],
  },
];
