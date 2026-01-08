import { usarAutenticacion } from '../../hooks/usarAutenticacion'
import { obtenerNombreComunidad } from '../../utils/ayudantes'
import { Cloud, Map, Info, MapPin } from 'lucide-react'

export default function BarraLateral({ vistaActiva, establecerVistaActiva }) {
  const { usuario } = usarAutenticacion()

  const elementosNav = [
    { id: 'clima', etiqueta: 'Mi Clima', icono: Cloud, descripcion: 'Tiempo actual en tu ubicación' },
    { id: 'mapa', etiqueta: 'Mapa de España', icono: Map, descripcion: 'Pronóstico interactivo' }
  ]

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
      {/* Info del usuario */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-700 font-bold text-lg">
              {usuario?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">{usuario?.username}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{obtenerNombreComunidad(usuario?.community)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-3 space-y-1">
        {elementosNav.map((elemento) => {
          const Icono = elemento.icono
          const estaActivo = vistaActiva === elemento.id
          return (
            <button
              key={elemento.id}
              onClick={() => establecerVistaActiva(elemento.id)}
              className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-colors text-left ${
                estaActivo
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icono className={`w-5 h-5 mt-0.5 ${estaActivo ? 'text-primary-600' : ''}`} />
              <div>
                <p className="font-medium">{elemento.etiqueta}</p>
                <p className="text-xs text-gray-400">{elemento.descripcion}</p>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Pie de página */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Info className="w-4 h-4" />
          <span>Datos de AEMET</span>
        </div>
      </div>
    </aside>
  )
}
