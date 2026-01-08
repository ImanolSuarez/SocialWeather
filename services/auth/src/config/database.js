const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'socialweather',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'socialweather_auth',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('PostgreSQL connection established successfully')
    return true
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error)
    throw error
  }
}

module.exports = { sequelize, testConnection }
