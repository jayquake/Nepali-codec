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
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
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
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });
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

  const signIn = useCallback(async (email: string) => {
    if (!supabase) throw new Error('Backend not configured.');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
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
    signIn,
    signOut,
    setDisplayName,
  };
}
