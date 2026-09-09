import { useState } from 'react';
import type { AuthState } from '../hooks/useAuth';

export function Account({
  auth,
  sharing,
  onToggleSharing,
  onClose,
}: {
  auth: AuthState;
  sharing: boolean;
  onToggleSharing: (v: boolean) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(auth.displayName ?? '');

  const shareLink = auth.shareToken
    ? `${window.location.origin}${import.meta.env.BASE_URL}#/track/${auth.shareToken}`
    : '';

  const sendLink = async () => {
    setBusy(true);
    setError(null);
    try {
      await auth.signIn(email.trim());
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send the link.');
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked; the field is selectable anyway */
    }
  };

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="spread" style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 700 }}>Account &amp; sharing</div>
          <button className="btn btn--sm btn--ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        {!auth.enabled && (
          <div className="banner banner--info">
            Backend not configured, so the app runs in offline / on-device mode: trails, map,
            weather, lodges and GPX import all work, and progress is saved on this device. Add
            Supabase (see the README) to enable sign-in, cross-device sync, live location sharing,
            the news feed and the photo journal.
          </div>
        )}

        {auth.enabled && !auth.user && (
          <>
            <p className="small muted" style={{ marginTop: 0 }}>
              Sign in with a magic link — no password. We’ll email you a one-tap link.
            </p>
            {sent ? (
              <div className="banner banner--info">
                Check your email for the sign-in link, then reopen this page.
              </div>
            ) : (
              <>
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                {error && <div className="banner banner--warn">{error}</div>}
                <button className="btn btn--primary" onClick={sendLink} disabled={busy || !email.includes('@')}>
                  {busy ? 'Sending…' : 'Send magic link'}
                </button>
              </>
            )}
          </>
        )}

        {auth.user && (
          <>
            <div className="small muted" style={{ marginBottom: 10 }}>
              Signed in as {auth.user.email}
            </div>

            <div className="field">
              <label>Display name (shown to followers)</label>
              <div className="row">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <button
                  className="btn btn--sm"
                  onClick={() => void auth.setDisplayName(name.trim())}
                  disabled={!name.trim()}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="card" style={{ marginTop: 6 }}>
              <label className="pill-toggle" style={{ fontSize: 14 }}>
                <input
                  type="checkbox"
                  checked={sharing}
                  onChange={(e) => onToggleSharing(e.target.checked)}
                />
                <b>Share my live location</b>
              </label>
              <div className="small muted" style={{ marginTop: 6 }}>
                While on, your GPS position is posted every ~15 s so friends and family can follow
                along with the link below. Turn it off any time.
              </div>

              {sharing && shareLink && (
                <>
                  <div className="field" style={{ marginTop: 10 }}>
                    <label>Public follow link</label>
                    <input readOnly value={shareLink} onFocus={(e) => e.target.select()} />
                  </div>
                  <button className="btn btn--sm btn--primary" onClick={copy}>
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </>
              )}
            </div>

            <button className="btn btn--ghost" style={{ marginTop: 12 }} onClick={() => void auth.signOut()}>
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
