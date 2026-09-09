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
}: {
  progress: ProgressState;
  onShowOnMap: (lat: number, lng: number) => void;
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
        ⚠️ Altitude: above ~3,000 m ascend slowly and take the acclimatisation days at Samagaon
        and Samdo. Descend if you get worsening headache, nausea or breathlessness (signs of AMS).
        A registered guide is mandatory on this restricted route.
      </div>

      <div className="section-title">Daily stages · total ~{Math.round(totalDistanceKm)} km</div>

      {stages.map((stage) => {
        const done = progress.isDone(stage.id);
        const dest = stage.waypoints[stage.waypoints.length - 1];
        const elevations = stage.waypoints.map((w) => w.ele);
        const isRest = stage.distanceKm === 0;
        return (
          <div key={stage.id} className={`stage${done ? ' stage--done' : ''}`}>
            <div className="stage__head">
              <div className="stage__daynum">D{stage.day}</div>
              <div style={{ minWidth: 0 }}>
                <div className="stage__title">
                  {stage.from} → {stage.to}
                </div>
                <div className="stage__sub">{stage.hours}</div>
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

            {!isRest && <ElevationSparkline elevations={elevations} />}

            <p className="stage__desc">{stage.description}</p>

            <button
              className="btn btn--sm btn--ghost"
              style={{ marginTop: 4 }}
              onClick={() => onShowOnMap(dest.lat, dest.lng)}
            >
              🗺️ Show {stage.to} on map
            </button>
          </div>
        );
      })}
    </div>
  );
}
