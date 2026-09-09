import { useEffect, useState } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import { useAuth } from './hooks/useAuth';
import { useGeolocation } from './hooks/useGeolocation';
import { useProgress } from './hooks/useProgress';
import { useTracks } from './hooks/useTracks';
import { useLiveLocation } from './hooks/useLiveLocation';
import { Nav, type ViewName } from './components/Nav';
import { MapView } from './components/MapView';
import { Trails } from './components/Trails';
import { Conditions } from './components/Conditions';
import { Stay } from './components/Stay';
import { News } from './components/News';
import { Journal } from './components/Journal';
import { Tracks } from './components/Tracks';
import { Account } from './components/Account';
import { Track } from './components/Track';
import { TREK_NAME } from './data/trail';

export interface MapFocus {
  lat: number;
  lng: number;
  key: number;
}

const ICON = `${import.meta.env.BASE_URL}icons/icon.svg`;

export function App() {
  const [route, navigate] = useHashRoute();
  const auth = useAuth();
  const [locating, setLocating] = useState(false);
  const [sharing, setSharing] = useState(false);
  const geo = useGeolocation(locating || sharing);
  useLiveLocation(auth.user, sharing, geo.position);
  const progress = useProgress(auth.user);
  const tracks = useTracks(auth.user);

  const [showAccount, setShowAccount] = useState(false);
  const [mapFocus, setMapFocus] = useState<MapFocus | null>(null);

  // Turning on sharing implies we need the GPS running.
  useEffect(() => {
    if (sharing) setLocating(true);
  }, [sharing]);

  // Sharing needs a signed-in account; drop it if the user signs out.
  useEffect(() => {
    if (!auth.user && sharing) setSharing(false);
  }, [auth.user, sharing]);

  // Public follower view — full screen, no app chrome.
  if (route.name === 'track' && route.token) {
    return <Track token={route.token} />;
  }

  const view = route.name as ViewName;

  const focusOnMap = (lat: number, lng: number) => {
    setMapFocus({ lat, lng, key: Date.now() });
    navigate('map');
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <img src={ICON} alt="" />
          <div className="app__title">
            {TREK_NAME}
            <small>Nepal · travel companion</small>
          </div>
        </div>
        <div className="app__actions">
          <button
            className="btn btn--sm btn--ghost"
            onClick={() => setShowAccount((s) => !s)}
            aria-label="Account"
          >
            {auth.user ? '👤' : 'Sign in'}
          </button>
        </div>
      </header>

      {showAccount && (
        <Account
          auth={auth}
          sharing={sharing}
          onToggleSharing={setSharing}
          onClose={() => setShowAccount(false)}
        />
      )}

      <main className="app__main">
        {view === 'map' && (
          <MapView
            geo={geo}
            locating={locating}
            onToggleLocate={() => setLocating((l) => !l)}
            tracks={tracks}
            focus={mapFocus}
          />
        )}
        {view === 'trails' && <Trails progress={progress} onShowOnMap={focusOnMap} />}
        {view === 'conditions' && <Conditions />}
        {view === 'stay' && <Stay onShowOnMap={focusOnMap} />}
        {view === 'news' && <News auth={auth} />}
        {view === 'journal' && <Journal auth={auth} geo={geo} />}
        {view === 'tracks' && <Tracks tracks={tracks} onShowOnMap={focusOnMap} />}
      </main>

      <Nav active={view} onNavigate={navigate} />
    </div>
  );
}
