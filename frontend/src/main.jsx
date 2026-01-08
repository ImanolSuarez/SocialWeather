import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { ProveedorAutenticacion } from './contexto/ContextoAutenticacion.jsx'
import { ProveedorClima } from './contexto/ContextoClima.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProveedorAutenticacion>
      <ProveedorClima>
        <App />
      </ProveedorClima>
    </ProveedorAutenticacion>
  </React.StrictMode>,
)
