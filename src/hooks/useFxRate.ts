import { useCallback, useEffect, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';

const KEY = 'manaslu.fx.npr.v1';

interface CachedFx {
  rate: number;
  updatedAt: number;
}

export interface FxState {
  rate: number | null;
  updatedAt: number | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Live USD → NPR rate from the keyless open.er-api.com endpoint. Cached to
 * localStorage (and runtime-cached by the service worker) so the last-known rate
 * still shows offline.
 */
export function useFxRate(): FxState {
  const cached = loadJSON<CachedFx | null>(KEY, null);
  const [rate, setRate] = useState<number | null>(cached?.rate ?? null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(cached?.updatedAt ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error(`Rate service returned ${res.status}.`);
      const json = (await res.json()) as { rates?: Record<string, number> };
      const npr = json.rates?.NPR;
      if (typeof npr !== 'number') throw new Error('NPR rate unavailable.');
      const now = Date.now();
      setRate(npr);
      setUpdatedAt(now);
      saveJSON(KEY, { rate: npr, updatedAt: now });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not fetch the rate.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { rate, updatedAt, loading, error, reload: load };
}
