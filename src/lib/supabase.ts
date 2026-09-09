import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// The app is designed to run WITHOUT a backend (offline / on-device only). When the
// two Supabase env vars are present it upgrades to synced progress, live-location
// sharing, an editable news feed and a photo journal.
//
// The anon key is public by design — Row Level Security in supabase/schema.sql is what
// actually protects the data — so it is safe to ship in this static bundle.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseEnabled
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // We consume the magic-link redirect ourselves (see useAuth), because this
        // app uses hash-based routing and Supabase's own hash parser can't handle a
        // token that lands after a second '#'.
        detectSessionInUrl: false,
      },
    })
  : null;
