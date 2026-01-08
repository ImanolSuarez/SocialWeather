import { useState } from 'react'
import { usarAutenticacion } from '../../hooks/usarAutenticacion'
import { COMUNIDADES } from '../../utils/constantes'
import { Mail, Lock, User, MapPin, Loader2 } from 'lucide-react'

export default function FormularioRegistro({ onCambiarALogin }) {
  const { registrar } = usarAutenticacion()
  const [datosFormulario, setDatosFormulario] = useState({
    nombreUsuario: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    comunidad: ''
  })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const manejarCambio = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    })
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError('')

    if (datosFormulario.contrasena !== datosFormulario.confirmarContrasena) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (datosFormulario.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (!datosFormulario.comunidad) {
      setError('Selecciona tu comunidad autónoma')
      return
    }

    setCargando(true)

    const resultado = await registrar({
      username: datosFormulario.nombreUsuario,
      email: datosFormulario.email,
      password: datosFormulario.contrasena,
      community: datosFormulario.comunidad
    })

    if (!resultado.exito) {
      setError(resultado.error || 'Error al registrarse')
    }

    setCargando(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Crear Cuenta
      </h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de usuario
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="nombreUsuario"
              value={datosFormulario.nombreUsuario}
              onChange={manejarCambio}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="Tu nombre"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={datosFormulario.email}
              onChange={manejarCambio}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comunidad Autónoma
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              name="comunidad"
              value={datosFormulario.comunidad}
              onChange={manejarCambio}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white"
              required
            >
              <option value="">Selecciona tu comunidad</option>
              {COMUNIDADES.map((comunidad) => (
                <option key={comunidad.id} value={comunidad.id}>
                  {comunidad.nombre}
                </option>
              ))}
            </select>
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
              name="contrasena"
              value={datosFormulario.contrasena}
              onChange={manejarCambio}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="confirmarContrasena"
              value={datosFormulario.confirmarContrasena}
              onChange={manejarCambio}
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
              Creando cuenta...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={onCambiarALogin}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  )
}
