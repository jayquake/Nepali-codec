// EMAIL TEMPLATES — saved offline, copy-to-clipboard.
//
// Fill the [BRACKETS] before sending. Written to be firm and factual: state the
// entitlement, ask for one specific thing, give a deadline.

export interface EmailTemplate {
  id: string;
  title: string;
  blurb: string;
  to: string;
  subject: string;
  body: string;
  tips: string[];
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'flydubai-rebook',
    title: 'flydubai — cancelled flight: rebooking or refund',
    blurb:
      'Send this first. It asks for re-routing at no extra cost, and a refund only as the fallback — that order matters, because accepting a refund usually ends their duty to carry you.',
    to: 'customer.service@flydubai.com',
    subject:
      'Cancelled flight [FLIGHT NO] [DATE] — request re-routing under Conditions of Carriage — Booking [PNR]',
    body: `Dear flydubai Customer Service,

Booking reference (PNR): [PNR]
Passenger name(s): [FULL NAME AS ON PASSPORT]
Cancelled flight: [FLIGHT NO], [ROUTE, e.g. DXB-TLV], scheduled [DATE / TIME]
Ticket number(s): [13-DIGIT TICKET NUMBER]
Contact: [EMAIL] / [PHONE incl. country code]

I was notified that the above flight has been cancelled by the airline. I did not
request this change and I have not accepted any alternative.

I am currently trekking in a remote part of Nepal with very limited connectivity,
which is why I am writing rather than calling.

Under flydubai's Conditions of Carriage, where the airline cancels a flight I am
entitled to be re-routed to my destination at the earliest opportunity at no
additional cost, or to a refund. My preference, in this order, is:

1. Re-routing on the next available flydubai service from [ORIGIN] to [DESTINATION]
   on or after [DATE], in the same class of travel, at no extra cost.
2. If flydubai has no suitable service, re-routing on another carrier on the same
   basis. Options operating that day include Ethiopian Airlines and Qatar Airways.
3. Only if neither is possible, a full refund of the unused portion to the original
   form of payment.

Please also confirm:
- That my onward/connecting segments on the same booking remain valid and will not
  be cancelled as a no-show.
- Any hotel or meal provision due to me for the delay.
- The case reference for this request.

Because of my limited connectivity, please reply by email rather than telephone,
and please treat this as my formal request dated [TODAY'S DATE].

Kind regards,
[FULL NAME]
[PASSPORT NUMBER]
[PHONE]`,
    tips: [
      'Send it to flydubai directly, not to the site you booked through — an agent can only forward it and that costs days.',
      'If the whole KTM–DXB–TLV journey is on ONE ticket, flydubai owes you carriage to Tel Aviv, not just to Dubai. Say so.',
      'Do not buy a replacement ticket while your original is still valid — it can invalidate the rest of the booking. Get this answered first.',
      'Ask for the answer in writing. A phone agent promising something is worth nothing in a later claim.',
      'Keep the cancellation notice (SMS/email) — that is your evidence the airline cancelled rather than you missing the flight.',
      'If they refuse or go quiet for more than 7 days, reply on the same thread asking for a deadlock letter, and send it to your insurer.',
    ],
  },
  {
    id: 'passportcard-claim',
    title: 'PassportCard — open a case (delay / disruption / evacuation)',
    blurb:
      'Use this to open a claim in writing. If it is a medical emergency, CALL first (*9912 or +972-4-3761173) and use this only to follow up.',
    to: 'service@passportcard.co.il',
    subject: 'Claim / case — policy [POLICY NUMBER] — stranded in Nepal, [DATE]',
    body: `Shalom / Hello,

Policy number: [POLICY NUMBER]
Insured name: [FULL NAME AS ON PASSPORT]
Passport number: [PASSPORT NUMBER]
Phone / WhatsApp: [PHONE incl. country code]
Dates of travel: [START] to [END]

I am writing to open a case.

Current situation:
I am in Sama Gaun (Samagaon), Gorkha district, Nepal, at approximately
28.5847 N, 84.6440 E, elevation 3,530 m. Severe weather has stopped movement:
the district administration has suspended high-altitude trekking, and the road
out via Chame-Besisahar is closed by flooding and landslides. Connectivity here
is very limited.

What I am claiming for / asking about:
[DELETE WHAT DOES NOT APPLY]
- Trip delay / disruption: additional accommodation and meals while unable to move,
  from [DATE] onwards.
- Missed departure: my flight [FLIGHT NO] on [DATE] is affected.
- Additional transport costs to reach the airport, including the possibility of a
  chartered helicopter out of Sama Gaun if the route stays closed.
- Medical: [DESCRIBE SYMPTOMS, ONSET AND ALTITUDE — or delete].

Please confirm:
1. What is covered in these circumstances and up to what limit.
2. Whether a helicopter transfer would be authorised, and on what grounds.
3. What documentation you need. I am keeping all receipts.
4. A case reference number for this claim.

Please reply by email or WhatsApp, as voice calls are unreliable from here.

Thank you,
[FULL NAME]
[DATE]`,
    tips: [
      'For anything medical, phone first — a case opened by phone moves far faster, and a helicopter needs authorisation before it flies.',
      'Be precise about symptoms, when they started, and at what altitude. That is what decides a medical evacuation.',
      'Weather-stranded with nobody ill is a trip-disruption claim, not a medical evacuation. Asking for the right thing gets a faster yes.',
      'Ask for the case reference and write it on paper.',
      'Keep every receipt, including lodge nights and jeep fares.',
      'WhatsApp often succeeds where a voice call fails on a weak signal.',
    ],
  },
];
