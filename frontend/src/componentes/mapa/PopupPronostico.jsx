import { Popup } from 'react-leaflet'
import { formatearTemperatura, obtenerClimaDesdeCodigoAemet } from '../../utils/ayudantes'

export default function PopupPronostico({ pronostico, municipio }) {
  if (!pronostico || pronostico.length === 0) {
    return (
      <Popup>
        <div className="text-center py-2">
          <p className="text-gray-500">Sin datos disponibles</p>
        </div>
      </Popup>
    )
  }

  const hoy = pronostico[0]
  const clima = obtenerClimaDesdeCodigoAemet(hoy.estadoCielo?.value || '11')

  return (
    <Popup minWidth={200} maxWidth={280}>
      <div className="p-1">
        {/* Cabecera */}
        <div className="text-center mb-3 pb-2 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">{municipio?.nombre}</h3>
          {municipio?.provincia && (
            <p className="text-xs text-gray-400">{municipio.provincia}</p>
          )}
        </div>

        {/* Actual */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-4xl">{clima.icono}</span>
          <div className="text-center">
            <p className="text-2xl font-light text-gray-800">
              {formatearTemperatura(hoy.temperatura?.maxima)}
            </p>
            <p className="text-xs text-gray-500">{clima.descripcion}</p>
          </div>
        </div>

        {/* Mini pronóstico 3 días */}
        <div className="flex justify-between bg-gray-50 rounded-lg p-2">
          {pronostico.slice(0, 3).map((dia, indice) => {
            const climaDia = obtenerClimaDesdeCodigoAemet(dia.estadoCielo?.value || '11')
            const fecha = new Date(dia.fecha)
            const nombreDia = indice === 0 ? 'Hoy' : fecha.toLocaleDateString('es-ES', { weekday: 'short' })
            
            return (
              <div key={indice} className="text-center flex-1">
                <p className="text-xs text-gray-500 capitalize">{nombreDia}</p>
                <span className="text-xl">{climaDia.icono}</span>
                <p className="text-xs font-medium">
                  {formatearTemperatura(dia.temperatura?.maxima)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </Popup>
  )
}
