import { formatearTemperatura, obtenerClimaDesdeCodigoAemet, formatearVelocidadViento, obtenerDireccionViento } from '../../utils/ayudantes'
import { Thermometer, Droplets, Wind, Sun, Sunset, CloudRain } from 'lucide-react'

export default function DetallesClima({ datos }) {
  if (!datos) return null

  const clima = obtenerClimaDesdeCodigoAemet(datos.estadoCielo?.value || '11')

  return (
    <div className="space-y-4">
      {/* Información principal */}
      <div className="flex items-center gap-4">
        <span className="text-6xl">{clima.icono}</span>
        <div>
          <p className="text-4xl font-light text-gray-800">
            {formatearTemperatura(datos.temperatura?.actual || datos.temperatura?.maxima)}
          </p>
          <p className="text-gray-600">{clima.descripcion}</p>
        </div>
      </div>

      {/* Grid de detalles */}
      <div className="grid grid-cols-2 gap-4">
        <ElementoDetalle
          icono={Thermometer}
          etiqueta="Temperatura"
          valor={`${formatearTemperatura(datos.temperatura?.maxima)} / ${formatearTemperatura(datos.temperatura?.minima)}`}
        />
        <ElementoDetalle
          icono={Droplets}
          etiqueta="Humedad"
          valor={`${datos.humedadRelativa || '--'}%`}
        />
        <ElementoDetalle
          icono={Wind}
          etiqueta="Viento"
          valor={`${formatearVelocidadViento(datos.viento?.velocidad)} ${obtenerDireccionViento(datos.viento?.direccion)}`}
        />
        <ElementoDetalle
          icono={CloudRain}
          etiqueta="Prob. Precipitación"
          valor={`${datos.probPrecipitacion || 0}%`}
        />
        {datos.orto && (
          <ElementoDetalle
            icono={Sun}
            etiqueta="Amanecer"
            valor={datos.orto}
          />
        )}
        {datos.ocaso && (
          <ElementoDetalle
            icono={Sunset}
            etiqueta="Atardecer"
            valor={datos.ocaso}
          />
        )}
      </div>

      {datos.uvMax && (
        <div className="bg-amber-50 rounded-lg p-3">
          <p className="text-sm font-medium text-amber-800">
            Índice UV: {datos.uvMax}
            <span className="font-normal text-amber-600 ml-2">
              {obtenerNivelUv(datos.uvMax)}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

function ElementoDetalle({ icono: Icono, etiqueta, valor }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
      <Icono className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-xs text-gray-500">{etiqueta}</p>
        <p className="font-medium text-gray-800">{valor}</p>
      </div>
    </div>
  )
}

function obtenerNivelUv(uv) {
  if (uv <= 2) return 'Bajo'
  if (uv <= 5) return 'Moderado'
  if (uv <= 7) return 'Alto'
  if (uv <= 10) return 'Muy alto'
  return 'Extremo'
}
