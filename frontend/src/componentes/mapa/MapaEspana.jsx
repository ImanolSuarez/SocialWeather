import { useState, useEffect, useCallback, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { servicioClima } from '../../servicios/servicioClima'
import { CENTRO_ESPANA, LIMITES_ESPANA, CONFIG_MAPA } from '../../utils/constantes'
import Modal from '../comunes/Modal'
import TarjetaPronostico from '../clima/TarjetaPronostico'
import { Loader2, Cloud } from 'lucide-react'
import 'leaflet/dist/leaflet.css'


// Nivel de zoom para mostrar municipios
const ZOOM_MINIMO_PARA_NODOS = 11

function LimitesMapa() {
  const mapa = useMap()
  
  useEffect(() => {
    mapa.setMaxBounds([LIMITES_ESPANA.suroeste, LIMITES_ESPANA.noreste])
  }, [mapa])
  
  return null
}

function ObservadorZoom({ alCambiarZoom }) {
  const mapa = useMapEvents({
    zoomend: () => {
      alCambiarZoom(mapa.getZoom())
    }
  })
  
  useEffect(() => {
    alCambiarZoom(mapa.getZoom())
  }, [mapa, alCambiarZoom])
  
  return null
}

export default function MapaEspana() {
  const [municipios, setMunicipios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [zoomActual, setZoomActual] = useState(CONFIG_MAPA.zoomPorDefecto)
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null)
  const [pronostico, setPronostico] = useState(null)
  const [cargandoPronostico, setCargandoPronostico] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

  // Cargar municipios desde AEMET
  useEffect(() => {
    const cargarMunicipios = async () => {
      try {
        setCargando(true)
        setError(null)
        const datos = await servicioClima.obtenerTodosMunicipios()
        setMunicipios(datos)
      } catch (err) {
        console.error('Error cargando municipios:', err)
        setError('Error al cargar los municipios. Por favor, recarga la página.')
      } finally {
        setCargando(false)
      }
    }

    cargarMunicipios()
  }, [])

  // Filtrar municipios según nivel de zoom - solo mostrar a partir de zoom 11
  const municipiosVisibles = useMemo(() => {
    if (zoomActual < ZOOM_MINIMO_PARA_NODOS) {
      return []
    }
    return municipios
  }, [municipios, zoomActual])

  const manejarCambioZoom = useCallback((zoom) => {
    setZoomActual(zoom)
  }, [])

  const manejarClickMunicipio = async (municipio) => {
    setMunicipioSeleccionado(municipio)
    setMostrarModal(true)
    setCargandoPronostico(true)
    setPronostico(null)

    try {
      // Extraer el ID numérico del formato AEMET (ej: "id28079" -> "28079")
      const idMunicipio = municipio.id.replace(/\D/g, '').padStart(5, '0')
      const datosPronostico = await servicioClima.obtenerPronostico(idMunicipio)
      setPronostico({
        municipio: municipio,
        dias: datosPronostico
      })
    } catch (err) {
      console.error('Error obteniendo pronóstico:', err)
      setPronostico(null)
    } finally {
      setCargandoPronostico(false)
    }
  }

  const cerrarModal = () => {
    setMostrarModal(false)
    setMunicipioSeleccionado(null)
    setPronostico(null)
  }

  // Obtener tamaño del marcador según zoom
  const obtenerRadioMarcador = () => {
    if (zoomActual < 12) return 4
    return 3
  }

  if (cargando) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <p className="text-gray-600">Cargando municipios de España...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Mapa del Tiempo</h2>
        <p className="text-gray-500">
          Haz clic en un municipio para ver el pronóstico.
        </p>
      </div>

      {/* Contenedor del mapa */}
      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 relative" style={{ minHeight: '500px' }}>
        <MapContainer
          center={CENTRO_ESPANA}
          zoom={CONFIG_MAPA.zoomPorDefecto}
          minZoom={CONFIG_MAPA.zoomMinimo}
          maxZoom={CONFIG_MAPA.zoomMaximo}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LimitesMapa />
          <ObservadorZoom alCambiarZoom={manejarCambioZoom} />
          
          {municipiosVisibles.map((municipio) => (
            <CircleMarker
              key={municipio.id}
              center={[municipio.latitud, municipio.longitud]}
              radius={obtenerRadioMarcador()}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#60a5fa',
                fillOpacity: 0.8,
                weight: 1
              }}
            >
              <Popup>
                <div className="text-center min-w-[120px]">
                  <p className="font-semibold text-gray-800">{municipio.nombre}</p>
                  <p className="text-xs text-gray-500">{municipio.provincia}</p>
                  <button 
                    onClick={() => manejarClickMunicipio(municipio)}
                    className="mt-2 text-xs text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Ver pronóstico
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>


      </div>

      {/* Modal de pronóstico */}
      <Modal
        estaAbierto={mostrarModal}
        alCerrar={cerrarModal}
        titulo={municipioSeleccionado?.nombre || 'Pronóstico'}
        tamano="xl"
      >
        {cargandoPronostico ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : pronostico ? (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Pronóstico 3 días</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pronostico.dias?.slice(0, 3).map((dia, indice) => (
                <TarjetaPronostico key={indice} datos={dia} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Cloud className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No se pudo obtener el pronóstico para este municipio</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
