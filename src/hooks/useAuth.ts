import { useCallback, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseEnabled, supabase } from '../lib/supabase';

export interface AuthState {
  enabled: boolean;
  loading: boolean;
  session: Session | null;
  user: User | null;
  displayName: string | null;
  /** Public token that powers the live-tracking share link. */
  shareToken: string | null;
  /** Email + password (primary — no emails sent when confirmation is disabled). */
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string) => Promise<void>;
  /** Magic link (fallback — subject to Supabase's email rate limit). */
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
}

/**
 * Consumes a magic-link / OAuth redirect that returns tokens in the URL hash.
 * Works even when the token lands after our app's own route hash
 * (e.g. `#/news#access_token=...`), then cleans the URL back to a real route.
 */
async function consumeAuthRedirect(): Promise<void> {
  if (typeof window === 'undefined' || !supabase) return;
  const hash = window.location.hash || '';
  const tokenIdx = hash.indexOf('access_token=');
  if (tokenIdx === -1) return;

  const params = new URLSearchParams(hash.substring(tokenIdx));
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }

  // Preserve any app route that preceded the token; otherwise land on News.
  const hashBeforeToken = hash.lastIndexOf('#', tokenIdx - 1);
  let route = hashBeforeToken > 0 ? hash.substring(0, hashBeforeToken) : '';
  if (!route || route === '#') route = '#/news';
  window.location.hash = route;
}

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(isSupabaseEnabled);
  const [displayName, setName] = useState<string | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const user = session?.user ?? null;

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      await consumeAuthRedirect();
      const { data } = await supabase!.auth.getSession();
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Ensure a profile row exists and load its share_token + display name.
  useEffect(() => {
    if (!supabase || !user) {
      setName(null);
      setShareToken(null);
      return;
    }
    let active = true;
    (async () => {
      await supabase!
        .from('profiles')
        .upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true });
      const { data } = await supabase!
        .from('profiles')
        .select('display_name, share_token')
        .eq('id', user.id)
        .maybeSingle();
      if (!active || !data) return;
      setName(data.display_name ?? null);
      setShareToken(data.share_token ?? null);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Backend not configured.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUpWithPassword = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Backend not configured.');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }, []);

  const signIn = useCallback(async (email: string) => {
    if (!supabase) throw new Error('Backend not configured.');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      // Redirect to the app root (no route hash) so the returned token doesn't
      // collide with our hash router. consumeAuthRedirect() handles it on load.
      options: {
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const setDisplayName = useCallback(
    async (name: string) => {
      if (!supabase || !user) return;
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: name })
        .eq('id', user.id);
      if (error) throw error;
      setName(name);
    },
    [user],
  );

  return {
    enabled: isSupabaseEnabled,
    loading,
    session,
    user,
    displayName,
    shareToken,
    signInWithPassword,
    signUpWithPassword,
    signIn,
    signOut,
    setDisplayName,
  };
}
