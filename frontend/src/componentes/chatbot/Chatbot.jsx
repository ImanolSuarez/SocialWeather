import { useState, useRef, useEffect } from 'react'

const URL_WEBHOOK = 'http://localhost:5678/webhook/flujo_n8n'

function Chatbot() {
  const [estaAbierto, setEstaAbierto] = useState(false)
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      tipo: 'bot',
      texto: '¡Hola! Soy el asistente de SocialWeather. Pregúntame sobre el clima de cualquier ciudad de España. Por ejemplo: "¿Qué tiempo hace en Madrid?"'
    }
  ])
  const [valorInput, setValorInput] = useState('')
  const [estaCargando, setEstaCargando] = useState(false)
  const refFinMensajes = useRef(null)
  const refInput = useRef(null)

  useEffect(() => {
    refFinMensajes.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])
  
  useEffect(() => {
    if (estaAbierto && refInput.current) {
      refInput.current.focus()
    }
  }, [estaAbierto])

  const enviarMensaje = async () => {
    const mensajeLimpio = valorInput.trim()
    if (!mensajeLimpio || estaCargando) return

    // Añadir mensaje del usuario
    const mensajeUsuario = {
      id: Date.now(),
      tipo: 'usuario',
      texto: mensajeLimpio
    }
    setMensajes(prev => [...prev, mensajeUsuario])
    setValorInput('')
    setEstaCargando(true)

    try {
      const respuesta = await fetch(`${URL_WEBHOOK}?message=${encodeURIComponent(mensajeLimpio)}`)
      
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      // Parsear la respuesta
      let textoMensaje = ''
      const tipoContenido = respuesta.headers.get('content-type')
      
      if (tipoContenido && tipoContenido.includes('application/json')) {
        const datos = await respuesta.json()
        // Extraer output de la respuesta JSON
        textoMensaje = datos.output || datos.message || datos.text || JSON.stringify(datos)
      } else {
        const texto = await respuesta.text()
        // Intentar parsear como JSON si parece JSON
        if (texto.startsWith('{') || texto.startsWith('[')) {
          try {
            const parseado = JSON.parse(texto)
            textoMensaje = parseado.output || parseado.message || parseado.text || texto
          } catch {
            textoMensaje = texto
          }
        } else {
          textoMensaje = texto
        }
      }
      
      // Añadir respuesta del bot
      const mensajeBot = {
        id: Date.now() + 1,
        tipo: 'bot',
        texto: textoMensaje || 'Lo siento, no pude procesar tu solicitud, comprueba que la ciudad esté escrita correctamente o que la API esté funcionando.'
      }
      setMensajes(prev => [...prev, mensajeBot])
    } catch (error) {
      console.error('Error enviando mensaje:', error)
      const mensajeError = {
        id: Date.now() + 1,
        tipo: 'bot',
        texto: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.'
      }
      setMensajes(prev => [...prev, mensajeError])
    } finally {
      setEstaCargando(false)
    }
  }

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensaje()
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setEstaAbierto(!estaAbierto)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          estaAbierto 
            ? 'bg-gray-600 hover:bg-gray-700 rotate-90' 
            : 'bg-primary-500 hover:bg-primary-600 hover:scale-110'
        }`}
        aria-label={estaAbierto ? 'Cerrar chat' : 'Abrir chat'}
      >
        {estaAbierto ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </button>

      {/* Ventana del chat */}
      {estaAbierto && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in overflow-hidden border border-gray-200">
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">Chatbot</h3>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`flex ${mensaje.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl chat-message ${
                    mensaje.tipo === 'usuario'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{mensaje.texto}</p>
                </div>
              </div>
            ))}

            {/* Indicador de carga */}
            {estaCargando && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={refFinMensajes} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                ref={refInput}
                type="text"
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
                onKeyPress={manejarTecla}
                placeholder={estaCargando ? 'Esperando respuesta...' : 'Escribe tu mensaje...'}
                disabled={estaCargando}
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={enviarMensaje}
                disabled={!valorInput.trim() || estaCargando}
                className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500"
                aria-label="Enviar mensaje"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
