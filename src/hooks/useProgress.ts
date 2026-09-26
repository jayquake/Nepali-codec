import { useCallback, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { loadJSON, saveJSON } from '../lib/storage';

const KEY = 'manaslu.progress.v1';

export interface ProgressState {
  done: Record<string, boolean>;
  isDone: (stageId: string) => boolean;
  toggle: (stageId: string) => void;
  doneCount: number;
  /** Increments each time a stage is newly completed — drives the confetti. */
  celebrate: number;
}

/**
 * Stage completion. Local-first (works offline / signed out); when a user is signed
 * in it merges with and syncs to the Supabase `progress` table across devices.
 */
export function useProgress(user: User | null): ProgressState {
  const [done, setDone] = useState<Record<string, boolean>>(() => loadJSON(KEY, {}));
  const [celebrate, setCelebrate] = useState(0);

  useEffect(() => {
    saveJSON(KEY, done);
  }, [done]);

  // On sign-in: pull remote, union with local, and push any local-only completions up.
  useEffect(() => {
    if (!supabase || !user) return;
    let active = true;
    (async () => {
      const { data } = await supabase!.from('progress').select('stage_id').eq('user_id', user.id);
      if (!active || !data) return;
      const remote = new Set(data.map((r) => r.stage_id as string));
      setDone((prev) => {
        const merged: Record<string, boolean> = { ...prev };
        remote.forEach((id) => (merged[id] = true));
        const localOnly = Object.keys(prev).filter((id) => prev[id] && !remote.has(id));
        if (localOnly.length) {
          void supabase!
            .from('progress')
            .upsert(localOnly.map((stage_id) => ({ user_id: user.id, stage_id })));
        }
        return merged;
      });
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const toggle = useCallback(
    (stageId: string) => {
      setDone((prev) => {
        if (!prev[stageId]) setCelebrate((n) => n + 1);
        const next = { ...prev };
        const nowDone = !prev[stageId];
        if (nowDone) next[stageId] = true;
        else delete next[stageId];

        if (supabase && user) {
          if (nowDone) {
            void supabase.from('progress').upsert({ user_id: user.id, stage_id: stageId });
          } else {
            void supabase.from('progress').delete().match({ user_id: user.id, stage_id: stageId });
          }
        }
        return next;
      });
    },
    [user],
  );

  const doneCount = Object.values(done).filter(Boolean).length;
  const isDone = useCallback((stageId: string) => Boolean(done[stageId]), [done]);

  return { done, isDone, toggle, doneCount, celebrate };
}
