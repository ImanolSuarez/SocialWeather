import axios from 'axios'

// Usar ruta relativa - nginx redirige al gateway
const URL_API = '/api'

const api = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de peticiones - añadir token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de respuestas - manejar renovación de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const peticionOriginal = error.config

    // Si 401 y no hemos intentado renovar todavía
    if (error.response?.status === 401 && !peticionOriginal._retry) {
      peticionOriginal._retry = true

      try {
        const response = await axios.post(`${URL_API}/auth/refresh`, {}, {
          withCredentials: true
        })
        
        const { accessToken } = response.data
        localStorage.setItem('accessToken', accessToken)
        
        peticionOriginal.headers.Authorization = `Bearer ${accessToken}`
        return api(peticionOriginal)
      } catch (errorRenovacion) {
        // Renovación falló, redirigir a login
        localStorage.removeItem('accessToken')
        window.location.href = '/'
        return Promise.reject(errorRenovacion)
      }
    }

    return Promise.reject(error)
  }
)

export default api
