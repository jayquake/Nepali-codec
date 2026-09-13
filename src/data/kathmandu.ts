// Kathmandu arrival & base briefing — pre/post-trek logistics.
// Edit freely as plans firm up.

export const arrival = {
  flight: 'FZ573 (flydubai) · DXB → KTM',
  date: 'Wed 16 Sep 2026',
  landing: 'Lands ~00:55 Thu 17 Sep (Kathmandu time) — just before 1 am.',
  outBy: 'Outside the terminal ~01:45–02:00 after visa-on-arrival + baggage.',
  action:
    'Book the hotel for the night of WED 16 SEP (not the 17th). Give the hotel your flight number and say arrival ~02:00.',
  timeDiff:
    'Nepal is UTC+5:45 — 2h45m ahead of Israel. (Depart 17:40 IL = 18:40 Dubai; arrive 22:10 IL = 00:55 Thu, Kathmandu time.)',
};

export interface TransportOption {
  name: string;
  detail: string;
  tag?: 'best' | 'avoid';
}

export const transport: TransportOption[] = [
  {
    name: 'Hotel pickup',
    detail: 'Many hotels offer it — the best option for a 2 am arrival. Arrange in advance.',
    tag: 'best',
  },
  {
    name: 'Prepaid taxi counter (inside arrivals)',
    detail:
      '~NPR 900 to Thamel, ~NPR 1,000 to Lazimpat/Paknajol/Chhetrapati. Fixed voucher price. +NPR 100 after 21:00, +25% for AC. Easiest walk-up.',
    tag: 'best',
  },
  {
    name: 'Ride apps (Pathao / InDrive / Yango)',
    detail: '~NPR 350–500, but needs mobile data and a walk out to the ring road. Not ideal at 2 am.',
  },
  {
    name: 'Car-park taxis / touts',
    detail: 'Up to NPR 2,000 — avoid. Licensed taxis have GREEN plates; avoid red-plate private cars.',
    tag: 'avoid',
  },
];

export const transportNote =
  'Airport is ~5–6 km from Thamel. Travel 20–30 min off-peak, up to 1 hr between 10 am–7 pm. Bring rupees — change a little at the airport.';

export const sleepIntro =
  'Core Thamel (Thamel Marg, JP Road, Chaksibari) has bars with live music until 1–2 am and narrow, echoing streets. Stay on the fringe: Paknajol, Jyatha or Chhetrapati.';

export interface KtmHotel {
  name: string;
  area: string;
  rating?: string;
  reviews?: string;
  notes: string;
  best?: boolean;
  booked?: boolean;
  address?: string;
  website?: string;
  phone?: string; // e.g. '+977-1-xxxxxxx'
  email?: string;
}

export const ktmHotels: KtmHotel[] = [
  {
    name: 'Vastu Boutique Hotel',
    area: 'Chhusya Galli, Jyatha (Thamel) · quiet cul-de-sac, 2 min to Thamel · 9.6/10',
    notes:
      'Our booking. Right by the agencies on Jyatha. Rooftop terrace + lift, free breakfast, AC rooms with rainfall showers, wifi, luggage storage, on-site ATM & restaurant.',
    booked: true,
    address: 'Chhusya Galli, Jyatha-27, Thamel, 44600 Kathmandu',
    website: 'https://www.vastuhotel.com/',
    // phone/email: add once confirmed (their site was down when I checked).
  },
  {
    name: 'Arushi Boutique Hotel',
    area: 'Kunphen Marg, Chhetrapati',
    rating: '4.6',
    reviews: '1,140',
    notes: 'Quiet secluded alleyway, rooftop restaurant. ~8 min walk to Jyatha. Best all-round.',
    best: true,
  },
  {
    name: 'Himalayan Suite Hotel',
    area: 'North of Thamel',
    notes: 'Open 24h, quiet, stores luggage during treks. 12–15 min walk.',
  },
  {
    name: 'Hotel Sohum',
    area: 'Kaldhara Height, Paknajol',
    rating: '4.7',
    notes: 'Newer build, peaceful street, 24/7 hot water, very cheap.',
  },
  {
    name: 'Nepali Heritage Hotel',
    area: 'Paknajol',
    rating: '4.9',
    notes: 'Rooftop, right by the gear shops. Caveat: thin walls.',
  },
  {
    name: 'Asian Boutique Hotel',
    area: 'JP Road',
    notes: 'Remodelled spring 2026, lift, AC, 24h reception.',
  },
  {
    name: 'Hotel Premium',
    area: 'Paknajol Rd',
    rating: '4.1',
    notes: 'Quiet per reviewers. Lower rating; issues are hot water and no lift.',
  },
];

export const bookingTips = [
  'Ask for a back or upper-floor room, courtyard-facing.',
  'Scan recent reviews for “noise” or “music” specifically.',
  'Reconfirm by email/WhatsApp the day before, restating the 2 am arrival.',
  'Consider a nicer hotel for AFTER the trek rather than before.',
];

export const agencyIntro =
  'Trekking agencies cluster in Thamel — the district is ~1 km across, so any fringe hotel is a ~10-min walk from every office.';

export const agencyAreas = [
  { area: 'Jyatha · Amrit Marg', note: 'Heavy concentration of offices' },
  { area: 'Tridevi Marg', note: 'Larger, established operators' },
  { area: 'Chhetrapati · Paknajol', note: 'West side, more budget' },
  { area: 'Lazimpat · Naxal · Jhamsikhel', note: 'Some bigger companies' },
];

export const permitRules2026 = [
  'Restricted area — you cannot trek independently.',
  'A licensed guide is MANDATORY (non-negotiable).',
  'Permits must be arranged through a registered agency — you cannot apply for the RAP yourself.',
  'The old 2-trekker minimum was scrapped on 22 March 2026.',
  'Permits: RAP + MCAP + ACAP + local municipality fee ≈ USD 215–255 pp (peak season). No TIMS needed.',
  'Agency package, 14 days ≈ USD 950–1,800 pp.',
  'Allow 2–3 working days in Kathmandu for permits (Dept. of Immigration is closed weekends).',
  'Verify the agency’s govt registration + TAAN membership number independently — don’t trust wall certificates.',
  'Trail closed 6 Sep 2026 (flooding), reopened 8 Sep — confirm current conditions with the agency.',
];

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + ', Kathmandu')}`;
}
