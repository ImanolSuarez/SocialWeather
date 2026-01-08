const express = require('express')
const { body, validationResult } = require('express-validator')
const authController = require('../controllers/authController')

const router = express.Router()

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
  next()
}

// Register
router.post('/register', [
  body('username')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('community')
    .isIn([
      'andalucia', 'aragon', 'asturias', 'cantabria',
      'castilla-la-mancha', 'castilla-y-leon', 'cataluna',
      'valencia', 'extremadura', 'galicia', 'la-rioja',
      'madrid', 'murcia', 'navarra', 'pais-vasco'
    ])
    .withMessage('Comunidad autónoma inválida')
], validate, authController.register)

// Login
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
], validate, authController.login)

// Refresh token
router.post('/refresh', authController.refresh)

// Logout
router.post('/logout', authController.logout)

// Get profile (requires auth via gateway)
router.get('/profile', authController.getProfile)

// Update profile (requires auth via gateway)
router.put('/profile', [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('community')
    .optional()
    .isIn([
      'andalucia', 'aragon', 'asturias', 'cantabria',
      'castilla-la-mancha', 'castilla-y-leon', 'cataluna',
      'valencia', 'extremadura', 'galicia', 'la-rioja',
      'madrid', 'murcia', 'navarra', 'pais-vasco'
    ])
    .withMessage('Comunidad autónoma inválida')
], validate, authController.updateProfile)

module.exports = router
