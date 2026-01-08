// Comunidades autónomas de España peninsular
export const COMUNIDADES = [
  { id: 'andalucia', nombre: 'Andalucía', codigo: '01' },
  { id: 'aragon', nombre: 'Aragón', codigo: '02' },
  { id: 'asturias', nombre: 'Asturias', codigo: '03' },
  { id: 'cantabria', nombre: 'Cantabria', codigo: '06' },
  { id: 'castilla-la-mancha', nombre: 'Castilla-La Mancha', codigo: '07' },
  { id: 'castilla-y-leon', nombre: 'Castilla y León', codigo: '08' },
  { id: 'cataluna', nombre: 'Cataluña', codigo: '09' },
  { id: 'valencia', nombre: 'Comunidad Valenciana', codigo: '10' },
  { id: 'extremadura', nombre: 'Extremadura', codigo: '11' },
  { id: 'galicia', nombre: 'Galicia', codigo: '12' },
  { id: 'la-rioja', nombre: 'La Rioja', codigo: '16' },
  { id: 'madrid', nombre: 'Madrid', codigo: '13' },
  { id: 'murcia', nombre: 'Murcia', codigo: '14' },
  { id: 'navarra', nombre: 'Navarra', codigo: '15' },
  { id: 'pais-vasco', nombre: 'País Vasco', codigo: '17' }
]

// Límites de España peninsular (sin islas)
export const LIMITES_ESPANA = {
  suroeste: [35.8, -9.5],
  noreste: [43.8, 3.4]
}

export const CENTRO_ESPANA = [40.0, -3.7]

export const CONFIG_MAPA = {
  zoomPorDefecto: 6,
  zoomMinimo: 5,
  zoomMaximo: 14
}

// Iconos de condiciones climáticas
export const ICONOS_CLIMA = {
  clear: '☀️',
  'partly-cloudy': '⛅',
  cloudy: '☁️',
  overcast: '🌥️',
  fog: '🌫️',
  drizzle: '🌦️',
  rain: '🌧️',
  'heavy-rain': '⛈️',
  thunderstorm: '🌩️',
  snow: '❄️',
  sleet: '🌨️',
  wind: '💨',
  hot: '🌡️',
  cold: '🥶'
}

// Códigos de estado AEMET a condiciones climáticas
export const ESTADOS_CIELO_AEMET = {
  '11': { condicion: 'clear', descripcion: 'Despejado' },
  '11n': { condicion: 'clear', descripcion: 'Despejado noche' },
  '12': { condicion: 'partly-cloudy', descripcion: 'Poco nuboso' },
  '12n': { condicion: 'partly-cloudy', descripcion: 'Poco nuboso noche' },
  '13': { condicion: 'partly-cloudy', descripcion: 'Intervalos nubosos' },
  '13n': { condicion: 'partly-cloudy', descripcion: 'Intervalos nubosos noche' },
  '14': { condicion: 'cloudy', descripcion: 'Nuboso' },
  '14n': { condicion: 'cloudy', descripcion: 'Nuboso noche' },
  '15': { condicion: 'overcast', descripcion: 'Muy nuboso' },
  '16': { condicion: 'overcast', descripcion: 'Cubierto' },
  '16n': { condicion: 'overcast', descripcion: 'Cubierto noche' },
  '17': { condicion: 'cloudy', descripcion: 'Nubes altas' },
  '17n': { condicion: 'cloudy', descripcion: 'Nubes altas noche' },
  '23': { condicion: 'drizzle', descripcion: 'Intervalos nubosos con lluvia escasa' },
  '23n': { condicion: 'drizzle', descripcion: 'Intervalos nubosos con lluvia escasa noche' },
  '24': { condicion: 'drizzle', descripcion: 'Nuboso con lluvia escasa' },
  '24n': { condicion: 'drizzle', descripcion: 'Nuboso con lluvia escasa noche' },
  '25': { condicion: 'rain', descripcion: 'Muy nuboso con lluvia escasa' },
  '26': { condicion: 'rain', descripcion: 'Cubierto con lluvia escasa' },
  '26n': { condicion: 'rain', descripcion: 'Cubierto con lluvia escasa noche' },
  '33': { condicion: 'snow', descripcion: 'Intervalos nubosos con nieve escasa' },
  '33n': { condicion: 'snow', descripcion: 'Intervalos nubosos con nieve escasa noche' },
  '34': { condicion: 'snow', descripcion: 'Nuboso con nieve escasa' },
  '34n': { condicion: 'snow', descripcion: 'Nuboso con nieve escasa noche' },
  '35': { condicion: 'snow', descripcion: 'Muy nuboso con nieve escasa' },
  '36': { condicion: 'snow', descripcion: 'Cubierto con nieve escasa' },
  '36n': { condicion: 'snow', descripcion: 'Cubierto con nieve escasa noche' },
  '43': { condicion: 'rain', descripcion: 'Intervalos nubosos con lluvia' },
  '43n': { condicion: 'rain', descripcion: 'Intervalos nubosos con lluvia noche' },
  '44': { condicion: 'rain', descripcion: 'Nuboso con lluvia' },
  '44n': { condicion: 'rain', descripcion: 'Nuboso con lluvia noche' },
  '45': { condicion: 'heavy-rain', descripcion: 'Muy nuboso con lluvia' },
  '46': { condicion: 'heavy-rain', descripcion: 'Cubierto con lluvia' },
  '46n': { condicion: 'heavy-rain', descripcion: 'Cubierto con lluvia noche' },
  '51': { condicion: 'thunderstorm', descripcion: 'Intervalos nubosos con tormenta' },
  '51n': { condicion: 'thunderstorm', descripcion: 'Intervalos nubosos con tormenta noche' },
  '52': { condicion: 'thunderstorm', descripcion: 'Nuboso con tormenta' },
  '52n': { condicion: 'thunderstorm', descripcion: 'Nuboso con tormenta noche' },
  '53': { condicion: 'thunderstorm', descripcion: 'Muy nuboso con tormenta' },
  '54': { condicion: 'thunderstorm', descripcion: 'Cubierto con tormenta' },
  '54n': { condicion: 'thunderstorm', descripcion: 'Cubierto con tormenta noche' },
  '61': { condicion: 'thunderstorm', descripcion: 'Intervalos nubosos con tormenta y lluvia escasa' },
  '61n': { condicion: 'thunderstorm', descripcion: 'Intervalos nubosos con tormenta y lluvia escasa noche' },
  '62': { condicion: 'thunderstorm', descripcion: 'Nuboso con tormenta y lluvia escasa' },
  '62n': { condicion: 'thunderstorm', descripcion: 'Nuboso con tormenta y lluvia escasa noche' },
  '63': { condicion: 'thunderstorm', descripcion: 'Muy nuboso con tormenta y lluvia escasa' },
  '64': { condicion: 'thunderstorm', descripcion: 'Cubierto con tormenta y lluvia escasa' },
  '64n': { condicion: 'thunderstorm', descripcion: 'Cubierto con tormenta y lluvia escasa noche' },
  '71': { condicion: 'snow', descripcion: 'Intervalos nubosos con nieve' },
  '71n': { condicion: 'snow', descripcion: 'Intervalos nubosos con nieve noche' },
  '72': { condicion: 'snow', descripcion: 'Nuboso con nieve' },
  '72n': { condicion: 'snow', descripcion: 'Nuboso con nieve noche' },
  '73': { condicion: 'snow', descripcion: 'Muy nuboso con nieve' },
  '74': { condicion: 'snow', descripcion: 'Cubierto con nieve' },
  '74n': { condicion: 'snow', descripcion: 'Cubierto con nieve noche' },
  '81': { condicion: 'fog', descripcion: 'Niebla' },
  '82': { condicion: 'fog', descripcion: 'Bruma' },
  '83': { condicion: 'fog', descripcion: 'Calima' }
}
