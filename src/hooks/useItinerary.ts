import { useCallback, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';

const NOTES_KEY = 'manaslu.itinerary.notes.v1';
const DONE_KEY = 'manaslu.itinerary.done.v1';

export interface ItineraryState {
  notes: Record<string, string>;
  done: Record<string, boolean>;
  setNote: (id: string, note: string) => void;
  toggleDone: (id: string) => void;
}

/** Per-day notes + done state for the trip plan. Local-first, works offline. */
export function useItinerary(): ItineraryState {
  const [notes, setNotes] = useState<Record<string, string>>(() => loadJSON(NOTES_KEY, {}));
  const [done, setDone] = useState<Record<string, boolean>>(() => loadJSON(DONE_KEY, {}));

  const setNote = useCallback((id: string, note: string) => {
    setNotes((prev) => {
      const next = { ...prev, [id]: note };
      if (!note) delete next[id];
      saveJSON(NOTES_KEY, next);
      return next;
    });
  }, []);

  const toggleDone = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      saveJSON(DONE_KEY, next);
      return next;
    });
  }, []);

  return { notes, done, setNote, toggleDone };
}
