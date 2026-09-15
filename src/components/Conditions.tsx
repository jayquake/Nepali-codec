import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { weatherPoints, type WeatherPoint } from '../data/weatherPoints';
import { weatherInfo } from '../data/weatherCodes';

function dow(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' });
}

function fullDay(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function Conditions() {
  const { data, loading, error, updatedAt, reload } = useWeather(weatherPoints);
  const [detail, setDetail] = useState<WeatherPoint | null>(null);

  return (
    <div className="view">
      <div className="spread" style={{ marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Trail conditions</div>
          <div className="small muted">
            {updatedAt
              ? `Updated ${new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Live forecast · Open-Meteo'}
          </div>
        </div>
        <button className="btn btn--sm" onClick={reload} disabled={loading}>
          {loading ? '…' : '↻ Refresh'}
        </button>
      </div>

      {error && (
        <div className="banner banner--warn">
          Couldn’t refresh weather ({error}). Showing the last saved forecast if available — the
          app caches it for offline use on the trail.
        </div>
      )}

      <div className="banner banner--info">
        High-altitude weather changes fast. Tap a place for its full 7-day forecast. Temperatures
        are the free-air model estimate for each point’s elevation; expect colder nights and strong
        wind chill on the Larke La.
      </div>

      {loading && !updatedAt && <div className="spinner">Loading forecast…</div>}

      {weatherPoints.map((p) => {
        const wx = data[p.id];
        const cur = wx?.current;
        const info = weatherInfo(cur?.code);
        return (
          <button
            key={p.id}
            className="wx wx--tap"
            onClick={() => setDetail(p)}
            aria-label={`${p.name} 7-day forecast`}
          >
            <div className="wx__top">
              <span className="wx__icon" aria-hidden>
                {info.icon}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="wx__name">
                  {p.name} · {p.ele.toLocaleString()} m
                </div>
                <div className="wx__desc">{cur ? info.label : 'No current data'}</div>
              </div>
              {cur && <div className="wx__temp">{Math.round(cur.temperature)}°</div>}
            </div>

            {cur && (
              <div className="small muted" style={{ marginTop: 6 }}>
                💨 {Math.round(cur.wind)} km/h · 💧 {cur.humidity}% · tap for 7 days ›
              </div>
            )}

            {wx && wx.daily.length > 0 && (
              <div className="forecast">
                {wx.daily.slice(0, 5).map((d) => {
                  const di = weatherInfo(d.code);
                  return (
                    <div key={d.date} className="fc-day">
                      <div className="fc-day__dow">{dow(d.date)}</div>
                      <div className="fc-day__icon" aria-hidden>
                        {di.icon}
                      </div>
                      <div className="fc-day__hi">{Math.round(d.tmax)}°</div>
                      <div className="fc-day__lo">{Math.round(d.tmin)}°</div>
                    </div>
                  );
                })}
              </div>
            )}
          </button>
        );
      })}

      {detail && (
        <div className="sheet-backdrop" onClick={() => setDetail(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="spread" style={{ marginBottom: 4 }}>
              <div style={{ fontWeight: 700 }}>
                {detail.name} · {detail.ele.toLocaleString()} m
              </div>
              <button className="btn btn--sm btn--ghost" onClick={() => setDetail(null)}>
                ✕
              </button>
            </div>

            {(() => {
              const wx = data[detail.id];
              const cur = wx?.current;
              if (cur) {
                const info = weatherInfo(cur.code);
                return (
                  <div className="small muted" style={{ marginBottom: 10 }}>
                    Now: {info.icon} {info.label} · {Math.round(cur.temperature)}° · 💨{' '}
                    {Math.round(cur.wind)} km/h · 💧 {cur.humidity}%
                  </div>
                );
              }
              return null;
            })()}

            {data[detail.id]?.daily.map((d) => {
              const di = weatherInfo(d.code);
              return (
                <div key={d.date} className="wx-drow">
                  <div className="wx-drow__day">{fullDay(d.date)}</div>
                  <div className="wx-drow__icon" aria-hidden>
                    {di.icon}
                  </div>
                  <div className="wx-drow__mid">
                    <div className="wx-drow__label">{di.label}</div>
                    <div className="small muted">
                      🌧️ {d.precipProb != null ? `${d.precipProb}%` : '—'}
                      {d.precip > 0 ? ` · ${d.precip.toFixed(1)} mm` : ''}
                      {d.windMax != null ? ` · 💨 ${Math.round(d.windMax)} km/h` : ''}
                    </div>
                  </div>
                  <div className="wx-drow__temp">
                    <b>{Math.round(d.tmax)}°</b>
                    <span className="muted"> {Math.round(d.tmin)}°</span>
                  </div>
                </div>
              );
            })}

            {!data[detail.id]?.daily.length && (
              <div className="empty">No forecast available — try refreshing when online.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
