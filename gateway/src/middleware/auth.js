const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function authMiddleware(req, res, next) {
  // Skip auth for OPTIONS requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    return next()
  }

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' })
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization format' })
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Add user info to headers for downstream services
    req.headers['x-user-id'] = decoded.userId
    req.headers['x-user-email'] = decoded.email
    req.headers['x-user-username'] = decoded.username
    req.headers['x-user-community'] = decoded.community
    
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }
    return res.status(401).json({ error: 'Authentication failed' })
  }
}

module.exports = authMiddleware
