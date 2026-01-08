import { useState, useEffect } from 'react'
import { usarGeolocalizacion } from '../../hooks/usarGeolocalizacion'
import { usarClima } from '../../hooks/usarClima'
import { servicioClima } from '../../servicios/servicioClima'
import { formatearTemperatura, formatearFecha, obtenerClimaDesdeCodigoAemet, formatearVelocidadViento, obtenerDireccionViento } from '../../utils/ayudantes'
import TarjetaPronostico from './TarjetaPronostico'
import { MapPin, RefreshCw, Thermometer, Droplets, Wind, Eye, Loader2, AlertTriangle } from 'lucide-react'

export default function ClimaActual() {
  const { ubicacion, error: errorGeo, cargando: cargandoGeo, actualizar: actualizarUbicacion } = usarGeolocalizacion()
  const { climaActual, establecerClimaActual, establecerCargando, cargando } = usarClima()
  const [pronostico, setPronostico] = useState(null)
  const [municipio, setMunicipio] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (ubicacion) {
      obtenerDatosClima()
    }
  }, [ubicacion])

  const obtenerDatosClima = async () => {
    if (!ubicacion) return

    establecerCargando(true)
    setError(null)

    try {
      // Obtener municipio desde coordenadas
      const datosMunicipio = await servicioClima.obtenerMunicipioPorCoordenadas(ubicacion.lat, ubicacion.lng)
      setMunicipio(datosMunicipio)

      // Obtener clima actual
      const datosClima = await servicioClima.obtenerClimaActual(ubicacion.lat, ubicacion.lng)
      establecerClimaActual(datosClima)

      // Obtener pronóstico 3 días
      if (datosMunicipio?.id) {
        const datosPronostico = await servicioClima.obtenerPronostico(datosMunicipio.id)
        setPronostico(datosPronostico)
      }
    } catch (err) {
      console.error('Error obteniendo clima:', err)
      setError('No se pudo obtener la información del clima')
    } finally {
      establecerCargando(false)
    }
  }

  const manejarActualizacion = () => {
    actualizarUbicacion()
    obtenerDatosClima()
  }

  if (cargandoGeo) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <p className="text-gray-600">Obteniendo tu ubicación...</p>
      </div>
    )
  }

  if (errorGeo) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-md text-center">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Ubicación no disponible</h3>
          <p className="text-amber-700 mb-4">{errorGeo}</p>
          <p className="text-sm text-amber-600">
            Activa la geolocalización en tu navegador para ver el clima de tu zona.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mi Clima</h2>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{municipio?.nombre || 'Cargando ubicación...'}</span>
            {municipio?.provincia && (
              <span className="text-gray-400">• {municipio.provincia}</span>
            )}
          </div>
        </div>
        <button
          onClick={manejarActualizacion}
          disabled={cargando}
          className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${cargando ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Actualizar</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {cargando ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
        </div>
      ) : climaActual ? (
        <>
          {/* Tarjeta del clima actual */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-7xl">
                  {obtenerClimaDesdeCodigoAemet(climaActual.estadoCielo?.value || '11').icono}
                </div>
                <div>
                  <p className="text-6xl font-light">
                    {formatearTemperatura(climaActual.temperatura?.actual)}
                  </p>
                  <p className="text-primary-100 text-lg mt-1">
                    {obtenerClimaDesdeCodigoAemet(climaActual.estadoCielo?.value || '11').descripcion}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary-200" />
                  <div>
                    <p className="text-primary-200 text-sm">Máx / Mín</p>
                    <p className="font-medium">
                      {formatearTemperatura(climaActual.temperatura?.maxima)} / {formatearTemperatura(climaActual.temperatura?.minima)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary-200" />
                  <div>
                    <p className="text-primary-200 text-sm">Humedad</p>
                    <p className="font-medium">{climaActual.humedadRelativa || '--'}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-primary-200" />
                  <div>
                    <p className="text-primary-200 text-sm">Viento</p>
                    <p className="font-medium">
                      {formatearVelocidadViento(climaActual.viento?.velocidad)} {obtenerDireccionViento(climaActual.viento?.direccion)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary-200" />
                  <div>
                    <p className="text-primary-200 text-sm">Prob. lluvia</p>
                    <p className="font-medium">{climaActual.probPrecipitacion || 0}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary-400/30">
              <p className="text-primary-200 text-sm">
                Actualizado: {formatearFecha(new Date().toISOString(), { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Pronóstico 3 días */}
          {pronostico && pronostico.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pronóstico 3 días</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pronostico.slice(0, 3).map((dia, indice) => (
                  <TarjetaPronostico key={indice} datos={dia} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <IconoNube className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No hay datos del clima disponibles</p>
        </div>
      )}
    </div>
  )
}

function IconoNube(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}
