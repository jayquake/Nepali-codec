import { useWeather } from '../hooks/useWeather';
import { weatherPoints } from '../data/weatherPoints';
import { weatherInfo } from '../data/weatherCodes';

function dow(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short' });
}

export function Conditions() {
  const { data, loading, error, updatedAt, reload } = useWeather(weatherPoints);

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
        High-altitude weather changes fast. Temperatures shown are the free-air model estimate for
        each point’s elevation; expect colder nights and strong wind chill on the Larke La.
      </div>

      {loading && !updatedAt && <div className="spinner">Loading forecast…</div>}

      {weatherPoints.map((p) => {
        const wx = data[p.id];
        const cur = wx?.current;
        const info = weatherInfo(cur?.code);
        return (
          <div key={p.id} className="wx">
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
                💨 {Math.round(cur.wind)} km/h wind · 💧 {cur.humidity}% humidity
              </div>
            )}

            {wx && wx.daily.length > 0 && (
              <div className="forecast">
                {wx.daily.map((d) => {
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
          </div>
        );
      })}
    </div>
  );
}
