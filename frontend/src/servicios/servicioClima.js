import api from './api'

export const servicioClima = {
  async obtenerClimaActual(lat, lng) {
    const response = await api.get(`/weather/current`, {
      params: { lat, lng }
    })
    return response.data
  },

  async obtenerPronostico(idMunicipio) {
    const response = await api.get(`/weather/forecast/${idMunicipio}`)
    return response.data
  },

  async obtenerMunicipioPorCoordenadas(lat, lng) {
    const response = await api.get(`/weather/municipio`, {
      params: { lat, lng }
    })
    return response.data
  },

  async obtenerTodosMunicipios() {
    const response = await api.get(`/weather/municipios`)
    return response.data
  },

  async buscarMunicipios(query) {
    const response = await api.get(`/weather/municipios/search`, {
      params: { q: query }
    })
    return response.data
  }
}
