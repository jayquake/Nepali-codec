import { useEffect, useState } from 'react';

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

export interface GeolocationState {
  supported: boolean;
  position: GeoPosition | null;
  error: string | null;
}

/**
 * Watches the device GPS position while `enabled` is true. Handles permission
 * denial and unsupported browsers gracefully (no throw).
 */
export function useGeolocation(enabled: boolean): GeolocationState {
  const supported = typeof navigator !== 'undefined' && 'geolocation' in navigator;
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!supported) {
      setError('Geolocation is not supported on this device or browser.');
      return;
    }
    setError(null);
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setError(null);
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission denied. Enable it in your browser settings to see your position.'
            : err.message || 'Could not get your location.',
        );
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [enabled, supported]);

  return { supported, position, error };
}
