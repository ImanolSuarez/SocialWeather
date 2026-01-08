const express = require('express')
const weatherController = require('../controllers/weatherController')

const router = express.Router()

// Get all municipios from AEMET
router.get('/municipios', weatherController.getAllMunicipios)

// Search municipios by name
router.get('/municipios/search', weatherController.searchMunicipios)

// Get forecast by municipio ID
router.get('/forecast/:municipioId', weatherController.getForecast)

// Get current weather by coordinates
router.get('/current', weatherController.getCurrentWeather)

// Get municipio by coordinates
router.get('/municipio', weatherController.getMunicipioByCoordinates)

module.exports = router
