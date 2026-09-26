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
    id: 'alert-2026-09-25-flights',
    level: 'warning',
    headline: 'Five airports closed as weather grounds domestic flights',
    summary:
      'Pokhara, Bharatpur, Lukla, Simara and Surkhet shut on Friday. Kathmandu kept operating on instruments but visibility was down to ~3 km. Matters for the flight home and for any helicopter plan.',
    source: 'The Kathmandu Post',
    url: 'https://kathmandupost.com/national/2026/09/25/poor-weather-disrupts-domestic-flights-as-five-airports-remain-closed',
    published: '2026-09-25',
    keyPoints: [
      'Closed Friday: POKHARA, Bharatpur, LUKLA, Simara and Surkhet.',
      'Kathmandu (TIA) still operating under Instrument Flight Rules; visual-rules flights hit by low visibility (~3 km at 6am and 10am).',
      'Sita Air cancelled all Friday flights; Tara Air and Summit Air held for a weather window.',
      '134 domestic departures were scheduled; the airport authority warned of cancellations, delays and reschedules.',
      'Advice: check status with the airline or airport before travelling — a helicopter out of Sama Gaun depends on the same weather.',
    ],
    body: [
      'Domestic flights were disrupted across Nepal on Friday as poor weather and reduced visibility forced the closure of five airports, including Lukla.',
      'According to Tribhuvan International Airport authorities, flights could not operate from Bharatpur, Pokhara, Lukla, Simara and Surkhet airports from early Friday.',
      'Flights at Tribhuvan International Airport were operating under Instrument Flight Rules (IFR), but services requiring Visual Flight Rules (VFR) were being affected by low visibility. Visibility at Kathmandu airport was around 3 kilometres at 6am and remained at roughly the same level by 10am.',
      'Flights to Lukla have been particularly affected, with tourists and other passengers waiting at Tribhuvan International Airport. Sita Air cancelled all its flights for Friday, while Tara Air and Summit Air were waiting for weather conditions to improve.',
      'According to the domestic flight schedule, 134 domestic departures were scheduled for Friday, including 58 by Buddha Air, 27 by Yeti Airlines, 23 by Shree Airlines, ten each by Summit Air and Tara Air, four by Sita Air and two by Nepal Airlines.',
      'The airport authority warned that some scheduled flights could be cancelled, delayed or rescheduled because of the adverse weather. Passengers have been advised to check the latest status of their flights with their airline or the airport before travelling.',
    ],
  },
  {
    id: 'alert-2026-09-25-flood',
    level: 'critical',
    headline: 'Gorkha named among 12 districts at HIGH flood risk',
    summary:
      'A Bay of Bengal low is driving the rain. Gorkha (where you are), plus Lamjung, Manang and Kaski, are on the high flood-risk list — that covers both ways out. The system was forecast to weaken within about a day.',
    source: 'The Kathmandu Post',
    url: 'https://kathmandupost.com/weather/2026/09/25/heavy-rain-flood-risk-rise-as-low-pressure-system-moves-across-nepal',
    published: '2026-09-25',
    keyPoints: [
      'HIGH flood risk in 12 districts including GORKHA (Sama Gaun), LAMJUNG, MANANG and KASKI — your location and both exit routes.',
      'Flash floods expected in small rivers: do not cross a swollen side-stream to save time.',
      'Heavy to very heavy rain forecast for Gandaki; one or two places could see extremely heavy rain.',
      'Moderate to heavy snowfall reported in mountainous districts.',
      'GOOD NEWS: the system was over Chhattisgarh and forecast to hold depression strength ~12 h, then weaken into a well-marked low — i.e. this should ease.',
      'Archale station in Palpa recorded over 187 mm in 24 hours; parts of Gandaki up to 100 mm.',
    ],
    body: [
      'A low-pressure system developing over the Bay of Bengal is bringing rain to much of Nepal, with heavy to very heavy downpours forecast in parts of Koshi, Bagmati, Gandaki, Lumbini and Karnali provinces on Friday, according to the Department of Hydrology and Meteorology.',
      'One or two places in Lumbini and Gandaki could receive extremely heavy rain, the department said.',
      'Meteorologist Rojan Lamichhane said the system would gradually move towards Nepal over the next two days, with effects more pronounced in Gandaki, Lumbini, Karnali and Sudurpaschim. Most of the rain would fall from Bagmati westwards.',
      'The Flood Forecasting Division warned that several small rivers could see moderate to high flood risks. The 12 districts identified as high risk are Gorkha, Lamjung, Kaski, Manang, Mustang, Dang, Banke, Bardiya, Surkhet, Dailekh, Kailali and Kanchanpur.',
      'River levels in small rivers flowing through these and surrounding districts are expected to rise significantly, with a high possibility of flash floods.',
      'Heavy rain was recorded at many locations in Koshi, Bagmati, Gandaki and Lumbini provinces over the past 24 hours. The Archale rainfall station in Palpa recorded more than 187 mm of rain; some locations in Lumbini, Gandaki and Bagmati received up to 100 mm. Moderate to heavy snowfall was also reported in mountainous districts.',
      'India’s Meteorological Department said the deep depression was expected to remain at depression strength for the next 12 hours, then weaken into a well-marked low-pressure area.',
    ],
  },
  {
    id: 'alert-2026-09-24-window',
    level: 'warning',
    headline: 'Bad-weather window is 25–27 Sep; agencies tell trekkers to stop and shelter',
    summary:
      'The trekking and expedition associations put a firm window on this: 25–27 September. New treks were told not to start, and anyone already out was told to stop moving and get somewhere safe. Improvement is possible after the 27th.',
    source: 'Everest Chronicle',
    url: 'https://everestchronicle.com/nepal-braces-for-heavy-rain-and-snow-as-autumn-tourism-takes-hit',
    published: '2026-09-24',
    keyPoints: [
      'THE WINDOW: government and forecasters flagged 25–27 September as the severe period. That is the number to plan around.',
      'Trekking Agencies’ Association of Nepal: do NOT start new treks 25–27 Sep; those already on route should stop travelling and move somewhere safe — which is what you are doing.',
      'Expedition Operators’ Association ordered climbers and staff on Manaslu and Dhaulagiri moved down to lower, safer ground.',
      'Night-time travel restricted on major highways because of landslide and flood risk.',
      'Caution on the pass: Mingma G warned deep snow could make upper mountains inaccessible for weeks — that is about summits, but it is a reason not to assume Larke La clears the moment the rain stops.',
      'Nepal Tourism Board issued a matching travel advisory.',
    ],
    body: [
      'Heavy rain and snowfall began across Nepal on Wednesday evening, as forecasters had warned, prompting authorities to step up preparations after a series of deadly floods and landslides earlier this year.',
      'The government has urged people to remain vigilant, particularly between September 25 and 27, when the weather system is expected to bring heavy to extremely heavy rain, thunderstorms, lightning and strong winds across much of the country.',
      'Authorities have restricted night-time travel on major highways because of the risk of landslides and flooding. People living near rivers have been warned to remain alert and be ready to move to safer ground.',
      'The National Disaster Risk Reduction and Management Authority said heavy rain could cause flooding, soil erosion, landslides and debris flows, and warned of heavy snowfall at high altitude and possible disruption to flights and road transport.',
      'The Expedition Operators’ Association Nepal issued an urgent safety warning advising organisers to move climbers and high-altitude workers to safer locations, applying to ongoing expeditions including Manaslu and Dhaulagiri.',
      'The Trekking Agencies’ Association of Nepal separately advised members and adventure tourists not to begin new trekking or mountaineering trips between September 25 and 27. Trekkers and support crews already on routes or in exposed areas such as riverbanks, steep slopes and landslide-prone terrain have been urged to stop travelling and move to safer locations.',
      'Senior mountain meteorologist Krishna Bhakta Manandhar said heavy weather was expected during 25-27 September over Nepal, most notably from the Dhaulagiri range eastwards over the entire mountain range.',
      'Mingma Gyalje Sherpa warned that prolonged snowfall could make the upper mountains inaccessible for weeks, describing the prospect of two metres of snow at base camp that Sherpas could not break trail through.',
      'Nepal issued 579 climbing permits for 10 mountains this autumn, including 493 for Manaslu.',
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
