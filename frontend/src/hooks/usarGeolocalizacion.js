import { useState, useEffect } from 'react'

export function usarGeolocalizacion() {
  const [ubicacion, setUbicacion] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La geolocalización no está soportada en tu navegador')
      setCargando(false)
      return
    }

    const manejadorExito = (posicion) => {
      setUbicacion({
        lat: posicion.coords.latitude,
        lng: posicion.coords.longitude
      })
      setCargando(false)
    }

    const manejadorError = (error) => {
      let mensaje = 'Error desconocido al obtener la ubicación'
      switch (error.code) {
        case error.PERMISSION_DENIED:
          mensaje = 'Permiso de ubicación denegado'
          break
        case error.POSITION_UNAVAILABLE:
          mensaje = 'Información de ubicación no disponible'
          break
        case error.TIMEOUT:
          mensaje = 'Tiempo de espera agotado'
          break
      }
      setError(mensaje)
      setCargando(false)
    }

    navigator.geolocation.getCurrentPosition(manejadorExito, manejadorError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutos de caché
    })
  }, [])

  const actualizar = () => {
    setCargando(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        setUbicacion({
          lat: posicion.coords.latitude,
          lng: posicion.coords.longitude
        })
        setCargando(false)
      },
      (error) => {
        setError('Error al actualizar la ubicación')
        setCargando(false)
      }
    )
  }

  return { ubicacion, error, cargando, actualizar }
}
