// Key points along the route to fetch weather for. Kept short so the Conditions
// screen stays fast and offline-cache-friendly.

export interface WeatherPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  ele: number;
}

export const weatherPoints: WeatherPoint[] = [
  { id: 'wp-jagat', name: 'Jagat', lat: 28.451, lng: 84.858, ele: 1340 },
  { id: 'wp-namrung', name: 'Namrung', lat: 28.541, lng: 84.797, ele: 2630 },
  { id: 'wp-samagaon', name: 'Samagaon', lat: 28.606, lng: 84.629, ele: 3530 },
  { id: 'wp-samdo', name: 'Samdo', lat: 28.64, lng: 84.63, ele: 3860 },
  { id: 'wp-dharamsala', name: 'Dharamsala', lat: 28.657, lng: 84.575, ele: 4460 },
  { id: 'wp-larkela', name: 'Larke La (pass)', lat: 28.671, lng: 84.508, ele: 5106 },
  { id: 'wp-bimthang', name: 'Bimthang', lat: 28.648, lng: 84.451, ele: 3720 },
];
