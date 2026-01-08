import { useState } from 'react'
import { usarAutenticacion } from '../../hooks/usarAutenticacion'
import { Mail, Lock, Loader2 } from 'lucide-react'

export default function FormularioLogin({ onCambiarARegistro }) {
  const { iniciarSesion } = usarAutenticacion()
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    const resultado = await iniciarSesion(email, contrasena)
    
    if (!resultado.exito) {
      setError(resultado.error || 'Error al iniciar sesión')
    }
    
    setCargando(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Iniciar Sesión
      </h2>

      <form onSubmit={manejarEnvio} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {cargando ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿No tienes cuenta?{' '}
          <button
            onClick={onCambiarARegistro}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  )
}
