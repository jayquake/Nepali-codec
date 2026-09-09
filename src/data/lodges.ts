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
    lat: 28.348,
    lng: 84.895,
    ele: 900,
    notes: 'Several riverside teahouses. Hot showers, decent dal bhat, charging available.',
  },
  {
    id: 'lodge-jagat',
    name: 'Jagat lodges',
    village: 'Jagat',
    lat: 28.451,
    lng: 84.858,
    ele: 1340,
    notes: 'Permit checkpoint village. Comfortable rooms; last reliable ATM-free cash stop nearby.',
  },
  {
    id: 'lodge-deng',
    name: 'Deng teahouses',
    village: 'Deng',
    lat: 28.523,
    lng: 84.845,
    ele: 1860,
    notes: 'Small, simple teahouses. A convenient overnight in the gorge.',
  },
  {
    id: 'lodge-namrung',
    name: 'Namrung lodges',
    village: 'Namrung',
    lat: 28.541,
    lng: 84.797,
    ele: 2630,
    notes: 'Surprisingly good bakeries and coffee. Permit check. Great first big-mountain views.',
  },
  {
    id: 'lodge-lho',
    name: 'Lho teahouses',
    village: 'Lho',
    lat: 28.573,
    lng: 84.740,
    ele: 3180,
    notes: 'Sunset on Manaslu from Ribung Gompa. Solid acclimatisation stop.',
  },
  {
    id: 'lodge-samagaon',
    name: 'Samagaon lodges',
    village: 'Samagaon',
    lat: 28.606,
    lng: 84.629,
    ele: 3530,
    notes: 'Largest village on the route; the best-equipped lodges, a clinic (seasonal) and Wi-Fi.',
  },
  {
    id: 'lodge-samdo',
    name: 'Samdo teahouses',
    village: 'Samdo',
    lat: 28.640,
    lng: 84.630,
    ele: 3860,
    notes: 'Last permanent village. Warm dining rooms; carry a good sleeping bag — nights are cold.',
  },
  {
    id: 'lodge-dharamsala',
    name: 'Dharamsala (Larke Phedi) huts',
    village: 'Dharamsala',
    lat: 28.657,
    lng: 84.575,
    ele: 4460,
    notes: 'Very basic stone huts / dorms, limited beds — arrive early. Staging camp for the pass.',
  },
  {
    id: 'lodge-bimthang',
    name: 'Bimthang lodges',
    village: 'Bimthang',
    lat: 28.648,
    lng: 84.451,
    ele: 3720,
    notes: 'Meadow lodges with spectacular views back at the pass. A welcome rest after Larke La.',
  },
  {
    id: 'lodge-tilije',
    name: 'Tilije guesthouses',
    village: 'Tilije',
    lat: 28.560,
    lng: 84.400,
    ele: 2300,
    notes: 'Comfortable Gurung village lodges, apple products and lower, warmer air.',
  },
  {
    id: 'lodge-dharapani',
    name: 'Dharapani lodges',
    village: 'Dharapani',
    lat: 28.523,
    lng: 84.362,
    ele: 1860,
    notes: 'Junction with the Annapurna Circuit and the road head; jeeps to Besisahar.',
  },
];
