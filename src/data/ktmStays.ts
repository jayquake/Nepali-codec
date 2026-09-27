// Kathmandu hotels — live availability pulled 27 Sep 2026 for 27 Sep–3 Oct,
// 2 adults, 1 room. Prices are the TOTAL for the stay in ILS (₪), as quoted by
// Booking.com. Saved offline; re-check before booking, rates move daily.

export interface KtmStay {
  id: string;
  name: string;
  area: string;
  stars: number;
  score: number;
  reviews: number;
  totalIls: number;
  highlights: string[];
  why: string;
  url: string;
}

export const KTM_HOTELS_AS_OF = '2026-09-27';
export const KTM_HOTELS_STAY = '27 Sep – 3 Oct 2026 · 6 nights · 2 adults';
/** Rough ILS→USD for a sanity check; not a live rate. */
export const ILS_PER_USD = 3.7;

export const ktmStays: KtmStay[] = [
  {
    id: 'basera',
    name: 'Basera Boutique Hotel',
    area: 'Babar Mahal',
    stars: 5,
    score: 9.5,
    reviews: 746,
    totalIls: 1507,
    highlights: ['Rooftop infinity pool', 'Spa, steam, hot tub', 'Garden & terrace', 'Free parking'],
    why: 'Best-reviewed on the list AND among the cheapest. Quiet Babar Mahal rather than the Thamel scrum — the right call after two weeks on the trail.',
    url: 'https://www.booking.com/hotel/np/basera-boutique-kathmandu.html',
  },
  {
    id: 'aarya',
    name: 'Aarya Hotel and Spa — Eternal Heritage',
    area: 'Thamel',
    stars: 5,
    score: 9.3,
    reviews: 832,
    totalIls: 1814,
    highlights: ['Rooftop infinity pool', 'Full spa, steam, Turkish bath', 'Hot tub', 'Walk to Thamel'],
    why: 'The strongest spa on the list and the most reviews. In Thamel, so gear shops, bars and the agency are all on your doorstep.',
    url: 'https://www.booking.com/hotel/np/aarya-and-spa-kathmandu3.html',
  },
  {
    id: 'babermahal',
    name: 'Baber Mahal Vilas — The Heritage Hotel',
    area: 'Babar Mahal',
    stars: 5,
    score: 9.0,
    reviews: 359,
    totalIls: 3441,
    highlights: ['Rana-era heritage courtyards', 'Rooftop pool', 'Spa & yoga', 'Gardens'],
    why: 'The romantic splurge — a restored Rana palace complex. If you want the trip to end with something memorable rather than just comfortable.',
    url: 'https://www.booking.com/hotel/np/babermahal-vilas.html',
  },
  {
    id: 'yakyeti',
    name: 'Hotel Yak & Yeti',
    area: 'Durbar Marg',
    stars: 5,
    score: 8.7,
    reviews: 267,
    totalIls: 3215,
    highlights: ['Big garden & outdoor pool', 'Tennis court', 'Spa & salon', 'Central Durbar Marg'],
    why: 'Kathmandu’s classic grande dame, built around a Rana palace wing. Largest grounds of any of these — proper lounging-by-the-pool territory.',
    url: 'https://www.booking.com/hotel/np/yak.html',
  },
  {
    id: 'aloft',
    name: 'Aloft by Marriott Kathmandu Thamel',
    area: 'Thamel',
    stars: 5,
    score: 9.1,
    reviews: 246,
    totalIls: 3268,
    highlights: ['Rooftop indoor pool', 'Spa & steam', 'Modern international standard', 'Airport shuttle'],
    why: 'The most predictable, modern rooms — reliable hot water and good beds if that is what you want most right now.',
    url: 'https://www.booking.com/hotel/np/aloft-kathmandu-thamel.html',
  },
  {
    id: 'mercure',
    name: 'Mercure Kathmandu Sukedhara Heights',
    area: 'Sukedhara (north)',
    stars: 5,
    score: 8.8,
    reviews: 100,
    totalIls: 1613,
    highlights: ['Rooftop infinity pool with view', 'Pool bar', 'Spa & steam', 'Quiet hillside'],
    why: 'Up on the north side with a view back over the valley. Good value, but a taxi ride from the centre.',
    url: 'https://www.booking.com/hotel/np/mercure-kathmandu-sukedhara-heights.html',
  },
  {
    id: 'malla',
    name: 'The Malla Hotel',
    area: 'Thamel',
    stars: 5,
    score: 8.5,
    reviews: 208,
    totalIls: 1892,
    highlights: ['Famous garden', 'Outdoor pool', 'Spa & yoga classes', 'Edge of Thamel'],
    why: 'Old-school, with one of the loveliest gardens in the city — quiet, but a two-minute walk from Thamel.',
    url: 'https://www.booking.com/hotel/np/the-malla.html',
  },
  {
    id: 'holidayinn',
    name: 'Holiday Inn Resort Budhanilkantha',
    area: 'Budhanilkantha (far north)',
    stars: 5,
    score: 8.3,
    reviews: 110,
    totalIls: 1300,
    highlights: ['Cheapest on the list', 'Outdoor pool & pool bar', 'Spa', 'Hiking & cycling from the door'],
    why: 'Resort on the northern edge under Shivapuri — cleanest air and greenest setting, but ~10 km out, so not for city evenings.',
    url: 'https://www.booking.com/hotel/np/holiday-inn-resort-kathmandu-budhanilkantha-an-ihg.html',
  },
];
