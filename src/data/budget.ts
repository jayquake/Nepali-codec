// Default cash budget (per person, comfortable, assuming an inclusive agency
// package: permits + guide + porter + lodging + meals + transport). Amounts are
// in USD and editable in-app; the trail items should be carried as NPR from
// Kathmandu (no ATMs on the restricted Manaslu section).

export type BudgetGroup = 'trail' | 'ktm' | 'contingency';

export interface BudgetItem {
  id: string;
  label: string;
  note?: string;
  usd: number;
  group: BudgetGroup;
}

/** NPR per 1 USD (2026 ballpark). Editable in-app. */
export const DEFAULT_RATE = 133;

export const GROUP_LABELS: Record<BudgetGroup, string> = {
  trail: 'On the trail · carry as NPR',
  ktm: 'Kathmandu',
  contingency: 'Contingency',
};

export const budgetItems: BudgetItem[] = [
  // On the trail — carry as NPR from Kathmandu
  { id: 'comforts', label: 'Hot showers · charging · wifi', note: '~$15/day × 12', usd: 180, group: 'trail' },
  { id: 'drinks', label: 'Snacks & drinks (Coke/beer)', note: 'pricier at altitude', usd: 60, group: 'trail' },
  { id: 'water', label: 'Boiled / filtered water', note: 'if not using a LifeStraw', usd: 30, group: 'trail' },
  { id: 'tipguide', label: 'Guide tip (your share)', note: '~$10/day, lump at the end', usd: 100, group: 'trail' },
  { id: 'tipporter', label: 'Porter tip (your share)', note: '~$8/day', usd: 80, group: 'trail' },
  { id: 'jeeps', label: 'Jeeps buffer / upgrade', note: 'if not in the package, add more', usd: 40, group: 'trail' },

  // Kathmandu (before + after)
  { id: 'ktmfood', label: 'Meals & taxis', note: '~5 days', usd: 200, group: 'ktm' },
  { id: 'gear', label: 'Gear top-ups & souvenirs', usd: 150, group: 'ktm' },

  // Contingency
  { id: 'buffer', label: 'Emergency buffer (keep as USD)', note: 'extra jeep/night, meds, heli deposit', usd: 120, group: 'contingency' },
];
