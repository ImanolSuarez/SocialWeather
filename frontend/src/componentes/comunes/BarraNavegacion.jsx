import { usarAutenticacion } from '../../hooks/usarAutenticacion'
import { Cloud, Map, LogOut, User } from 'lucide-react'

export default function BarraNavegacion({ vistaActiva, establecerVistaActiva }) {
  const { usuario, cerrarSesion } = usarAutenticacion()

  const elementosNav = [
    { id: 'clima', etiqueta: 'Mi Clima', icono: Cloud },
    { id: 'mapa', etiqueta: 'Mapa', icono: Map }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌦️</span>
            <h1 className="text-xl font-bold text-gray-800">SocialWeather</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {elementosNav.map((elemento) => {
              const Icono = elemento.icono
              const estaActivo = vistaActiva === elemento.id
              return (
                <button
                  key={elemento.id}
                  onClick={() => establecerVistaActiva(elemento.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    estaActivo
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icono className="w-5 h-5" />
                  <span className="font-medium">{elemento.etiqueta}</span>
                </button>
              )
            })}
          </nav>

          {/* Menú de usuario */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">{usuario?.username}</span>
            </div>
            <button
              onClick={cerrarSesion}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="md:hidden flex border-t border-gray-200">
        {elementosNav.map((elemento) => {
          const Icono = elemento.icono
          const estaActivo = vistaActiva === elemento.id
          return (
            <button
              key={elemento.id}
              onClick={() => establecerVistaActiva(elemento.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                estaActivo
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-500'
                  : 'text-gray-500'
              }`}
            >
              <Icono className="w-5 h-5" />
              <span className="text-xs font-medium">{elemento.etiqueta}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
