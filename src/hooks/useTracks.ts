import { useCallback, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { FeatureCollection } from 'geojson';
import { supabase } from '../lib/supabase';
import { loadJSON, saveJSON } from '../lib/storage';
import { latlngsFromGeojson, parseGpx, type TrackStats } from '../lib/gpx';

const KEY = 'manaslu.tracks.v1';

export interface StoredTrack {
  id: string;
  name: string;
  stats: TrackStats;
  geojson: FeatureCollection;
  recorded_at: string;
  synced: boolean;
}

interface PersistedTrack extends Omit<StoredTrack, 'synced'> {
  synced?: boolean;
}

export interface TracksState {
  tracks: StoredTrack[];
  visible: Record<string, boolean>;
  latlngs: (id: string) => [number, number][];
  addFromGpx: (text: string, filename: string) => StoredTrack;
  remove: (id: string) => void;
  toggleVisible: (id: string) => void;
}

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/**
 * Imported GPX watch tracks. Local-first (import works signed out / offline) and
 * synced to the Supabase `tracks` table when signed in.
 */
export function useTracks(user: User | null): TracksState {
  const [tracks, setTracks] = useState<StoredTrack[]>(() =>
    loadJSON<PersistedTrack[]>(KEY, []).map((t) => ({ ...t, synced: t.synced ?? false })),
  );
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  // Cache derived polylines so we don't re-walk GeoJSON on every render.
  const [lineCache] = useState<Map<string, [number, number][]>>(() => new Map());

  useEffect(() => {
    saveJSON(KEY, tracks);
  }, [tracks]);

  // On sign-in: pull remote tracks, add any missing locally, push local-only ones up.
  useEffect(() => {
    if (!supabase || !user) return;
    let active = true;
    (async () => {
      const { data } = await supabase!
        .from('tracks')
        .select('id, name, geojson, stats, recorded_at')
        .eq('user_id', user.id);
      if (!active || !data) return;
      setTracks((prev) => {
        const byId = new Map(prev.map((t) => [t.id, t]));
        for (const r of data) {
          byId.set(r.id as string, {
            id: r.id as string,
            name: r.name as string,
            geojson: r.geojson as FeatureCollection,
            stats: r.stats as TrackStats,
            recorded_at: r.recorded_at as string,
            synced: true,
          });
        }
        const remoteIds = new Set(data.map((r) => r.id as string));
        const localOnly = prev.filter((t) => !remoteIds.has(t.id));
        if (localOnly.length) {
          void supabase!.from('tracks').upsert(
            localOnly.map((t) => ({
              id: t.id,
              user_id: user.id,
              name: t.name,
              geojson: t.geojson,
              stats: t.stats,
              recorded_at: t.recorded_at,
            })),
          );
          localOnly.forEach((t) => byId.set(t.id, { ...t, synced: true }));
        }
        return Array.from(byId.values()).sort((a, b) =>
          b.recorded_at.localeCompare(a.recorded_at),
        );
      });
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const latlngs = useCallback(
    (id: string) => {
      const cached = lineCache.get(id);
      if (cached) return cached;
      const track = tracks.find((t) => t.id === id);
      if (!track) return [];
      const line = latlngsFromGeojson(track.geojson);
      lineCache.set(id, line);
      return line;
    },
    [tracks, lineCache],
  );

  const addFromGpx = useCallback(
    (text: string, filename: string) => {
      const parsed = parseGpx(text, filename.replace(/\.gpx$/i, ''));
      const track: StoredTrack = {
        id: newId(),
        name: parsed.name,
        stats: parsed.stats,
        geojson: parsed.geojson,
        recorded_at: new Date().toISOString(),
        synced: false,
      };
      lineCache.set(track.id, parsed.latlngs);
      setTracks((prev) => [track, ...prev]);
      setVisible((prev) => ({ ...prev, [track.id]: true }));

      if (supabase && user) {
        void supabase
          .from('tracks')
          .insert({
            id: track.id,
            user_id: user.id,
            name: track.name,
            geojson: track.geojson,
            stats: track.stats,
            recorded_at: track.recorded_at,
          })
          .then(({ error }) => {
            if (!error) {
              setTracks((prev) =>
                prev.map((t) => (t.id === track.id ? { ...t, synced: true } : t)),
              );
            }
          });
      }
      return track;
    },
    [user, lineCache],
  );

  const remove = useCallback(
    (id: string) => {
      lineCache.delete(id);
      setTracks((prev) => prev.filter((t) => t.id !== id));
      setVisible((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (supabase && user) {
        void supabase.from('tracks').delete().match({ user_id: user.id, id });
      }
    },
    [user, lineCache],
  );

  const toggleVisible = useCallback((id: string) => {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return { tracks, visible, latlngs, addFromGpx, remove, toggleVisible };
}
