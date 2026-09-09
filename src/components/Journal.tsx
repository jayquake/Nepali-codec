import { useEffect, useRef, useState } from 'react';
import type { AuthState } from '../hooks/useAuth';
import type { GeolocationState } from '../hooks/useGeolocation';
import { supabase } from '../lib/supabase';

interface JournalRow {
  id: string;
  caption: string | null;
  image_path: string;
  lat: number | null;
  lng: number | null;
  taken_at: string;
}

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function Journal({ auth, geo }: { auth: AuthState; geo: GeolocationState }) {
  const [rows, setRows] = useState<JournalRow[]>([]);
  const [caption, setCaption] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const publicUrl = (path: string) =>
    supabase ? supabase.storage.from('photos').getPublicUrl(path).data.publicUrl : '';

  const load = async () => {
    if (!supabase || !auth.user) return;
    setLoading(true);
    const { data } = await supabase
      .from('journal')
      .select('id, caption, image_path, lat, lng, taken_at')
      .eq('user_id', auth.user.id)
      .order('taken_at', { ascending: false });
    setRows((data as JournalRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !supabase || !auth.user) return;
    setBusy(true);
    setError(null);
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `${auth.user.id}/${newId()}.${ext}`;
      const up = await supabase.storage
        .from('photos')
        .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: false });
      if (up.error) throw up.error;

      const pos = geo.position;
      const ins = await supabase.from('journal').insert({
        user_id: auth.user.id,
        caption: caption.trim() || null,
        image_path: path,
        lat: pos?.lat ?? null,
        lng: pos?.lng ?? null,
        taken_at: new Date().toISOString(),
      });
      if (ins.error) throw ins.error;
      setCaption('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setBusy(false);
    }
  };

  if (!auth.enabled) {
    return (
      <div className="view">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Photo journal</div>
        <div className="banner banner--info">
          The photo journal needs the backend. Follow the README to connect Supabase, then your
          photos, captions and locations sync across devices.
        </div>
      </div>
    );
  }

  if (!auth.user) {
    return (
      <div className="view">
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Photo journal</div>
        <div className="banner banner--info">
          Sign in (top-right) to capture photos tied to your location along the trek.
        </div>
      </div>
    );
  }

  return (
    <div className="view">
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Photo journal</div>

      <div className="card">
        <div className="field">
          <label>Caption (optional)</label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Sunrise on Manaslu from Lho"
          />
        </div>
        <input
          ref={fileRef}
          className="hidden-file"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFile}
        />
        <button className="btn btn--primary" onClick={() => fileRef.current?.click()} disabled={busy}>
          {busy ? 'Uploading…' : '📷 Add photo'}
        </button>
        <div className="small muted" style={{ marginTop: 6 }}>
          {geo.position
            ? `Location will be attached (±${Math.round(geo.position.accuracy)} m).`
            : 'Turn on location (Map tab) to geotag photos.'}
        </div>
        {error && (
          <div className="banner banner--warn" style={{ marginTop: 8 }}>
            {error}
          </div>
        )}
      </div>

      {loading && <div className="spinner">Loading journal…</div>}
      {!loading && rows.length === 0 && (
        <div className="empty">No entries yet — add your first photo above.</div>
      )}

      {rows.map((r) => (
        <div key={r.id} className="journal">
          <img src={publicUrl(r.image_path)} alt={r.caption ?? 'Journal photo'} loading="lazy" />
          <div className="journal__body">
            {r.caption && <div className="journal__caption">{r.caption}</div>}
            <div className="journal__meta">
              {new Date(r.taken_at).toLocaleString()}
              {r.lat != null && r.lng != null && ` · ${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
