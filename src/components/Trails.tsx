import type { ProgressState } from '../hooks/useProgress';
import { ElevationSparkline } from './ElevationSparkline';
import {
  BEST_SEASONS,
  PERMITS,
  TREK_SUMMARY,
  highestPointM,
  stages,
  totalDistanceKm,
} from '../data/trail';

export function Trails({
  progress,
  onShowOnMap,
  onViewRoute,
}: {
  progress: ProgressState;
  onShowOnMap: (lat: number, lng: number) => void;
  onViewRoute: (coords: [number, number][]) => void;
}) {
  const distanceDone = stages
    .filter((s) => progress.isDone(s.id))
    .reduce((sum, s) => sum + s.distanceKm, 0);

  return (
    <div className="view">
      <div className="stats-row">
        <div className="stat">
          <div className="stat__num">
            {progress.doneCount}/{stages.length}
          </div>
          <div className="stat__label">Stages done</div>
        </div>
        <div className="stat">
          <div className="stat__num">{Math.round(distanceDone)} km</div>
          <div className="stat__label">Distance walked</div>
        </div>
        <div className="stat">
          <div className="stat__num">{highestPointM.toLocaleString()} m</div>
          <div className="stat__label">High point</div>
        </div>
      </div>

      <div className="banner banner--info" style={{ marginTop: 12 }}>
        {TREK_SUMMARY}
      </div>

      <div className="card">
        <div className="card__title">Permits &amp; season</div>
        <ul style={{ margin: '0 0 8px', paddingLeft: 18 }} className="small">
          {PERMITS.map((p) => (
            <li key={p} style={{ marginBottom: 3 }}>
              {p}
            </li>
          ))}
        </ul>
        <p className="small muted" style={{ margin: 0 }}>
          {BEST_SEASONS}
        </p>
      </div>

      <div className="banner banner--warn">
        ⚠️ Altitude: above ~3,000 m ascend slowly and take the acclimatisation day at Sama Gaun
        (day hike to Base Camp / Birendra Lake). Descend if you get worsening headache, nausea or
        breathlessness (signs of AMS). A registered guide is mandatory on this restricted route.
      </div>

      <div className="section-title">Daily stages · total ~{Math.round(totalDistanceKm)} km</div>

      {stages.map((stage) => {
        const done = progress.isDone(stage.id);
        const start = stage.waypoints[0];
        const dest = stage.waypoints[stage.waypoints.length - 1];
        const elevations = stage.waypoints.map((w) => w.ele);
        const coords = stage.waypoints.map((w) => [w.lat, w.lng] as [number, number]);
        const isRest = stage.distanceKm === 0;
        return (
          <div key={stage.id} className={`stage${done ? ' stage--done' : ''}`}>
            <div className="stage__head">
              <div className="stage__daynum">D{stage.day}</div>
              <div style={{ minWidth: 0 }}>
                <div className="stage__title">
                  {stage.from} → {stage.to}
                </div>
                <div className="stage__sub">
                  {new Date(stage.date + 'T00:00:00').toLocaleDateString(undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  · {stage.hours}
                </div>
              </div>
              <label className="check">
                <span>{done ? 'Done' : 'Mark'}</span>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => progress.toggle(stage.id)}
                  aria-label={`Mark ${stage.from} to ${stage.to} done`}
                />
              </label>
            </div>

            <div className="stage__meta">
              {!isRest && (
                <span>
                  <b>{stage.distanceKm} km</b> dist
                </span>
              )}
              <span>
                <b>↑{stage.ascentM}</b> m
              </span>
              <span>
                <b>↓{stage.descentM}</b> m
              </span>
              <span>
                max <b>{stage.maxEleM.toLocaleString()} m</b>
              </span>
            </div>

            {!isRest && (
              <div className="elev">
                <ElevationSparkline elevations={elevations} />
                <div className="elev__labels">
                  <span>
                    start <b>{start.ele.toLocaleString()} m</b>
                  </span>
                  <span>
                    end <b>{dest.ele.toLocaleString()} m</b>
                  </span>
                </div>
              </div>
            )}

            <p className="stage__desc">{stage.description}</p>

            <div className="row" style={{ marginTop: 4, flexWrap: 'wrap' }}>
              {!isRest && (
                <button className="btn btn--sm btn--primary" onClick={() => onViewRoute(coords)}>
                  🧭 View route
                </button>
              )}
              <button className="btn btn--sm btn--ghost" onClick={() => onShowOnMap(dest.lat, dest.lng)}>
                📍 {stage.to}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
