import { useRef, useState } from 'react';
import type { TracksState } from '../hooks/useTracks';
import { formatDuration, formatPace } from '../lib/gpx';
import { trackColor } from '../lib/colors';

export function Tracks({
  tracks,
  onShowOnMap,
}: {
  tracks: TracksState;
  onShowOnMap: (lat: number, lng: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);
    try {
      const text = await file.text();
      tracks.addFromGpx(text, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read that GPX file.');
    }
  };

  return (
    <div className="view">
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>My tracks</div>

      <div className="banner banner--info">
        Record your hike on your <b>Pixel Watch</b> (or any watch/phone), export the activity as a{' '}
        <b>.gpx</b> file — from Fitbit, Google Fit, Strava or Garmin Connect — and import it here to
        see the actual route you walked over the planned trail, with distance, elevation and pace.
      </div>

      <input
        ref={fileRef}
        className="hidden-file"
        type="file"
        accept=".gpx,application/gpx+xml"
        onChange={onFile}
      />
      <button className="btn btn--primary" onClick={() => fileRef.current?.click()}>
        ＋ Import GPX file
      </button>

      {error && (
        <div className="banner banner--warn" style={{ marginTop: 10 }}>
          {error}
        </div>
      )}

      {tracks.tracks.length === 0 && (
        <div className="empty">No tracks imported yet. Import a .gpx file to get started.</div>
      )}

      <div style={{ marginTop: 12 }}>
        {tracks.tracks.map((t, idx) => {
          const s = t.stats;
          const line = tracks.latlngs(t.id);
          const start = line[0];
          return (
            <div key={t.id} className="track">
              <div className="spread">
                <div className="track__name">
                  <span className="swatch" style={{ background: trackColor(idx) }} /> {t.name}
                </div>
                <label className="pill-toggle">
                  <input
                    type="checkbox"
                    checked={Boolean(tracks.visible[t.id])}
                    onChange={() => tracks.toggleVisible(t.id)}
                  />
                  <span className="small">Map</span>
                </label>
              </div>

              <div className="track__stats">
                <span>
                  <b>{s.distanceKm.toFixed(1)} km</b>
                </span>
                <span>
                  ↑<b>{s.ascentM} m</b>
                </span>
                <span>
                  ↓<b>{s.descentM} m</b>
                </span>
                {s.maxEleM != null && (
                  <span>
                    max <b>{s.maxEleM.toLocaleString()} m</b>
                  </span>
                )}
                <span>
                  <b>{formatDuration(s.durationSec)}</b>
                </span>
                {s.avgPaceMinPerKm != null && (
                  <span>
                    <b>{formatPace(s.avgPaceMinPerKm)}</b>
                  </span>
                )}
              </div>

              <div className="row" style={{ marginTop: 9 }}>
                {start && (
                  <button className="btn btn--sm btn--ghost" onClick={() => onShowOnMap(start[0], start[1])}>
                    🗺️ Show on map
                  </button>
                )}
                <button
                  className="btn btn--sm btn--danger"
                  onClick={() => tracks.remove(t.id)}
                  style={{ marginLeft: 'auto' }}
                >
                  Delete
                </button>
              </div>
              {!t.synced && (
                <div className="small muted" style={{ marginTop: 6 }}>
                  Saved on this device{' '}
                  {/* synced flips true once signed in */}· sign in to sync across devices
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
