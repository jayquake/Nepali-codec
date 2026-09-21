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
  { id: 'wp-machhakhola', name: 'Machha Khola', lat: 28.2293, lng: 84.8738, ele: 900 },
  { id: 'wp-jagat', name: 'Jagat', lat: 28.3514, lng: 84.8959, ele: 1340 },
  { id: 'wp-deng', name: 'Deng', lat: 28.4791, lng: 84.867, ele: 1860 },
  { id: 'wp-ghap', name: 'Ghap', lat: 28.5312, lng: 84.8257, ele: 2160 },
  { id: 'wp-namrung', name: 'Namrung', lat: 28.5451, lng: 84.7679, ele: 2630 },
  { id: 'wp-lihi', name: 'Lihi', lat: 28.5613, lng: 84.7383, ele: 2920 },
  { id: 'wp-lho', name: 'Lho', lat: 28.574, lng: 84.702, ele: 3180 },
  { id: 'wp-shyala', name: 'Shyala', lat: 28.5742, lng: 84.6726, ele: 3500 },
  { id: 'wp-samagaon', name: 'Sama Gaun', lat: 28.5847, lng: 84.644, ele: 3530 },
  { id: 'wp-samdo', name: 'Samdo', lat: 28.6509, lng: 84.6341, ele: 3860 },
  { id: 'wp-dharamsala', name: 'Dharamsala (Larke Phedi)', lat: 28.659, lng: 84.5843, ele: 4460 },
  { id: 'wp-larkela', name: 'Larke La (pass)', lat: 28.6639, lng: 84.5203, ele: 5106 },
  { id: 'wp-bimthang', name: 'Bimthang', lat: 28.6338, lng: 84.4713, ele: 3720 },
  { id: 'wp-dharapani', name: 'Dharapani', lat: 28.519, lng: 84.3584, ele: 1860 },
];
