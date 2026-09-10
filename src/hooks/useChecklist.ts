import { useCallback, useMemo, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';
import { defaultChecklist, type ChecklistItem } from '../data/checklist';

const CHECKED_KEY = 'manaslu.checklist.checked.v1';
const CUSTOM_KEY = 'manaslu.checklist.custom.v1';

export interface ChecklistState {
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  checkedCount: number;
  total: number;
  isCustom: (id: string) => boolean;
  toggle: (id: string) => void;
  addItem: (label: string, category: string) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

function newId(label: string): string {
  return `c_${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)}_${Date.now().toString(36)}`;
}

/** Local-first (on-device) packing / prep checklist — works fully offline. */
export function useChecklist(): ChecklistState {
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    loadJSON(CHECKED_KEY, {}),
  );
  const [custom, setCustom] = useState<ChecklistItem[]>(() => loadJSON(CUSTOM_KEY, []));

  const items = useMemo(() => [...defaultChecklist, ...custom], [custom]);
  const customIds = useMemo(() => new Set(custom.map((c) => c.id)), [custom]);

  const persistChecked = (next: Record<string, boolean>) => {
    setChecked(next);
    saveJSON(CHECKED_KEY, next);
  };
  const persistCustom = (next: ChecklistItem[]) => {
    setCustom(next);
    saveJSON(CUSTOM_KEY, next);
  };

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      saveJSON(CHECKED_KEY, next);
      return next;
    });
  }, []);

  const addItem = useCallback(
    (label: string, category: string) => {
      const trimmed = label.trim();
      if (!trimmed) return;
      const item: ChecklistItem = { id: newId(trimmed), label: trimmed, category };
      persistCustom([...custom, item]);
    },
    [custom],
  );

  const removeItem = useCallback(
    (id: string) => {
      persistCustom(custom.filter((c) => c.id !== id));
      setChecked((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        delete next[id];
        saveJSON(CHECKED_KEY, next);
        return next;
      });
    },
    [custom],
  );

  const reset = useCallback(() => {
    persistChecked({});
  }, []);

  const checkedCount = items.filter((i) => checked[i.id]).length;

  return {
    items,
    checked,
    checkedCount,
    total: items.length,
    isCustom: (id) => customIds.has(id),
    toggle,
    addItem,
    removeItem,
    reset,
  };
}
