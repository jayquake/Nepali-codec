import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { GeolocationState } from '../hooks/useGeolocation';
import type { TracksState } from '../hooks/useTracks';
import type { MapFocus } from '../App';
import { allWaypoints, routeLine } from '../data/trail';
import { lodges } from '../data/lodges';
import { trackColor } from '../lib/colors';

/** 1x1 transparent PNG — used so a failed tile reveals the layer beneath. */
const BLANK_TILE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const lodgeIcon = L.divIcon({
  className: 'lodge-pin',
  html: '<div class="lodge-pin__d">🛏️</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const userIcon = L.divIcon({
  className: 'gps-pin',
  html: '<div class="gps-dot"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FitRoute() {
  const map = useMap();
  useEffect(() => {
    if (routeLine.length) {
      map.fitBounds(routeLine as [number, number][], { padding: [30, 30] });
    }
  }, [map]);
  return null;
}

function FlyToFocus({ focus }: { focus: MapFocus | null }) {
  const map = useMap();
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lng], 13, { duration: 0.8 });
  }, [focus, map]);
  return null;
}

function FitHighlight({ highlight }: { highlight: MapHighlight | null }) {
  const map = useMap();
  useEffect(() => {
    if (highlight && highlight.coords.length) {
      map.fitBounds(highlight.coords, { padding: [50, 50], maxZoom: 13 });
    }
  }, [highlight, map]);
  return null;
}

function CenterOnUser({ trigger, lat, lng }: { trigger: number; lat?: number; lng?: number }) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0 && lat != null && lng != null) {
      map.flyTo([lat, lng], Math.max(map.getZoom(), 14), { duration: 0.8 });
    }
  }, [trigger, lat, lng, map]);
  return null;
}

export interface MapHighlight {
  coords: [number, number][];
  key: number;
}

export function MapView({
  geo,
  locating,
  onToggleLocate,
  tracks,
  focus,
  highlight,
}: {
  geo: GeolocationState;
  locating: boolean;
  onToggleLocate: () => void;
  tracks: TracksState;
  focus: MapFocus | null;
  highlight: MapHighlight | null;
}) {
  const [showVillages, setShowVillages] = useState(true);
  const [showLodges, setShowLodges] = useState(true);
  const [showTracks, setShowTracks] = useState(true);
  const [centerTrigger, setCenterTrigger] = useState(0);

  const pos = geo.position;

  const visibleTracks = useMemo(
    () => tracks.tracks.filter((t) => tracks.visible[t.id]),
    [tracks.tracks, tracks.visible],
  );

  const handleLocate = () => {
    if (!locating) onToggleLocate();
    setCenterTrigger((n) => n + 1);
  };

  return (
    <div className="map-view">
      <MapContainer
        center={[28.6, 84.63]}
        zoom={10}
        minZoom={7}
        maxZoom={17}
        zoomControl={false}
        scrollWheelZoom
      >
        {/* Offline base: tile pack shipped with the app (scripts/fetch-tiles.mjs) and
            precached by the service worker. Sits UNDER the live layer, so when OSM
            tiles fail with no signal this still draws instead of going blank.
            maxNativeZoom lets Leaflet upscale past z12 rather than showing nothing. */}
        <TileLayer
          url={`${import.meta.env.BASE_URL}tiles/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          minZoom={7}
          maxNativeZoom={12}
          maxZoom={17}
          errorTileUrl={BLANK_TILE}
        />
        {/* Live tiles on top for full detail and coverage when there is signal. */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
          maxZoom={17}
          maxNativeZoom={17}
          keepBuffer={4}
          // A failed live tile must be transparent, not blank, so the offline
          // layer underneath shows through.
          errorTileUrl={BLANK_TILE}
        />
        <FitRoute />
        <FlyToFocus focus={focus} />
        <FitHighlight highlight={highlight} />
        <CenterOnUser trigger={centerTrigger} lat={pos?.lat} lng={pos?.lng} />

        <Polyline positions={routeLine} pathOptions={{ color: '#f4c95d', weight: 4, opacity: 0.9 }} />

        {highlight && highlight.coords.length > 0 && (
          <>
            <Polyline
              positions={highlight.coords}
              pathOptions={{ color: '#0b1f17', weight: 9, opacity: 0.55 }}
            />
            <Polyline
              positions={highlight.coords}
              pathOptions={{ color: '#e5654b', weight: 5, opacity: 1 }}
            />
            <CircleMarker
              center={highlight.coords[0]}
              radius={6}
              pathOptions={{ color: '#0b1f17', weight: 2, fillColor: '#74c69d', fillOpacity: 1 }}
            >
              <Tooltip>Start</Tooltip>
            </CircleMarker>
            <CircleMarker
              center={highlight.coords[highlight.coords.length - 1]}
              radius={6}
              pathOptions={{ color: '#0b1f17', weight: 2, fillColor: '#e5654b', fillOpacity: 1 }}
            >
              <Tooltip>End</Tooltip>
            </CircleMarker>
          </>
        )}

        {showVillages &&
          allWaypoints.map((wp) => {
            const isPass = /larke la/i.test(wp.name);
            return (
              <CircleMarker
                key={wp.name}
                center={[wp.lat, wp.lng]}
                radius={isPass ? 7 : 5}
                pathOptions={{
                  color: '#0b1f17',
                  weight: 2,
                  fillColor: isPass ? '#e5654b' : '#f4c95d',
                  fillOpacity: 1,
                }}
              >
                <Tooltip direction="top">
                  <b>{wp.name}</b>
                  <br />
                  {wp.ele.toLocaleString()} m
                </Tooltip>
              </CircleMarker>
            );
          })}

        {showLodges &&
          lodges.map((lo) => (
            <Marker key={lo.id} position={[lo.lat, lo.lng]} icon={lodgeIcon}>
              <Tooltip direction="top">
                <b>{lo.name}</b>
                <br />
                {lo.village} · {lo.ele.toLocaleString()} m
              </Tooltip>
            </Marker>
          ))}

        {showTracks &&
          visibleTracks.map((t) => {
            const idx = tracks.tracks.indexOf(t);
            return (
              <Polyline
                key={t.id}
                positions={tracks.latlngs(t.id)}
                pathOptions={{ color: trackColor(idx), weight: 3.5, opacity: 0.95 }}
              />
            );
          })}

        {pos && (
          <>
            <CircleMarker
              center={[pos.lat, pos.lng]}
              radius={Math.min(40, Math.max(6, pos.accuracy / 12))}
              pathOptions={{ color: '#4ea8de', weight: 1, fillColor: '#4ea8de', fillOpacity: 0.12 }}
            />
            <Marker position={[pos.lat, pos.lng]} icon={userIcon}>
              <Tooltip direction="top">You are here · ±{Math.round(pos.accuracy)} m</Tooltip>
            </Marker>
          </>
        )}
      </MapContainer>

      <div className="map-legend">
        <label className="pill-toggle">
          <input type="checkbox" checked={showVillages} onChange={(e) => setShowVillages(e.target.checked)} />
          <span>📍 Villages</span>
        </label>
        <br />
        <label className="pill-toggle">
          <input type="checkbox" checked={showLodges} onChange={(e) => setShowLodges(e.target.checked)} />
          <span>🛏️ Lodges</span>
        </label>
        {tracks.tracks.length > 0 && (
          <>
            <br />
            <label className="pill-toggle">
              <input type="checkbox" checked={showTracks} onChange={(e) => setShowTracks(e.target.checked)} />
              <span>📈 My tracks</span>
            </label>
          </>
        )}
      </div>

      <div className="map-fab">
        <button
          onClick={handleLocate}
          aria-label={locating ? 'Center on my location' : 'Show my location'}
          title={locating ? 'Center on me' : 'Locate me'}
          style={locating ? { color: '#4ea8de', borderColor: '#4ea8de' } : undefined}
        >
          {locating ? '🎯' : '📍'}
        </button>
      </div>

      {locating && geo.error && <div className="map-toast">{geo.error}</div>}
      {locating && !geo.error && !pos && <div className="map-toast">Getting your location…</div>}
    </div>
  );
}
