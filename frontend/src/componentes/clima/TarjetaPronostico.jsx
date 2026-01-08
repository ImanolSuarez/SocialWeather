import { formatearTemperatura, formatearFecha, obtenerClimaDesdeCodigoAemet } from '../../utils/ayudantes'
import { Droplets, Wind } from 'lucide-react'

export default function TarjetaPronostico({ datos }) {
  const clima = obtenerClimaDesdeCodigoAemet(datos.estadoCielo?.value || '11')

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-center">
        {/* Fecha */}
        <p className="text-sm font-medium text-gray-500 capitalize">
          {formatearFecha(datos.fecha, { weekday: 'long', day: 'numeric', month: 'short' })}
        </p>

        {/* Icono del clima */}
        <div className="text-5xl my-4">{clima.icono}</div>

        {/* Temperatura */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-2xl font-semibold text-gray-800">
            {formatearTemperatura(datos.temperatura?.maxima)}
          </span>
          <span className="text-lg text-gray-400">
            {formatearTemperatura(datos.temperatura?.minima)}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4">{clima.descripcion}</p>

        {/* Información adicional */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span>{datos.probPrecipitacion || 0}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span>{datos.viento?.velocidad || '--'} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
