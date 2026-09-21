// Places to show weather for — Kathmandu plus every overnight stop on the trek
// (in journey order), with the Larke La pass for the crossing-day forecast.
// Elevation is passed to Open-Meteo so temperatures are downscaled to each point.

export interface WeatherPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  ele: number;
}

export const weatherPoints: WeatherPoint[] = [
  { id: 'wp-kathmandu', name: 'Kathmandu', lat: 27.7172, lng: 85.324, ele: 1400 },
  { id: 'wp-machhakhola', name: 'Machha Khola', lat: 28.348, lng: 84.895, ele: 900 },
  { id: 'wp-jagat', name: 'Jagat', lat: 28.451, lng: 84.858, ele: 1340 },
  { id: 'wp-deng', name: 'Deng', lat: 28.523, lng: 84.845, ele: 1860 },
  { id: 'wp-ghap', name: 'Ghap', lat: 28.53, lng: 84.803, ele: 2160 },
  { id: 'wp-namrung', name: 'Namrung', lat: 28.541, lng: 84.797, ele: 2630 },
  { id: 'wp-lihi', name: 'Lihi', lat: 28.552, lng: 84.768, ele: 2920 },
  { id: 'wp-lho', name: 'Lho', lat: 28.573, lng: 84.74, ele: 3180 },
  { id: 'wp-shyala', name: 'Shyala', lat: 28.59, lng: 84.662, ele: 3500 },
  { id: 'wp-samagaon', name: 'Sama Gaun', lat: 28.606, lng: 84.629, ele: 3530 },
  { id: 'wp-samdo', name: 'Samdo', lat: 28.64, lng: 84.63, ele: 3860 },
  { id: 'wp-dharamsala', name: 'Dharamsala (Larke Phedi)', lat: 28.657, lng: 84.575, ele: 4460 },
  { id: 'wp-larkela', name: 'Larke La (pass)', lat: 28.671, lng: 84.508, ele: 5106 },
  { id: 'wp-bimthang', name: 'Bimthang', lat: 28.648, lng: 84.451, ele: 3720 },
  { id: 'wp-dharapani', name: 'Dharapani', lat: 28.523, lng: 84.362, ele: 1860 },
];
