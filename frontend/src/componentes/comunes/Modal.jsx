import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export default function Modal({ estaAbierto, alCerrar, titulo, children, tamano = 'md' }) {
  if (!estaAbierto) return null

  const clasesTamano = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }

  const contenidoModal = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Fondo oscuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={alCerrar}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative bg-white rounded-xl shadow-xl ${clasesTamano[tamano]} w-full animate-slide-up z-[10000]`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera */}
          {titulo && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
              <button
                onClick={alCerrar}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Contenido */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(contenidoModal, document.body)
}
