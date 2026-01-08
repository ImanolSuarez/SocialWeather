import { createContext, useReducer } from 'react'

const ContextoClima = createContext(null)

const estadoInicial = {
  climaActual: null,
  pronostico: null,
  ubicacionSeleccionada: null,
  cargando: false,
  error: null
}

function reductorClima(estado, accion) {
  switch (accion.type) {
    case 'SET_CARGANDO':
      return { ...estado, cargando: accion.payload }
    case 'SET_CLIMA_ACTUAL':
      return { ...estado, climaActual: accion.payload, cargando: false, error: null }
    case 'SET_PRONOSTICO':
      return { ...estado, pronostico: accion.payload, cargando: false, error: null }
    case 'SET_UBICACION_SELECCIONADA':
      return { ...estado, ubicacionSeleccionada: accion.payload }
    case 'SET_ERROR':
      return { ...estado, error: accion.payload, cargando: false }
    case 'LIMPIAR_CLIMA':
      return { ...estadoInicial }
    default:
      return estado
  }
}

export function ProveedorClima({ children }) {
  const [estado, dispatch] = useReducer(reductorClima, estadoInicial)

  const establecerClimaActual = (clima) => {
    dispatch({ type: 'SET_CLIMA_ACTUAL', payload: clima })
  }

  const establecerPronostico = (pronostico) => {
    dispatch({ type: 'SET_PRONOSTICO', payload: pronostico })
  }

  const establecerUbicacionSeleccionada = (ubicacion) => {
    dispatch({ type: 'SET_UBICACION_SELECCIONADA', payload: ubicacion })
  }

  const establecerCargando = (cargando) => {
    dispatch({ type: 'SET_CARGANDO', payload: cargando })
  }

  const establecerError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  const valor = {
    ...estado,
    establecerClimaActual,
    establecerPronostico,
    establecerUbicacionSeleccionada,
    establecerCargando,
    establecerError
  }

  return (
    <ContextoClima.Provider value={valor}>
      {children}
    </ContextoClima.Provider>
  )
}

export { ContextoClima }
