require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')
const authMiddleware = require('./middleware/auth')
const rateLimitMiddleware = require('./middleware/rateLimit')
const { services } = require('./config/services')

const app = express()
const PORT = process.env.GATEWAY_PORT || 80

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable for development
}))

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Logging
app.use(morgan('combined'))

// Rate limiting
app.use(rateLimitMiddleware)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Auth service routes (public - no JWT required)
app.use('/api/auth', createProxyMiddleware({
  target: `http://${services.auth.host}:${services.auth.port}`,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/auth'
  },
  onError: (err, req, res) => {
    console.error('Auth proxy error:', err)
    res.status(502).json({ error: 'Auth service unavailable' })
  }
}))

// Protected routes - require JWT
app.use('/api/weather', authMiddleware, createProxyMiddleware({
  target: `http://${services.weather.host}:${services.weather.port}`,
  changeOrigin: true,
  pathRewrite: {
    '^/api/weather': '/weather'
  },
  onError: (err, req, res) => {
    console.error('Weather proxy error:', err)
    res.status(502).json({ error: 'Weather service unavailable' })
  }
}))

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Gateway error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`)
  console.log(`Proxying to services:`)
  console.log(`  - Auth: ${services.auth.host}:${services.auth.port}`)
  console.log(`  - Weather: ${services.weather.host}:${services.weather.port}`)
})
