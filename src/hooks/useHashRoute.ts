import { useCallback, useEffect, useState } from 'react';

export interface Route {
  name: string;
  token?: string;
}

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 'track' && parts[1]) return { name: 'track', token: decodeURIComponent(parts[1]) };
  return { name: parts[0] || 'map' };
}

/** Minimal dependency-free hash router — ideal for a static GitHub Pages SPA. */
export function useHashRoute(): [Route, (name: string) => void] {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((name: string) => {
    window.location.hash = `#/${name}`;
  }, []);

  return [route, navigate];
}
