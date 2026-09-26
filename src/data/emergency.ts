// EMERGENCY CONTACTS — saved for OFFLINE reading.
//
// Every number here was verified against the organisation's own site or an
// official source on 26 Sep 2026. Numbers still change: if one fails, work down
// the list. Nothing here is invented — where a number could not be verified it
// says so rather than guessing.

export interface Contact {
  id: string;
  name: string;
  detail: string;
  numbers: { label: string; value: string }[];
  email?: string;
  note?: string;
  priority?: boolean;
}

export const EMERGENCY_AS_OF = '2026-09-26';

/** Call in this order. Insurer FIRST — it is what gets the helicopter paid for. */
export const emergencyContacts: Contact[] = [
  {
    id: 'passportcard',
    name: 'PassportCard (your insurer) — CALL FIRST',
    detail:
      'Israeli travel insurer, 24/7 service in Hebrew and English. They must authorise a helicopter evacuation BEFORE it flies, or you risk paying for it yourself.',
    numbers: [
      { label: 'From Israel (short code)', value: '*9912' },
      { label: 'From abroad (24/7/365)', value: '+972-4-3761173' },
      { label: 'Global medical line', value: '+972-9-8920950' },
    ],
    note:
      'PassportCard works by paying on the spot with the card instead of reimbursing later — but that only holds if the case is opened with them first. They are also reachable on WhatsApp, which may work when a voice call will not.',
    priority: true,
  },
  {
    id: 'embassy-il',
    name: 'Embassy of Israel, Kathmandu',
    detail:
      'Consular help for Israeli citizens: lost passports, hospitalisation, contacting family, help if you are stranded.',
    numbers: [
      { label: 'Embassy', value: '+977-1-4290500' },
      { label: 'Emergency line', value: '+977-1-4433966' },
    ],
    email: 'info@kathmandu.mfa.gov.il',
    priority: true,
  },
  {
    id: 'nepal-emergency',
    name: 'Nepal emergency services',
    detail: 'Dial from any Nepali SIM. 112 is the national emergency number.',
    numbers: [
      { label: 'National emergency', value: '112' },
      { label: 'Police', value: '100' },
      { label: 'Ambulance', value: '102' },
      { label: 'Fire', value: '101' },
      { label: 'Tourist Police, Kathmandu', value: '+977-1-4247041' },
    ],
    note: 'Tourist Police is the right number for reporting a trekking incident from Kathmandu.',
    priority: true,
  },
  {
    id: 'hra',
    name: 'Himalayan Rescue Association (HRA)',
    detail:
      'Nepali non-profit running altitude aid posts and advising on mountain rescue. Good for altitude-illness advice and for coordinating a rescue.',
    numbers: [
      { label: 'Kathmandu office', value: '+977-1-4540292' },
      { label: 'Kathmandu office (2)', value: '+977-1-4540293' },
    ],
    email: 'hra@himalayanrescue.org',
    note: 'Office at Dhobichaur, Lazimpat, Kathmandu 44600.',
  },
  {
    id: 'simrik',
    name: 'Simrik Air (helicopter evacuation)',
    detail:
      'One of Nepal’s main rescue operators, running 24/7 emergency medical evacuation since 2001.',
    numbers: [{ label: 'Evacuation, 24×7', value: '+977-9804465830' }],
    note:
      'Other operators that fly rescues: Air Dynasty, Manang Air, Mountain Helicopters, Altitude Air. Their duty numbers change — your guide and agency will have the current ones, and so will the lodge.',
  },
];

/** The order of operations that actually gets you off the mountain. */
export const evacuationSteps: string[] = [
  '1. If someone is seriously ill or injured, start DESCENDING while you organise anything else. Losing altitude treats altitude illness; a helicopter may not come for hours or days.',
  '2. Call PassportCard (*9912 / +972-4-3761173) and open a case BEFORE arranging a flight. Give them: name, passport number, policy number, location (Sama Gaun, 28.5847 N 84.6440 E, 3,530 m), and what is wrong. Ask them to confirm authorisation and get a case/reference number — write it down.',
  '3. Tell your guide and the lodge. They speak Nepali, know the landing spot, and can reach operators directly — this is faster than doing it yourself.',
  '4. Your agency or the lodge contacts a helicopter operator. Give the operator the same coordinates and a description of the landing area.',
  '5. Confirm WHO IS PAYING before lifting off. Without insurer authorisation, operators expect payment up front and the bill runs to thousands of dollars.',
  '6. Mark a landing spot: flat, clear of loose tarpaulins and livestock, and show wind direction. Keep everyone well back and hold onto loose gear.',
  '7. Weather rules everything. Windows are usually early morning. Be packed and ready before first light — they open and close in minutes.',
  '8. Keep a phone charged and stay reachable. If you lose signal, agree with the lodge who is relaying messages.',
];

/** PassportCard-specific practicalities worth knowing before you call. */
export const insuranceNotes: string[] = [
  'PassportCard is a pay-on-the-spot card, not a reimburse-later policy — but that only works if you contact them and they authorise the expense. Do not let anyone lift off on a "we will sort it out later".',
  'Ask explicitly whether the evacuation is approved as MEDICALLY NECESSARY. Most policies, PassportCard included, do not cover a helicopter taken for convenience, a blocked road, or a missed flight — only genuine medical need.',
  'Being stranded by weather is usually NOT a medical evacuation. If nobody is ill, ask instead about trip disruption / delay cover and about extra accommodation costs, which is a different part of the policy.',
  'Have ready: policy number, passport number, full name as on the passport, current location and altitude, and a clear description of symptoms and when they started.',
  'Ask for a case reference number and write it down on paper. Phones die and signal drops.',
  'Photograph every receipt — lodge bills, jeep fares, the new flight — as you go. Claims for delay and disruption need them.',
  'If you cannot get a call out, try WhatsApp: it often gets through on a weak connection when voice will not.',
  'Ask your guide to speak to them too if there is a language problem at the Nepali end — PassportCard handle Hebrew and English.',
];

/** Details you will be asked for — fill these in before you need them. */
export const yourLocation = {
  place: 'Sama Gaun (Samagaon), Chum Nubri, Gorkha district',
  coords: '28.5847° N, 84.6440° E',
  elevation: '3,530 m',
  nearestHeli: 'Sama Gaun has a regularly used helicopter landing area',
  nearestRoad: 'Blocked both ways as of 26 Sep — see the Get out tab',
};
