import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { GeoPosition } from './useGeolocation';

const MIN_INTERVAL_MS = 15_000;

/**
 * When sharing is enabled and a user is signed in, writes GPS breadcrumbs to the
 * `locations` table (throttled) so followers can watch progress via a share link.
 */
export function useLiveLocation(
  user: User | null,
  sharing: boolean,
  position: GeoPosition | null,
): void {
  const lastSent = useRef(0);

  useEffect(() => {
    if (!supabase || !user || !sharing || !position) return;
    const now = Date.now();
    if (now - lastSent.current < MIN_INTERVAL_MS) return;
    lastSent.current = now;
    void supabase.from('locations').insert({
      user_id: user.id,
      lat: position.lat,
      lng: position.lng,
      accuracy: position.accuracy,
      elevation: position.altitude,
    });
  }, [user, sharing, position]);
}

export interface SharedPoint {
  lat: number;
  lng: number;
  accuracy: number | null;
  elevation: number | null;
  recorded_at: string;
  display_name: string | null;
}

/**
 * Follower view: polls the latest shared position for a public share token via a
 * SECURITY DEFINER RPC (so anonymous viewers see only the position, not the table).
 */
export function useSharedTrack(token: string): {
  point: SharedPoint | null;
  loading: boolean;
  error: string | null;
} {
  const [point, setPoint] = useState<SharedPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError('Live tracking needs the backend to be configured.');
      setLoading(false);
      return;
    }
    let active = true;
    const fetchOnce = async () => {
      const { data, error: rpcError } = await supabase!.rpc('latest_shared_location', { token });
      if (!active) return;
      if (rpcError) {
        setError(rpcError.message);
      } else {
        const row = (Array.isArray(data) ? data[0] : data) as SharedPoint | undefined;
        setPoint(row ?? null);
        setError(row ? null : 'No location has been shared on this link yet.');
      }
      setLoading(false);
    };
    void fetchOnce();
    const id = window.setInterval(fetchOnce, 20_000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [token]);

  return { point, loading, error };
}
