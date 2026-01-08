import api from './api'

export const servicioAutenticacion = {
  async iniciarSesion(email, contrasena) {
    const response = await api.post('/auth/login', { email, password: contrasena })
    return response.data
  },

  async registrar(datosUsuario) {
    const response = await api.post('/auth/register', datosUsuario)
    return response.data
  },

  async cerrarSesion() {
    const response = await api.post('/auth/logout')
    return response.data
  },

  async obtenerPerfil() {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async renovarToken() {
    const response = await api.post('/auth/refresh', {}, {
      withCredentials: true
    })
    return response.data
  },

  async actualizarPerfil(datosUsuario) {
    const response = await api.put('/auth/profile', datosUsuario)
    return response.data
  }
}
