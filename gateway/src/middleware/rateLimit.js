const rateLimit = require('express-rate-limit')

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    error: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

function rateLimitMiddleware(req, res, next) {
  if (req.path.startsWith('/api/auth')) {
    return authLimiter(req, res, next)
  }
  return generalLimiter(req, res, next)
}

module.exports = rateLimitMiddleware
