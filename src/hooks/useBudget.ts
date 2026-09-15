import { useCallback, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';
import { DEFAULT_RATE, budgetItems } from '../data/budget';

const AMT_KEY = 'manaslu.budget.amounts.v1';
const CFG_KEY = 'manaslu.budget.cfg.v1';

interface Cfg {
  rate: number;
  people: number;
}

export interface BudgetState {
  rate: number;
  people: number;
  amount: (id: string, fallback: number) => number;
  setAmount: (id: string, usd: number) => void;
  setRate: (rate: number) => void;
  setPeople: (n: number) => void;
  reset: () => void;
}

/** Editable, on-device cash budget. */
export function useBudget(): BudgetState {
  const [amounts, setAmounts] = useState<Record<string, number>>(() => loadJSON(AMT_KEY, {}));
  const [cfg, setCfg] = useState<Cfg>(() => loadJSON(CFG_KEY, { rate: DEFAULT_RATE, people: 1 }));

  const persistAmounts = (next: Record<string, number>) => {
    setAmounts(next);
    saveJSON(AMT_KEY, next);
  };
  const persistCfg = (next: Cfg) => {
    setCfg(next);
    saveJSON(CFG_KEY, next);
  };

  const amount = useCallback(
    (id: string, fallback: number) => (id in amounts ? amounts[id] : fallback),
    [amounts],
  );

  const setAmount = useCallback(
    (id: string, usd: number) => {
      persistAmounts({ ...amounts, [id]: Number.isFinite(usd) ? Math.max(0, usd) : 0 });
    },
    [amounts],
  );

  const setRate = useCallback(
    (rate: number) => persistCfg({ ...cfg, rate: rate > 0 ? rate : DEFAULT_RATE }),
    [cfg],
  );
  const setPeople = useCallback(
    (people: number) => persistCfg({ ...cfg, people: Math.max(1, Math.round(people) || 1) }),
    [cfg],
  );

  const reset = useCallback(() => {
    persistAmounts({});
    persistCfg({ rate: DEFAULT_RATE, people: 1 });
  }, []);

  return {
    rate: cfg.rate,
    people: cfg.people,
    amount,
    setAmount,
    setRate,
    setPeople,
    reset,
  };
}

/** Sum the per-person total (using any edited overrides). */
export function budgetTotalUsd(amount: (id: string, fb: number) => number): number {
  return budgetItems.reduce((sum, it) => sum + amount(it.id, it.usd), 0);
}
