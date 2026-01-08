import { useContext } from 'react'
import { ContextoClima } from '../contexto/ContextoClima'

export function usarClima() {
  const contexto = useContext(ContextoClima)
  if (!contexto) {
    throw new Error('usarClima debe usarse dentro de un ProveedorClima')
  }
  return contexto
}
