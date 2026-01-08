const rateLimit = require('express-rate-limit')

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Stricter rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Apply appropriate rate limiter based on path
function rateLimitMiddleware(req, res, next) {
  if (req.path.startsWith('/api/auth')) {
    return authLimiter(req, res, next)
  }
  return generalLimiter(req, res, next)
}

module.exports = rateLimitMiddleware
