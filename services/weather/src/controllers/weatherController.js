const aemetService = require('../services/aemetService')
const { cacheService } = require('../services/cacheService')
const { findMunicipioByCoordinates, searchMunicipiosByName } = require('../utils/municipios')

const weatherController = {
  /**
   * Get forecast for a municipio (3 days)
   */
  async getForecast(req, res) {
    try {
      const { municipioId } = req.params

      if (!municipioId || municipioId.length !== 5) {
        return res.status(400).json({ error: 'Invalid municipio ID' })
      }

      // Check cache
      const cacheKey = cacheService.keys.forecast(municipioId)
      const cached = await cacheService.get(cacheKey)
      
      if (cached) {
        return res.json(cached)
      }

      // Fetch from AEMET
      const forecast = await aemetService.getForecastByMunicipio(municipioId)
      
      // Cache the result
      await cacheService.set(cacheKey, forecast, cacheService.TTL.FORECAST_DAILY)

      res.json(forecast)
    } catch (error) {
      console.error('Get forecast error:', error)
      res.status(500).json({ error: 'Error al obtener el pronóstico' })
    }
  },

  /**
   * Get current weather by coordinates
   */
  async getCurrentWeather(req, res) {
    try {
      const { lat, lng } = req.query

      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude required' })
      }

      const latitude = parseFloat(lat)
      const longitude = parseFloat(lng)

      // Find the closest municipio
      const municipio = findMunicipioByCoordinates(latitude, longitude)
      
      if (!municipio) {
        return res.status(404).json({ error: 'No municipio found for coordinates' })
      }

      // Check cache
      const cacheKey = cacheService.keys.current(latitude, longitude)
      const cached = await cacheService.get(cacheKey)
      
      if (cached) {
        return res.json(cached)
      }

      // Get today's forecast as "current" weather
      const forecast = await aemetService.getForecastByMunicipio(municipio.id)
      
      if (!forecast || forecast.length === 0) {
        return res.status(404).json({ error: 'No forecast data available' })
      }

      const today = forecast[0]
      const currentWeather = {
        municipio: municipio,
        fecha: today.fecha,
        estadoCielo: today.estadoCielo,
        temperatura: {
          actual: Math.round((today.temperatura.maxima + today.temperatura.minima) / 2),
          maxima: today.temperatura.maxima,
          minima: today.temperatura.minima
        },
        sensTermica: today.sensTermica,
        humedadRelativa: today.humedadRelativa?.maxima || null,
        viento: today.viento,
        probPrecipitacion: today.probPrecipitacion,
        uvMax: today.uvMax
      }

      // Cache the result
      await cacheService.set(cacheKey, currentWeather, cacheService.TTL.CURRENT_WEATHER)

      res.json(currentWeather)
    } catch (error) {
      console.error('Get current weather error:', error)
      res.status(500).json({ error: 'Error al obtener el clima actual' })
    }
  },

  /**
   * Get municipio by coordinates
   */
  async getMunicipioByCoordinates(req, res) {
    try {
      const { lat, lng } = req.query

      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude required' })
      }

      const latitude = parseFloat(lat)
      const longitude = parseFloat(lng)

      // Check cache
      const cacheKey = cacheService.keys.municipio(latitude, longitude)
      const cached = await cacheService.get(cacheKey)
      
      if (cached) {
        return res.json(cached)
      }

      const municipio = findMunicipioByCoordinates(latitude, longitude)
      
      if (!municipio) {
        return res.status(404).json({ error: 'No municipio found for coordinates' })
      }

      // Cache the result
      await cacheService.set(cacheKey, municipio, cacheService.TTL.MUNICIPIO)

      res.json(municipio)
    } catch (error) {
      console.error('Get municipio error:', error)
      res.status(500).json({ error: 'Error al obtener el municipio' })
    }
  },

  /**
   * Search municipios by name
   */
  async searchMunicipios(req, res) {
    try {
      const { q } = req.query

      if (!q || q.length < 2) {
        return res.status(400).json({ error: 'Query must be at least 2 characters' })
      }

      const results = searchMunicipiosByName(q)
      res.json(results)
    } catch (error) {
      console.error('Search municipios error:', error)
      res.status(500).json({ error: 'Error al buscar municipios' })
    }
  },

  /**
   * Get all municipios from AEMET API
   */
  async getAllMunicipios(req, res) {
    try {
      // Check cache first (municipios don't change often)
      const cacheKey = 'aemet:all_municipios'
      const cached = await cacheService.get(cacheKey)
      
      if (cached) {
        return res.json(cached)
      }

      // Fetch from AEMET
      const municipios = await aemetService.getAllMunicipios()
      
      // Parse and format the data
      const formattedMunicipios = municipios.map(m => ({
        id: m.id?.replace('id', '') || m.codigo_ine || m.id,
        nombre: m.nombre,
        provincia: m.provincia?.nombre || m.provincia,
        comunidad: m.comunidad_autonoma?.nombre || m.comunidad_autonoma,
        latitud: parseFloat(m.latitud_dec || m.latitud) || null,
        longitud: parseFloat(m.longitud_dec || m.longitud) || null,
        altitud: m.altitud || null,
        capital_provincia: m.capital_provincia || false
      })).filter(m => m.latitud && m.longitud) // Only include municipios with coordinates

      // Cache for 24 hours (municipios don't change)
      await cacheService.set(cacheKey, formattedMunicipios, 86400)

      res.json(formattedMunicipios)
    } catch (error) {
      console.error('Get all municipios error:', error)
      res.status(500).json({ error: 'Error al obtener municipios de AEMET' })
    }
  }
}

module.exports = weatherController
