const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'
const ACCESS_TOKEN_EXPIRES = '15m'
const REFRESH_TOKEN_EXPIRES = '7d'

const jwtService = {
  generateAccessToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        community: user.community
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES }
    )
  },

  generateRefreshToken(user) {
    return jwt.sign(
      { userId: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES }
    )
  },

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return null
    }
  },

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET)
    } catch (error) {
      return null
    }
  },

  getRefreshTokenExpiry() {
    // Returns date 7 days from now
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
}

module.exports = jwtService
