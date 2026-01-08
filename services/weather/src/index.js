require('dotenv').config()
const express = require('express')
const cors = require('cors')
const weatherRoutes = require('./routes/weather')
const { testRedisConnection } = require('./services/cacheService')

const app = express()
const PORT = process.env.WEATHER_SERVICE_PORT || 4002

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'weather' })
})

// Routes
app.use('/weather', weatherRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error('Weather service error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

// Start server
async function start() {
  try {
    // Test Redis connection
    await testRedisConnection()

    app.listen(PORT, () => {
      console.log(`🌤️ Weather service running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start weather service:', error)
    process.exit(1)
  }
}

start()
