require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { sequelize, testConnection } = require('./config/database')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.AUTH_SERVICE_PORT || 4001

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:80'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth' })
})

// Routes
app.use('/auth', authRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error('Auth service error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

// Start server
async function start() {
  try {
    // Test database connection
    await testConnection()
    
    // Sync models (create tables if they don't exist)
    await sequelize.sync({ alter: true })
    console.log('✅ Database models synchronized')

    app.listen(PORT, () => {
      console.log(`🔐 Auth service running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start auth service:', error)
    process.exit(1)
  }
}

start()
