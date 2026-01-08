import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Icono de marcador personalizado
const crearIcono = (color = '#3B82F6') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.164 0 0 7.164 0 16c0 12 16 24 16 24s16-12 16-24C32 7.164 24.836 0 16 0z" fill="${color}"/>
        <circle cx="16" cy="16" r="8" fill="white"/>
      </svg>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
  })
}

export default function MarcadorUbicacion({ posicion, color, children }) {
  return (
    <Marker position={posicion} icon={crearIcono(color)}>
      {children && <Popup>{children}</Popup>}
    </Marker>
  )
}
