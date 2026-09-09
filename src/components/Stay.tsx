import { lodges } from '../data/lodges';

export function Stay({ onShowOnMap }: { onShowOnMap: (lat: number, lng: number) => void }) {
  // Lodges are already listed in route order in the data file.
  return (
    <div className="view">
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Places to stay</div>
      <div className="banner banner--info">
        Teahouses along the circuit, in walking order from Machha Khola to Dharapani. Standards and
        availability shift each season — book ahead in spring &amp; autumn peak, and carry a warm
        sleeping bag for the high camps at Samdo and Dharamsala.
      </div>

      <div className="card">
        {lodges.map((lo) => (
          <div key={lo.id} className="lodge" onClick={() => onShowOnMap(lo.lat, lo.lng)}>
            <div className="spread">
              <div style={{ minWidth: 0 }}>
                <div className="lodge__name">{lo.name}</div>
                <div className="small muted">
                  {lo.village} · {lo.ele.toLocaleString()} m
                </div>
              </div>
              <span className="badge">🗺️ Map</span>
            </div>
            <div className="lodge__notes">{lo.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
