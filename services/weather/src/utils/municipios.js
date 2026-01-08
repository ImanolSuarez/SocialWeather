/**
 * Municipios de España peninsular con códigos INE
 * Datos simplificados con capitales de provincia y ciudades principales
 */
const MUNICIPIOS = [
  // Andalucía
  { id: '41091', nombre: 'Sevilla', provincia: 'Sevilla', comunidad: 'andalucia', lat: 37.3891, lng: -5.9845 },
  { id: '29067', nombre: 'Málaga', provincia: 'Málaga', comunidad: 'andalucia', lat: 36.7213, lng: -4.4214 },
  { id: '18087', nombre: 'Granada', provincia: 'Granada', comunidad: 'andalucia', lat: 37.1773, lng: -3.5986 },
  { id: '14021', nombre: 'Córdoba', provincia: 'Córdoba', comunidad: 'andalucia', lat: 37.8882, lng: -4.7794 },
  { id: '11012', nombre: 'Cádiz', provincia: 'Cádiz', comunidad: 'andalucia', lat: 36.5271, lng: -6.2886 },
  { id: '04013', nombre: 'Almería', provincia: 'Almería', comunidad: 'andalucia', lat: 36.8340, lng: -2.4637 },
  { id: '23050', nombre: 'Jaén', provincia: 'Jaén', comunidad: 'andalucia', lat: 37.7796, lng: -3.7849 },
  { id: '21041', nombre: 'Huelva', provincia: 'Huelva', comunidad: 'andalucia', lat: 37.2614, lng: -6.9447 },
  
  // Aragón
  { id: '50297', nombre: 'Zaragoza', provincia: 'Zaragoza', comunidad: 'aragon', lat: 41.6488, lng: -0.8891 },
  { id: '22125', nombre: 'Huesca', provincia: 'Huesca', comunidad: 'aragon', lat: 42.1401, lng: -0.4089 },
  { id: '44216', nombre: 'Teruel', provincia: 'Teruel', comunidad: 'aragon', lat: 40.3456, lng: -1.1065 },
  
  // Asturias
  { id: '33044', nombre: 'Oviedo', provincia: 'Asturias', comunidad: 'asturias', lat: 43.3614, lng: -5.8493 },
  { id: '33024', nombre: 'Gijón', provincia: 'Asturias', comunidad: 'asturias', lat: 43.5322, lng: -5.6611 },
  { id: '33004', nombre: 'Avilés', provincia: 'Asturias', comunidad: 'asturias', lat: 43.5547, lng: -5.9248 },
  
  // Cantabria
  { id: '39075', nombre: 'Santander', provincia: 'Cantabria', comunidad: 'cantabria', lat: 43.4623, lng: -3.8100 },
  { id: '39087', nombre: 'Torrelavega', provincia: 'Cantabria', comunidad: 'cantabria', lat: 43.3499, lng: -4.0480 },
  
  // Castilla-La Mancha
  { id: '45168', nombre: 'Toledo', provincia: 'Toledo', comunidad: 'castilla-la-mancha', lat: 39.8628, lng: -4.0273 },
  { id: '02003', nombre: 'Albacete', provincia: 'Albacete', comunidad: 'castilla-la-mancha', lat: 38.9942, lng: -1.8585 },
  { id: '13034', nombre: 'Ciudad Real', provincia: 'Ciudad Real', comunidad: 'castilla-la-mancha', lat: 38.9848, lng: -3.9274 },
  { id: '16078', nombre: 'Cuenca', provincia: 'Cuenca', comunidad: 'castilla-la-mancha', lat: 40.0704, lng: -2.1374 },
  { id: '19130', nombre: 'Guadalajara', provincia: 'Guadalajara', comunidad: 'castilla-la-mancha', lat: 40.6337, lng: -3.1674 },
  
  // Castilla y León
  { id: '47186', nombre: 'Valladolid', provincia: 'Valladolid', comunidad: 'castilla-y-leon', lat: 41.6523, lng: -4.7245 },
  { id: '24089', nombre: 'León', provincia: 'León', comunidad: 'castilla-y-leon', lat: 42.5987, lng: -5.5671 },
  { id: '09059', nombre: 'Burgos', provincia: 'Burgos', comunidad: 'castilla-y-leon', lat: 42.3440, lng: -3.6969 },
  { id: '37274', nombre: 'Salamanca', provincia: 'Salamanca', comunidad: 'castilla-y-leon', lat: 40.9701, lng: -5.6635 },
  { id: '49275', nombre: 'Zamora', provincia: 'Zamora', comunidad: 'castilla-y-leon', lat: 41.5034, lng: -5.7467 },
  { id: '34120', nombre: 'Palencia', provincia: 'Palencia', comunidad: 'castilla-y-leon', lat: 42.0096, lng: -4.5288 },
  { id: '05019', nombre: 'Ávila', provincia: 'Ávila', comunidad: 'castilla-y-leon', lat: 40.6566, lng: -4.6818 },
  { id: '40194', nombre: 'Segovia', provincia: 'Segovia', comunidad: 'castilla-y-leon', lat: 40.9429, lng: -4.1088 },
  { id: '42173', nombre: 'Soria', provincia: 'Soria', comunidad: 'castilla-y-leon', lat: 41.7636, lng: -2.4649 },
  
  // Cataluña
  { id: '08019', nombre: 'Barcelona', provincia: 'Barcelona', comunidad: 'cataluna', lat: 41.3851, lng: 2.1734 },
  { id: '17079', nombre: 'Girona', provincia: 'Girona', comunidad: 'cataluna', lat: 41.9794, lng: 2.8214 },
  { id: '25120', nombre: 'Lleida', provincia: 'Lleida', comunidad: 'cataluna', lat: 41.6176, lng: 0.6200 },
  { id: '43148', nombre: 'Tarragona', provincia: 'Tarragona', comunidad: 'cataluna', lat: 41.1189, lng: 1.2445 },
  
  // Comunidad Valenciana
  { id: '46250', nombre: 'Valencia', provincia: 'Valencia', comunidad: 'valencia', lat: 39.4699, lng: -0.3763 },
  { id: '03014', nombre: 'Alicante', provincia: 'Alicante', comunidad: 'valencia', lat: 38.3452, lng: -0.4810 },
  { id: '12040', nombre: 'Castellón de la Plana', provincia: 'Castellón', comunidad: 'valencia', lat: 39.9864, lng: -0.0513 },
  
  // Extremadura
  { id: '06083', nombre: 'Badajoz', provincia: 'Badajoz', comunidad: 'extremadura', lat: 38.8794, lng: -6.9707 },
  { id: '10037', nombre: 'Cáceres', provincia: 'Cáceres', comunidad: 'extremadura', lat: 39.4753, lng: -6.3724 },
  { id: '06089', nombre: 'Mérida', provincia: 'Badajoz', comunidad: 'extremadura', lat: 38.9163, lng: -6.3436 },
  
  // Galicia
  { id: '15030', nombre: 'A Coruña', provincia: 'A Coruña', comunidad: 'galicia', lat: 43.3623, lng: -8.4115 },
  { id: '36057', nombre: 'Vigo', provincia: 'Pontevedra', comunidad: 'galicia', lat: 42.2406, lng: -8.7207 },
  { id: '27028', nombre: 'Lugo', provincia: 'Lugo', comunidad: 'galicia', lat: 43.0097, lng: -7.5567 },
  { id: '32054', nombre: 'Ourense', provincia: 'Ourense', comunidad: 'galicia', lat: 42.3364, lng: -7.8638 },
  { id: '15078', nombre: 'Santiago de Compostela', provincia: 'A Coruña', comunidad: 'galicia', lat: 42.8782, lng: -8.5448 },
  
  // La Rioja
  { id: '26089', nombre: 'Logroño', provincia: 'La Rioja', comunidad: 'la-rioja', lat: 42.4627, lng: -2.4449 },
  
  // Madrid
  { id: '28079', nombre: 'Madrid', provincia: 'Madrid', comunidad: 'madrid', lat: 40.4168, lng: -3.7038 },
  { id: '28006', nombre: 'Alcalá de Henares', provincia: 'Madrid', comunidad: 'madrid', lat: 40.4818, lng: -3.3635 },
  { id: '28058', nombre: 'Fuenlabrada', provincia: 'Madrid', comunidad: 'madrid', lat: 40.2838, lng: -3.7998 },
  { id: '28074', nombre: 'Getafe', provincia: 'Madrid', comunidad: 'madrid', lat: 40.3047, lng: -3.7326 },
  { id: '28092', nombre: 'Leganés', provincia: 'Madrid', comunidad: 'madrid', lat: 40.3280, lng: -3.7626 },
  { id: '28106', nombre: 'Móstoles', provincia: 'Madrid', comunidad: 'madrid', lat: 40.3223, lng: -3.8649 },
  
  // Murcia
  { id: '30030', nombre: 'Murcia', provincia: 'Murcia', comunidad: 'murcia', lat: 37.9922, lng: -1.1307 },
  { id: '30016', nombre: 'Cartagena', provincia: 'Murcia', comunidad: 'murcia', lat: 37.6057, lng: -0.9916 },
  { id: '30024', nombre: 'Lorca', provincia: 'Murcia', comunidad: 'murcia', lat: 37.6773, lng: -1.7011 },
  
  // Navarra
  { id: '31201', nombre: 'Pamplona', provincia: 'Navarra', comunidad: 'navarra', lat: 42.8125, lng: -1.6458 },
  { id: '31232', nombre: 'Tudela', provincia: 'Navarra', comunidad: 'navarra', lat: 42.0615, lng: -1.6067 },
  
  // País Vasco
  { id: '48020', nombre: 'Bilbao', provincia: 'Vizcaya', comunidad: 'pais-vasco', lat: 43.2630, lng: -2.9350 },
  { id: '20069', nombre: 'San Sebastián', provincia: 'Guipúzcoa', comunidad: 'pais-vasco', lat: 43.3183, lng: -1.9812 },
  { id: '01059', nombre: 'Vitoria-Gasteiz', provincia: 'Álava', comunidad: 'pais-vasco', lat: 42.8467, lng: -2.6726 }
]

/**
 * Find the closest municipio to given coordinates
 */
function findMunicipioByCoordinates(lat, lng) {
  let closest = null
  let minDistance = Infinity

  for (const municipio of MUNICIPIOS) {
    const distance = calculateDistance(lat, lng, municipio.lat, municipio.lng)
    if (distance < minDistance) {
      minDistance = distance
      closest = municipio
    }
  }

  return closest
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg) {
  return deg * (Math.PI / 180)
}

/**
 * Search municipios by name (case insensitive, partial match)
 */
function searchMunicipiosByName(query, limit = 10) {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  const results = MUNICIPIOS.filter(municipio => {
    const normalizedName = municipio.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return normalizedName.includes(normalizedQuery)
  })

  // Sort by relevance (exact match first, then by name length)
  results.sort((a, b) => {
    const aName = a.nombre.toLowerCase()
    const bName = b.nombre.toLowerCase()
    const queryLower = query.toLowerCase()
    
    // Exact match first
    if (aName === queryLower) return -1
    if (bName === queryLower) return 1
    
    // Starts with query
    if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1
    if (bName.startsWith(queryLower) && !aName.startsWith(queryLower)) return 1
    
    // Shorter names first
    return a.nombre.length - b.nombre.length
  })

  return results.slice(0, limit)
}

module.exports = {
  MUNICIPIOS,
  findMunicipioByCoordinates,
  searchMunicipiosByName,
  calculateDistance
}
