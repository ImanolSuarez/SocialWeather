import { useState } from 'react'
import { usarAutenticacion } from './hooks/usarAutenticacion'
import BarraNavegacion from './componentes/comunes/BarraNavegacion'
import BarraLateral from './componentes/comunes/BarraLateral'
import FormularioLogin from './componentes/autenticacion/FormularioLogin'
import FormularioRegistro from './componentes/autenticacion/FormularioRegistro'
import ClimaActual from './componentes/clima/ClimaActual'
import MapaEspana from './componentes/mapa/MapaEspana'
import Chatbot from './componentes/chatbot/Chatbot'

function App() {
  const { usuario, cargando } = usarAutenticacion()
  const [vistaActiva, setVistaActiva] = useState('clima')
  const [mostrarRegistro, setMostrarRegistro] = useState(false)

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando SocialWeather...</p>
        </div>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">🌦️ SocialWeather</h1>
            <p className="text-primary-100">La red social del clima en España</p>
          </div>
          
          {mostrarRegistro ? (
            <FormularioRegistro onCambiarALogin={() => setMostrarRegistro(false)} />
          ) : (
            <FormularioLogin onCambiarARegistro={() => setMostrarRegistro(true)} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BarraNavegacion vistaActiva={vistaActiva} establecerVistaActiva={setVistaActiva} />
      
      <div className="flex flex-1 overflow-hidden">
        <BarraLateral vistaActiva={vistaActiva} establecerVistaActiva={setVistaActiva} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto h-full">
            {vistaActiva === 'clima' && <ClimaActual />}
            {vistaActiva === 'mapa' && <MapaEspana />}
          </div>
        </main>
      </div>

      {/* Chatbot - visible solo cuando está logueado */}
      <Chatbot />
    </div>
  )
}

export default App
