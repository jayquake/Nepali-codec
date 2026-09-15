import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSharedTrack } from '../hooks/useLiveLocation';
import { routeLine } from '../data/trail';

const hikerIcon = L.divIcon({
  className: 'gps-pin',
  html: '<div class="gps-dot"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function Follow({ lat, lng }: { lat?: number; lng?: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat != null && lng != null) map.setView([lat, lng], Math.max(map.getZoom(), 13));
  }, [lat, lng, map]);
  return null;
}

export function Track({ token }: { token: string }) {
  const { point, loading, error } = useSharedTrack(token);

  const name = point?.display_name?.trim() || 'A hiker';
  const updated = point ? new Date(point.recorded_at).toLocaleString() : null;

  return (
    <div className="follow">
      <div className="follow__bar">
        <div style={{ fontWeight: 700 }}>
          🥾 Following {name} · Manaslu Circuit
        </div>
        <div className="small muted">
          {loading && !point && 'Connecting…'}
          {!loading && !point && !error && 'Waiting for the hiker to start sharing…'}
          {!loading && !point && error && error}
          {point && updated && `Last update ${updated}`}
          {point?.elevation != null && ` · ${Math.round(point.elevation)} m`}
        </div>
      </div>
      <div className="follow__map">
        <MapContainer center={[28.6, 84.63]} zoom={10} zoomControl={false} scrollWheelZoom>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={17}
          />
          <Polyline positions={routeLine} pathOptions={{ color: '#f4c95d', weight: 4, opacity: 0.85 }} />
          {point && (
            <>
              {point.accuracy != null && (
                <CircleMarker
                  center={[point.lat, point.lng]}
                  radius={Math.min(40, Math.max(6, point.accuracy / 12))}
                  pathOptions={{ color: '#4ea8de', weight: 1, fillColor: '#4ea8de', fillOpacity: 0.12 }}
                />
              )}
              <Marker position={[point.lat, point.lng]} icon={hikerIcon} />
              <Follow lat={point.lat} lng={point.lng} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
