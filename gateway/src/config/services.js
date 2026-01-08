const services = {
  auth: {
    host: process.env.AUTH_SERVICE_HOST || 'localhost',
    port: process.env.AUTH_SERVICE_PORT || 4001
  },
  weather: {
    host: process.env.WEATHER_SERVICE_HOST || 'localhost',
    port: process.env.WEATHER_SERVICE_PORT || 4002
  }
}

module.exports = { services }
