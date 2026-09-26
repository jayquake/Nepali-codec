// FLIGHT OPTIONS — saved for OFFLINE reading.
//
// Live prices were pulled on 26 Sep 2026 for a 4 Oct 2026 departure, one adult,
// and baked in so they can be read with no connection. Prices and seats WILL
// have moved — treat these as "what existed and roughly what it cost", then
// confirm when you next get signal.

export interface FlightOption {
  id: string;
  airline: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  priceEur: number;
  bookUrl: string;
}

export interface FlightRoute {
  id: string;
  label: string;
  from: string;
  to: string;
  date: string;
  note: string;
  options: FlightOption[];
}

export const FLIGHTS_FETCHED = '2026-09-26';
export const FLIGHTS_DATE = '2026-10-04';

const LM = (q: string) =>
  `https://www.lastminute.com/flights/#/search?dep=${q}&adults=1`;

export const flightRoutes: FlightRoute[] = [
  {
    id: 'dxb-tlv',
    label: 'Dubai → Tel Aviv',
    from: 'DXB',
    to: 'TLV',
    date: '2026-10-04',
    note:
      'Your original DXB→TLV leg was cancelled. These are the 4 Oct replacements. The flydubai direct is the only 3-hour option — everything else routes via Addis Ababa or Doha/Larnaca and costs you most of a day.',
    options: [
      { id: 'f1', airline: 'flydubai (DIRECT)', depart: 'DXB 12:10', arrive: 'TLV 14:35', duration: '3 h 25 m', stops: 'Direct', priceEur: 1577, bookUrl: LM('DXB') },
      { id: 'f2', airline: 'Ethiopian Airlines', depart: 'DXB 05:40', arrive: 'TLV 14:35', duration: '9 h 55 m', stops: '1 stop', priceEur: 1078, bookUrl: LM('DXB') },
      { id: 'f3', airline: 'Ethiopian Airlines', depart: 'DXB 17:10', arrive: 'TLV 04:00+1', duration: '11 h 50 m', stops: '1 stop', priceEur: 1078, bookUrl: LM('DXB') },
      { id: 'f4', airline: 'Ethiopian Airlines', depart: 'DXB 04:25', arrive: 'TLV 15:50', duration: '12 h 25 m', stops: '1 stop', priceEur: 1196, bookUrl: LM('DXB') },
      { id: 'f5', airline: 'Ethiopian Airlines', depart: 'DXB 05:40', arrive: 'TLV 21:10', duration: '16 h 30 m', stops: '1 stop', priceEur: 1159, bookUrl: LM('DXB') },
      { id: 'f6', airline: 'Qatar + Cyprus Airways', depart: 'DXB 23:25', arrive: 'TLV 14:55+1', duration: '16 h 30 m', stops: '2 stops', priceEur: 1395, bookUrl: LM('DXB') },
      { id: 'f7', airline: 'Ethiopian Airlines', depart: 'DXB 04:25', arrive: 'TLV 21:10', duration: '17 h 45 m', stops: '1 stop', priceEur: 1159, bookUrl: LM('DXB') },
      { id: 'f8', airline: 'Qatar + Cyprus Airways', depart: 'DXB 11:45', arrive: 'TLV 14:55+1', duration: '28 h 10 m', stops: '2 stops', priceEur: 1112, bookUrl: LM('DXB') },
    ],
  },
  {
    id: 'ktm-tlv',
    label: 'Kathmandu → Tel Aviv (rebook the whole way)',
    from: 'KTM',
    to: 'TLV',
    date: '2026-10-04',
    note:
      'If the delay means you miss the Kathmandu departure entirely, these are whole-journey replacements on 4 Oct. Note there is no cheap option — and Qatar via Larnaca is the only one near €1,250.',
    options: [
      { id: 'k1', airline: 'Qatar + Cyprus Airways', depart: 'KTM 19:00', arrive: 'TLV 14:55+1', duration: '22 h 40 m', stops: '2 stops', priceEur: 1257, bookUrl: LM('KTM') },
      { id: 'k2', airline: 'Air India + Etihad', depart: 'KTM 21:10', arrive: 'TLV 11:10+1', duration: '16 h 45 m', stops: '2 stops', priceEur: 1576, bookUrl: LM('KTM') },
      { id: 'k3', airline: 'Air India + Etihad', depart: 'KTM 21:10', arrive: 'TLV 11:20+1', duration: '16 h 55 m', stops: '2 stops', priceEur: 1586, bookUrl: LM('KTM') },
      { id: 'k4', airline: 'Qatar + ITA Airways', depart: 'KTM 19:00', arrive: 'TLV 03:10+2', duration: '34 h 55 m', stops: '2 stops', priceEur: 3208, bookUrl: LM('KTM') },
    ],
  },
];

/** What to do about the cancelled leg — readable with no signal. */
export const rebookingNotes: string[] = [
  'A cancelled flight is the airline’s problem to fix: under most conditions of carriage flydubai owes you a rebooking onto the next available flight at no extra cost, or a refund. Ask for the rebooking before you pay for anything new.',
  'Contact flydubai directly rather than a booking site — agents can only pass the request along and it costs you days.',
  'If you booked the whole KTM–DXB–TLV journey on one ticket, the airline must get you to Tel Aviv; do not buy a separate ticket until they refuse in writing.',
  'If the trek delay is what makes you miss the flight, that is a different claim — check your travel insurance for trip delay / missed departure cover before rebooking.',
  'Buying a fresh one-way DXB→TLV while holding a valid ticket can invalidate the rest of your booking. Get the original sorted first.',
  'Prices below were real on 26 Sep. Fares on this route move fast; re-check the moment you have signal in Kathmandu.',
];
