// Teahouses / lodges along the Manaslu Circuit, grouped by village.
//
// These are representative of what is typically available; names, standards and
// availability change season to season. Book ahead in peak season, and treat this
// as a planning aid rather than a guarantee. Edit freely to add your own finds.

export interface Lodge {
  id: string;
  name: string;
  village: string;
  lat: number;
  lng: number;
  ele: number;
  notes: string;
}

export const lodges: Lodge[] = [
  {
    id: 'lodge-machhakhola',
    name: 'Machha Khola guesthouses',
    village: 'Machha Khola',
    lat: 28.2293,
    lng: 84.8738,
    ele: 900,
    notes: 'Several riverside teahouses. Hot showers, decent dal bhat, charging available.',
  },
  {
    id: 'lodge-jagat',
    name: 'Jagat lodges',
    village: 'Jagat',
    lat: 28.3514,
    lng: 84.8959,
    ele: 1340,
    notes: 'Permit checkpoint village. Comfortable rooms; last reliable ATM-free cash stop nearby.',
  },
  {
    id: 'lodge-deng',
    name: 'Deng teahouses',
    village: 'Deng',
    lat: 28.4791,
    lng: 84.867,
    ele: 1860,
    notes: 'Small, simple teahouses. A convenient overnight in the gorge.',
  },
  {
    id: 'lodge-namrung',
    name: 'Namrung lodges',
    village: 'Namrung',
    lat: 28.5451,
    lng: 84.7679,
    ele: 2630,
    notes: 'Surprisingly good bakeries and coffee. Permit check. Great first big-mountain views.',
  },
  {
    id: 'lodge-lho',
    name: 'Lho teahouses',
    village: 'Lho',
    lat: 28.574,
    lng: 84.702,
    ele: 3180,
    notes: 'Sunset on Manaslu from Ribung Gompa. Solid acclimatisation stop.',
  },
  {
    id: 'lodge-samagaon',
    name: 'Samagaon lodges',
    village: 'Samagaon',
    lat: 28.5847,
    lng: 84.644,
    ele: 3530,
    notes: 'Largest village on the route; the best-equipped lodges, a clinic (seasonal) and Wi-Fi.',
  },
  {
    id: 'lodge-samdo',
    name: 'Samdo teahouses',
    village: 'Samdo',
    lat: 28.6509,
    lng: 84.6341,
    ele: 3860,
    notes: 'Last permanent village. Warm dining rooms; carry a good sleeping bag — nights are cold.',
  },
  {
    id: 'lodge-dharamsala',
    name: 'Dharamsala (Larke Phedi) huts',
    village: 'Dharamsala',
    lat: 28.659,
    lng: 84.5843,
    ele: 4460,
    notes: 'Very basic stone huts / dorms, limited beds — arrive early. Staging camp for the pass.',
  },
  {
    id: 'lodge-bimthang',
    name: 'Bimthang lodges',
    village: 'Bimthang',
    lat: 28.6338,
    lng: 84.4713,
    ele: 3720,
    notes: 'Meadow lodges with spectacular views back at the pass. A welcome rest after Larke La.',
  },
  {
    id: 'lodge-tilije',
    name: 'Tilije guesthouses',
    village: 'Tilije',
    lat: 28.5452,
    lng: 84.3812,
    ele: 2300,
    notes: 'Comfortable Gurung village lodges, apple products and lower, warmer air.',
  },
  {
    id: 'lodge-dharapani',
    name: 'Dharapani lodges',
    village: 'Dharapani',
    lat: 28.519,
    lng: 84.3584,
    ele: 1860,
    notes: 'Junction with the Annapurna Circuit and the road head; jeeps to Besisahar.',
  },
];
