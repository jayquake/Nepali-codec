import { useCallback, useEffect, useState } from 'react';
import type { WeatherPoint } from '../data/weatherPoints';
import { loadJSON, saveJSON } from '../lib/storage';
import { SNAPSHOT_AT, weatherSnapshot } from '../data/weatherSnapshot.generated';

// Last good forecast is mirrored to localStorage so a refresh with no signal
// still shows real data (with an "as of" time) instead of an empty tab.
const WX_CACHE = 'manaslu.weather.v1';
interface WxCache { data: Record<string, PointWeather>; at: number }

export interface DailyForecast {
  date: string;
  code: number;
  tmax: number;
  tmin: number;
  precip: number;
  precipProb: number | null;
  windMax: number | null;
}

export interface PointWeather {
  current: { temperature: number; code: number; wind: number; humidity: number } | null;
  daily: DailyForecast[];
}

interface OpenMeteoResponse {
  current?: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max?: number[];
    wind_speed_10m_max?: number[];
  };
}

function normalize(d: OpenMeteoResponse | undefined): PointWeather {
  const daily: DailyForecast[] = [];
  if (d?.daily) {
    for (let i = 0; i < d.daily.time.length; i++) {
      daily.push({
        date: d.daily.time[i],
        code: d.daily.weather_code[i],
        tmax: d.daily.temperature_2m_max[i],
        tmin: d.daily.temperature_2m_min[i],
        precip: d.daily.precipitation_sum[i],
        precipProb: d.daily.precipitation_probability_max?.[i] ?? null,
        windMax: d.daily.wind_speed_10m_max?.[i] ?? null,
      });
    }
  }
  return {
    current: d?.current
      ? {
          temperature: d.current.temperature_2m,
          code: d.current.weather_code,
          wind: d.current.wind_speed_10m,
          humidity: d.current.relative_humidity_2m,
        }
      : null,
    daily,
  };
}

export interface WeatherState {
  data: Record<string, PointWeather>;
  loading: boolean;
  error: string | null;
  updatedAt: number | null;
  reload: () => void;
}

/**
 * Fetches current conditions + a 5-day forecast for every point in one Open-Meteo
 * request (keyless, CORS-friendly). Responses are cached by the service worker so the
 * last-known forecast still shows offline.
 */
export function useWeather(points: WeatherPoint[]): WeatherState {
  const [data, setData] = useState<Record<string, PointWeather>>(() => {
    const cached = loadJSON<WxCache | null>(WX_CACHE, null);
    return cached?.data && Object.keys(cached.data).length ? cached.data : weatherSnapshot;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const lat = points.map((p) => p.lat).join(',');
      const lng = points.map((p) => p.lng).join(',');
      const elev = points.map((p) => p.ele).join(',');
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&elevation=${elev}` +
        `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max` +
        `&timezone=auto&forecast_days=7`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Weather service returned ${res.status}.`);
      const json = (await res.json()) as OpenMeteoResponse | OpenMeteoResponse[];
      const arr = Array.isArray(json) ? json : [json];
      const map: Record<string, PointWeather> = {};
      points.forEach((p, i) => {
        map[p.id] = normalize(arr[i]);
      });
      setData(map);
      const at = Date.now();
      setUpdatedAt(at);
      saveJSON(WX_CACHE, { data: map, at } satisfies WxCache);
    } catch (e) {
      // Offline or the service is unreachable: fall back to the last good forecast.
      const cached = loadJSON<WxCache | null>(WX_CACHE, null);
      if (cached?.data && Object.keys(cached.data).length) {
        setData(cached.data);
        setUpdatedAt(cached.at);
        setError('Offline — showing the last forecast saved on this device.');
      } else {
        // Never fetched on this device: fall back to the forecast baked into the
        // app at build time, clearly labelled with when it was captured.
        setData(weatherSnapshot);
        setUpdatedAt(Date.parse(SNAPSHOT_AT));
        setError(
          `Offline — no forecast saved yet, showing the one built into the app on ` +
            `${new Date(SNAPSHOT_AT).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}.`,
        );
      }
    } finally {
      setLoading(false);
    }
  }, [points]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, updatedAt, reload: load };
}
