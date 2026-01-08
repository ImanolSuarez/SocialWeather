const axios = require('axios')

const AEMET_BASE_URL = process.env.AEMET_BASE_URL || 'https://opendata.aemet.es/opendata/api'
const AEMET_API_KEY = process.env.AEMET_API_KEY

const aemetClient = axios.create({
  baseURL: AEMET_BASE_URL,
  headers: {
    'api_key': AEMET_API_KEY
  },
  timeout: 10000
})

const aemetService = {
  /**
   * AEMET API uses a two-step process:
   * 1. Request returns a URL to the actual data
   * 2. Fetch the data from that URL
   */
  async fetchData(endpoint) {
    try {
      // Step 1: Get the data URL
      const response = await aemetClient.get(endpoint)
      
      if (response.data.estado !== 200) {
        throw new Error(response.data.descripcion || 'AEMET API error')
      }

      const dataUrl = response.data.datos

      if (!dataUrl) {
        throw new Error('No data URL in AEMET response')
      }

      // Step 2: Fetch the actual data
      const dataResponse = await axios.get(dataUrl, { timeout: 10000 })
      return dataResponse.data
    } catch (error) {
      console.error('AEMET API error:', error.message)
      throw error
    }
  },

  /**
   * Get daily forecast for a municipality (3-7 days)
   */
  async getForecastByMunicipio(municipioCode) {
    const endpoint = `/prediccion/especifica/municipio/diaria/${municipioCode}`
    const data = await this.fetchData(endpoint)
    return this.parseForecast(data)
  },

  /**
   * Get hourly forecast for a municipality
   */
  async getHourlyForecastByMunicipio(municipioCode) {
    const endpoint = `/prediccion/especifica/municipio/horaria/${municipioCode}`
    const data = await this.fetchData(endpoint)
    return data
  },

  /**
   * Parse AEMET forecast data into a cleaner format
   */
  parseForecast(data) {
    if (!data || !data[0] || !data[0].prediccion) {
      return []
    }

    const forecast = data[0]
    const days = forecast.prediccion.dia

    return days.map(day => ({
      fecha: day.fecha,
      estadoCielo: this.getMainSkyState(day.estadoCielo),
      temperatura: {
        maxima: day.temperatura?.maxima,
        minima: day.temperatura?.minima
      },
      sensTermica: {
        maxima: day.sensTermica?.maxima,
        minima: day.sensTermica?.minima
      },
      humedadRelativa: {
        maxima: day.humedadRelativa?.maxima,
        minima: day.humedadRelativa?.minima
      },
      viento: this.getMainWind(day.viento),
      probPrecipitacion: this.getMaxPrecipitation(day.probPrecipitacion),
      cotaNieveProv: day.cotaNieveProv,
      uvMax: day.uvMax
    }))
  },

  /**
   * Get the main sky state for the day
   */
  getMainSkyState(estadoCielo) {
    if (!estadoCielo || estadoCielo.length === 0) {
      return { value: '11', descripcion: 'Despejado' }
    }
    
    // Get midday state (around 12:00-15:00) or first available
    const middayState = estadoCielo.find(e => 
      e.periodo === '12-18' || e.periodo === '00-24' || !e.periodo
    ) || estadoCielo[0]

    return {
      value: middayState.value,
      descripcion: middayState.descripcion
    }
  },

  /**
   * Get the main wind info for the day
   */
  getMainWind(viento) {
    if (!viento || viento.length === 0) {
      return { direccion: null, velocidad: null }
    }

    const middayWind = viento.find(v => 
      v.periodo === '12-18' || v.periodo === '00-24' || !v.periodo
    ) || viento[0]

    return {
      direccion: middayWind.direccion,
      velocidad: middayWind.velocidad
    }
  },

  /**
   * Get the maximum precipitation probability
   */
  getMaxPrecipitation(probPrecipitacion) {
    if (!probPrecipitacion || probPrecipitacion.length === 0) {
      return 0
    }

    return Math.max(...probPrecipitacion.map(p => parseInt(p.value) || 0))
  },

  /**
   * Get current observation data for a station
   */
  async getCurrentObservation(stationCode) {
    const endpoint = `/observacion/convencional/datos/estacion/${stationCode}`
    return await this.fetchData(endpoint)
  },

  /**
   * Get all municipios from AEMET
   */
  async getAllMunicipios() {
    const endpoint = `/maestro/municipios`
    return await this.fetchData(endpoint)
  }
}

module.exports = aemetService
