import { useCallback, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';

const KEY = 'manaslu.cashlog.v1';

export type EntryType = 'in' | 'out';
export type Currency = 'NPR' | 'USD';

export interface CashEntry {
  id: string;
  type: EntryType; // 'in' = cash withdrawn/exchanged, 'out' = spent
  amount: number;
  currency: Currency;
  category?: string; // for expenses
  note?: string;
  at: number; // timestamp
}

export interface NewEntry {
  type: EntryType;
  amount: number;
  currency: Currency;
  category?: string;
  note?: string;
}

export interface CashLogState {
  entries: CashEntry[]; // newest first
  add: (e: NewEntry) => void;
  remove: (id: string) => void;
  clear: () => void;
}

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `c_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/** On-device cash tracker: withdrawals ('in') and expenses ('out'). Works offline. */
export function useCashLog(): CashLogState {
  const [entries, setEntries] = useState<CashEntry[]>(() =>
    loadJSON<CashEntry[]>(KEY, []).sort((a, b) => b.at - a.at),
  );

  const persist = (next: CashEntry[]) => {
    const sorted = [...next].sort((a, b) => b.at - a.at);
    setEntries(sorted);
    saveJSON(KEY, sorted);
  };

  const add = useCallback(
    (e: NewEntry) => {
      const entry: CashEntry = { id: newId(), at: Date.now(), ...e };
      persist([entry, ...entries]);
    },
    [entries],
  );

  const remove = useCallback(
    (id: string) => persist(entries.filter((e) => e.id !== id)),
    [entries],
  );

  const clear = useCallback(() => persist([]), []);

  return { entries, add, remove, clear };
}
