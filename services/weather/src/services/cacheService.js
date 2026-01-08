const Redis = require('ioredis')

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true
})

redis.on('error', (err) => {
  console.error('Redis error:', err)
})

redis.on('connect', () => {
  console.log('✅ Redis connected')
})

// Cache TTL values (in seconds)
const TTL = {
  FORECAST_DAILY: 3600,      // 1 hour
  FORECAST_HOURLY: 1800,     // 30 minutes
  CURRENT_WEATHER: 600,      // 10 minutes
  MUNICIPIO: 86400           // 24 hours (static data)
}

const cacheService = {
  async get(key) {
    try {
      const data = await redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  },

  async set(key, value, ttl = TTL.FORECAST_DAILY) {
    try {
      await redis.setex(key, ttl, JSON.stringify(value))
    } catch (error) {
      console.error('Cache set error:', error)
    }
  },

  async del(key) {
    try {
      await redis.del(key)
    } catch (error) {
      console.error('Cache del error:', error)
    }
  },

  // Cache key generators
  keys: {
    forecast: (municipioId) => `aemet:forecast:${municipioId}`,
    hourlyForecast: (municipioId) => `aemet:hourly:${municipioId}`,
    current: (lat, lng) => `aemet:current:${lat.toFixed(2)}:${lng.toFixed(2)}`,
    municipio: (lat, lng) => `municipio:${lat.toFixed(2)}:${lng.toFixed(2)}`
  },

  TTL
}

async function testRedisConnection() {
  try {
    await redis.connect()
    await redis.ping()
    console.log('✅ Redis connection established')
    return true
  } catch (error) {
    console.warn('⚠️ Redis connection failed, caching disabled:', error.message)
    return false
  }
}

module.exports = { cacheService, testRedisConnection, redis }
