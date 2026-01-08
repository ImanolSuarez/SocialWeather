import { ICONOS_CLIMA, ESTADOS_CIELO_AEMET } from './constantes'

/**
 * Obtener emoji del icono del clima según la condición
 */
export function obtenerIconoClima(condicion) {
  return ICONOS_CLIMA[condicion] || '🌤️'
}

/**
 * Obtener información del clima desde el código AEMET de estado del cielo
 */
export function obtenerClimaDesdeCodigoAemet(codigo) {
  const estado = ESTADOS_CIELO_AEMET[codigo]
  if (estado) {
    return {
      condicion: estado.condicion,
      descripcion: estado.descripcion,
      icono: obtenerIconoClima(estado.condicion)
    }
  }
  return {
    condicion: 'unknown',
    descripcion: 'Desconocido',
    icono: '❓'
  }
}

/**
 * Formatear temperatura
 */
export function formatearTemperatura(temp, unidad = 'C') {
  if (temp === null || temp === undefined) return '--°'
  const valor = Math.round(temp)
  return `${valor}°${unidad}`
}

/**
 * Formatear fecha en español
 */
export function formatearFecha(cadenaFecha, opciones = {}) {
  const fecha = new Date(cadenaFecha)
  const opcionesPorDefecto = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    ...opciones
  }
  return fecha.toLocaleDateString('es-ES', opcionesPorDefecto)
}

/**
 * Formatear hora
 */
export function formatearHora(cadenaFecha) {
  const fecha = new Date(cadenaFecha)
  return fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Obtener dirección del viento desde grados
 */
export function obtenerDireccionViento(grados) {
  const direcciones = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
  const indice = Math.round(grados / 45) % 8
  return direcciones[indice]
}

/**
 * Formatear velocidad del viento
 */
export function formatearVelocidadViento(velocidad, unidad = 'km/h') {
  if (velocidad === null || velocidad === undefined) return '--'
  return `${Math.round(velocidad)} ${unidad}`
}

/**
 * Obtener nombre de la comunidad para mostrar
 */
export function obtenerNombreComunidad(idComunidad) {
  const nombres = {
    'andalucia': 'Andalucía',
    'aragon': 'Aragón',
    'asturias': 'Asturias',
    'cantabria': 'Cantabria',
    'castilla-la-mancha': 'Castilla-La Mancha',
    'castilla-y-leon': 'Castilla y León',
    'cataluna': 'Cataluña',
    'valencia': 'Comunidad Valenciana',
    'extremadura': 'Extremadura',
    'galicia': 'Galicia',
    'la-rioja': 'La Rioja',
    'madrid': 'Madrid',
    'murcia': 'Murcia',
    'navarra': 'Navarra',
    'pais-vasco': 'País Vasco'
  }
  return nombres[idComunidad] || idComunidad
}
