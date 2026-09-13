// Post-trek ideas for the Kathmandu buffer window (30 Sep–2 Oct). The drive out
// (Dharapani → Besisahar → Kathmandu) passes prime wind-down spots.

export interface AfterIdea {
  name: string;
  tag: string;
  what: string;
  stay?: string;
  mapsQuery: string;
}

export const afterTrekIntro =
  'Your drive out (Dharapani → Besisahar → Kathmandu) passes prime wind-down spots. With 30 Sep–2 Oct open, you could overnight somewhere beautiful instead of heading straight back.';

export const afterTrek: AfterIdea[] = [
  {
    name: 'Bandipur',
    tag: 'Hilltop Newari town · ~1.5 h from Besisahar',
    what:
      'Car-free cobbled main street, easy countryside walks and viewpoints (Tundikhel, Thani Mai temple). On a clear day, balcony views of Dhaulagiri, Annapurna and Manaslu. The ideal first-night decompress, right on the drive back.',
    stay: 'The Old Inn · Three Mountain Lodge (8,000 m views from the balcony)',
    mapsQuery: 'Bandipur, Nepal',
  },
  {
    name: 'Pokhara',
    tag: 'Lakeside R&R · ~2.5–3 h from Besisahar',
    what:
      'Phewa Lake boating, lakeside cafés, paragliding, the World Peace Pagoda and Sarangkot sunrise over Annapurna — Nepal’s adventure capital and the classic post-trek reward. You can fly Pokhara → Kathmandu (~25 min) to skip the drive.',
    stay: 'Lakeside (Baidam) hotels & resorts',
    mapsQuery: 'Pokhara Lakeside, Nepal',
  },
  {
    name: 'Nagarkot',
    tag: 'Sunrise ridge · ~1.5 h east of Kathmandu',
    what:
      'Himalayan sunrise from a hill-resort on the valley rim — an easy, scenic last night before flying out. Pair it with Bhaktapur on the way up or down.',
    stay: 'Ridge-view resorts',
    mapsQuery: 'Nagarkot, Nepal',
  },
  {
    name: 'Bhaktapur & Patan',
    tag: 'Heritage cities · in the Kathmandu valley',
    what:
      'Two medieval Durbar Square cities — pottery square, Newari architecture, temples and great souvenirs. A low-effort culture day that fits any buffer day.',
    mapsQuery: 'Bhaktapur Durbar Square, Nepal',
  },
  {
    name: 'Chitwan National Park',
    tag: 'Jungle safari · bigger detour (~5–6 h south)',
    what:
      'Rhinos, elephants, birdlife and jungle lodges — a warm-lowland change of pace. Only worth it if you want to spend most of the buffer down there.',
    mapsQuery: 'Chitwan National Park, Nepal',
  },
];

export interface LuxuryStay {
  name: string;
  location: string;
  tag: string;
  what: string;
  mapsQuery: string;
}

export const luxuryIntro =
  'Reward for the Larkya La: comfortable 5-star stays with a pool & spa to unwind. Book ahead in peak season.';

export const luxuryStays: LuxuryStay[] = [
  {
    name: 'Hyatt Regency Kathmandu',
    location: 'Kathmandu · near Boudhanath',
    tag: '5-star · large outdoor pool · spa',
    what: 'Resort-style grounds with a big pool and spa, a short drive from the airport — the easiest, most comfortable post-trek reward in the city.',
    mapsQuery: 'Hyatt Regency Kathmandu',
  },
  {
    name: 'Dwarika’s Hotel',
    location: 'Kathmandu',
    tag: 'Heritage luxury · courtyard pool · spa',
    what: 'Nepal’s most iconic heritage hotel — salvaged Newari woodwork, a beautiful pool and the Fusion spa (Michelin Key). The signature splurge.',
    mapsQuery: "Dwarika's Hotel Kathmandu",
  },
  {
    name: 'Dwarika’s Resort Dhulikhel',
    location: 'Dhulikhel · ~1 h from Kathmandu',
    tag: 'Wellness resort · pool · Himalayan sunrise',
    what: 'A hillside wellness retreat with pool, spa and sunrise mountain views — the most relaxing decompress if you want out of the city.',
    mapsQuery: "Dwarika's Resort Dhulikhel",
  },
  {
    name: 'Temple Tree Resort & Spa',
    location: 'Pokhara · Lakeside',
    tag: 'Pool & spa · lakeside · comfortable',
    what: 'Relaxed lakeside resort with a lovely pool and spa in the heart of Pokhara Lakeside — great-value comfort by Phewa Lake.',
    mapsQuery: 'Temple Tree Resort and Spa Pokhara',
  },
  {
    name: 'Tiger Mountain Pokhara Lodge',
    location: 'Above Pokhara',
    tag: 'Hilltop · infinity pool · Annapurna views',
    what: 'Award-winning ridge lodge with an infinity pool and panoramic Annapurna views — the premier Pokhara splurge, away from the crowds.',
    mapsQuery: 'Tiger Mountain Pokhara Lodge',
  },
];

export function placeMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
