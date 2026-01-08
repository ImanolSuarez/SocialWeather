import { createContext, useReducer, useEffect } from 'react'
import { servicioAutenticacion } from '../servicios/servicioAutenticacion'

const ContextoAutenticacion = createContext(null)

const estadoInicial = {
  usuario: null,
  cargando: true,
  error: null
}

function reductorAutenticacion(estado, accion) {
  switch (accion.type) {
    case 'SET_CARGANDO':
      return { ...estado, cargando: accion.payload }
    case 'SET_USUARIO':
      return { ...estado, usuario: accion.payload, cargando: false, error: null }
    case 'SET_ERROR':
      return { ...estado, error: accion.payload, cargando: false }
    case 'CERRAR_SESION':
      return { ...estado, usuario: null, cargando: false, error: null }
    default:
      return estado
  }
}

export function ProveedorAutenticacion({ children }) {
  const [estado, dispatch] = useReducer(reductorAutenticacion, estadoInicial)

  useEffect(() => {
    verificarAutenticacion()
  }, [])

  const verificarAutenticacion = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const usuario = await servicioAutenticacion.obtenerPerfil()
        dispatch({ type: 'SET_USUARIO', payload: usuario })
      } else {
        dispatch({ type: 'SET_CARGANDO', payload: false })
      }
    } catch (error) {
      localStorage.removeItem('accessToken')
      dispatch({ type: 'SET_CARGANDO', payload: false })
    }
  }

  const iniciarSesion = async (email, contrasena) => {
    try {
      dispatch({ type: 'SET_CARGANDO', payload: true })
      const { user, accessToken } = await servicioAutenticacion.iniciarSesion(email, contrasena)
      localStorage.setItem('accessToken', accessToken)
      dispatch({ type: 'SET_USUARIO', payload: user })
      return { exito: true }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { exito: false, error: error.message }
    }
  }

  const registrar = async (datosUsuario) => {
    try {
      dispatch({ type: 'SET_CARGANDO', payload: true })
      const { user, accessToken } = await servicioAutenticacion.registrar(datosUsuario)
      localStorage.setItem('accessToken', accessToken)
      dispatch({ type: 'SET_USUARIO', payload: user })
      return { exito: true }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { exito: false, error: error.message }
    }
  }

  const cerrarSesion = async () => {
    try {
      await servicioAutenticacion.cerrarSesion()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      localStorage.removeItem('accessToken')
      dispatch({ type: 'CERRAR_SESION' })
    }
  }

  const valor = {
    usuario: estado.usuario,
    cargando: estado.cargando,
    error: estado.error,
    iniciarSesion,
    registrar,
    cerrarSesion,
    verificarAutenticacion
  }

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  )
}

export { ContextoAutenticacion }
