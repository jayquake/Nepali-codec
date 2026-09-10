// Default Manaslu Circuit packing / prep checklist. Grouped by category.
// Users can check items off (saved on-device), quick-add common extras, or add
// their own. Edit these defaults freely.

export interface ChecklistItem {
  id: string;
  label: string;
  category: string;
}

export const CHECKLIST_CATEGORIES = [
  'Permits & documents',
  'Clothing & layers',
  'Footwear',
  'Gear & equipment',
  'Health & safety',
  'Electronics',
  'Extras',
];

export const defaultChecklist: ChecklistItem[] = [
  // Permits & documents
  { id: 'passport', label: 'Passport + photocopies', category: 'Permits & documents' },
  { id: 'photos', label: 'Passport photos (x4)', category: 'Permits & documents' },
  { id: 'rap', label: 'Restricted Area Permit (RAP)', category: 'Permits & documents' },
  { id: 'mcap', label: 'MCAP permit', category: 'Permits & documents' },
  { id: 'acap', label: 'ACAP permit', category: 'Permits & documents' },
  { id: 'insurance', label: 'Insurance (heli-evac > 4,000 m)', category: 'Permits & documents' },
  { id: 'cash', label: 'Cash in NPR (small notes)', category: 'Permits & documents' },

  // Clothing & layers
  { id: 'down', label: 'Down jacket', category: 'Clothing & layers' },
  { id: 'shell', label: 'Waterproof shell jacket', category: 'Clothing & layers' },
  { id: 'fleece', label: 'Fleece / mid-layer', category: 'Clothing & layers' },
  { id: 'base', label: 'Thermal base layers (top + bottom)', category: 'Clothing & layers' },
  { id: 'trousers', label: 'Trekking trousers', category: 'Clothing & layers' },
  { id: 'hats', label: 'Warm hat + sun hat', category: 'Clothing & layers' },
  { id: 'gloves', label: 'Gloves (liner + insulated)', category: 'Clothing & layers' },
  { id: 'buff', label: 'Buff / neck gaiter', category: 'Clothing & layers' },
  { id: 'socks', label: 'Trekking socks (x4)', category: 'Clothing & layers' },

  // Footwear
  { id: 'boots', label: 'Broken-in trekking boots', category: 'Footwear' },
  { id: 'campshoes', label: 'Camp shoes / sandals', category: 'Footwear' },
  { id: 'gaiters', label: 'Gaiters (snow at Larke La)', category: 'Footwear' },

  // Gear & equipment
  { id: 'pack', label: 'Backpack (40–50 L)', category: 'Gear & equipment' },
  { id: 'daypack', label: 'Daypack', category: 'Gear & equipment' },
  { id: 'sleepbag', label: '4-season sleeping bag (-15 °C)', category: 'Gear & equipment' },
  { id: 'poles', label: 'Trekking poles', category: 'Gear & equipment' },
  { id: 'headlamp', label: 'Headlamp + spare batteries', category: 'Gear & equipment' },
  { id: 'water', label: 'Water bottles / bladder (2–3 L)', category: 'Gear & equipment' },
  { id: 'purify', label: 'Water purification (tablets/filter)', category: 'Gear & equipment' },
  { id: 'sunnies', label: 'UV sunglasses (glacier)', category: 'Gear & equipment' },

  // Health & safety
  { id: 'sunscreen', label: 'Sunscreen SPF 50 + lip balm', category: 'Health & safety' },
  { id: 'firstaid', label: 'Personal first-aid kit', category: 'Health & safety' },
  { id: 'diamox', label: 'Altitude meds (ask a doctor)', category: 'Health & safety' },
  { id: 'blister', label: 'Blister care (tape / moleskin)', category: 'Health & safety' },
  { id: 'sanitizer', label: 'Hand sanitizer', category: 'Health & safety' },
  { id: 'ors', label: 'Rehydration salts (ORS)', category: 'Health & safety' },
  { id: 'meds', label: 'Personal medication', category: 'Health & safety' },

  // Electronics
  { id: 'phone', label: 'Phone + this app installed offline', category: 'Electronics' },
  { id: 'powerbank', label: 'Large power bank', category: 'Electronics' },
  { id: 'cables', label: 'Cables + Nepal plug adapter', category: 'Electronics' },

  // Extras
  { id: 'towel', label: 'Quick-dry towel', category: 'Extras' },
  { id: 'wipes', label: 'Wet wipes / toilet paper', category: 'Extras' },
  { id: 'snacks', label: 'Snacks / energy bars', category: 'Extras' },
  { id: 'earplugs', label: 'Earplugs', category: 'Extras' },
  { id: 'detergent', label: 'Detergent (laundry)', category: 'Extras' },

  // Personal additions
  { id: 'thicksocks', label: 'Thick socks', category: 'Clothing & layers' },
  { id: 'cottonsocks', label: 'Cotton socks (x3)', category: 'Clothing & layers' },
  { id: 'thermalpants', label: 'Thermal pants', category: 'Clothing & layers' },
  { id: 'tightpants', label: 'Tight / base pants (x2)', category: 'Clothing & layers' },
  { id: 'warmpants', label: 'Warm pants', category: 'Clothing & layers' },
  { id: 'pajama', label: 'Pyjamas', category: 'Clothing & layers' },
  { id: 'thermalshirt', label: 'Thermal shirt', category: 'Clothing & layers' },
  { id: 'cottonshirt', label: 'Cotton shirt', category: 'Clothing & layers' },
  { id: 'liner', label: 'Liner', category: 'Clothing & layers' },
  { id: 'charcoal', label: 'Charcoal pills (stomach)', category: 'Health & safety' },
  { id: 'antibiotics', label: 'Antibiotics (ask a doctor)', category: 'Health & safety' },
  { id: 'lifestraw', label: 'LifeStraw / water filter', category: 'Gear & equipment' },
];

// One-tap common extras people often forget.
export const quickAddItems: { label: string; category: string }[] = [
  { label: 'Microspikes / crampons', category: 'Footwear' },
  { label: 'Thermos flask', category: 'Gear & equipment' },
  { label: 'Solar charger', category: 'Electronics' },
  { label: 'Duct tape', category: 'Extras' },
  { label: 'Playing cards', category: 'Extras' },
  { label: 'Pee bottle', category: 'Extras' },
  { label: 'Spare glasses / contacts', category: 'Health & safety' },
  { label: 'Notebook + pen', category: 'Extras' },
];
