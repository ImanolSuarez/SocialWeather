const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const jwtService = require('../services/jwtService')

const authController = {
  // Register new user
  async register(req, res) {
    try {
      const { username, email, password, community } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' })
      }

      // Create user
      const user = await User.create({
        username,
        email,
        password,
        community
      })

      // Generate tokens
      const accessToken = jwtService.generateAccessToken(user)
      const refreshToken = jwtService.generateRefreshToken(user)

      // Save refresh token
      await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiresAt: jwtService.getRefreshTokenExpiry()
      })

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })

      res.status(201).json({
        user: user.toJSON(),
        accessToken
      })
    } catch (error) {
      console.error('Register error:', error)
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors[0].message })
      }
      res.status(500).json({ error: 'Error al registrar usuario' })
    }
  },

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body

      // Find user
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({ error: 'Cuenta desactivada' })
      }

      // Validate password
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' })
      }

      // Update last login
      await user.update({ lastLogin: new Date() })

      // Generate tokens
      const accessToken = jwtService.generateAccessToken(user)
      const refreshToken = jwtService.generateRefreshToken(user)

      // Revoke old refresh tokens for this user
      await RefreshToken.update(
        { isRevoked: true },
        { where: { userId: user.id, isRevoked: false } }
      )

      // Save new refresh token
      await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiresAt: jwtService.getRefreshTokenExpiry()
      })

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.json({
        user: user.toJSON(),
        accessToken
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ error: 'Error al iniciar sesión' })
    }
  },

  // Refresh access token
  async refresh(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken

      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' })
      }

      // Verify refresh token
      const decoded = jwtService.verifyRefreshToken(refreshToken)
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid refresh token' })
      }

      // Check if refresh token exists in database and is not revoked
      const storedToken = await RefreshToken.findOne({
        where: { token: refreshToken, isRevoked: false }
      })

      if (!storedToken) {
        return res.status(401).json({ error: 'Refresh token not found or revoked' })
      }

      // Check if token is expired
      if (new Date() > storedToken.expiresAt) {
        await storedToken.update({ isRevoked: true })
        return res.status(401).json({ error: 'Refresh token expired' })
      }

      // Get user
      const user = await User.findByPk(decoded.userId)
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found or inactive' })
      }

      // Generate new access token
      const accessToken = jwtService.generateAccessToken(user)

      // Optionally rotate refresh token
      const newRefreshToken = jwtService.generateRefreshToken(user)
      
      // Revoke old token
      await storedToken.update({ isRevoked: true })
      
      // Create new refresh token
      await RefreshToken.create({
        token: newRefreshToken,
        userId: user.id,
        expiresAt: jwtService.getRefreshTokenExpiry()
      })

      // Set new refresh token cookie
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.json({ accessToken })
    } catch (error) {
      console.error('Refresh error:', error)
      res.status(500).json({ error: 'Error refreshing token' })
    }
  },

  // Logout user
  async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken

      if (refreshToken) {
        // Revoke the refresh token
        await RefreshToken.update(
          { isRevoked: true },
          { where: { token: refreshToken } }
        )
      }

      // Clear the cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      res.json({ message: 'Logged out successfully' })
    } catch (error) {
      console.error('Logout error:', error)
      res.status(500).json({ error: 'Error during logout' })
    }
  },

  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.headers['x-user-id']
      
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' })
      }

      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json(user.toJSON())
    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({ error: 'Error getting profile' })
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.headers['x-user-id']
      const { username, community, avatar } = req.body

      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      await user.update({
        username: username || user.username,
        community: community || user.community,
        avatar: avatar !== undefined ? avatar : user.avatar
      })

      res.json(user.toJSON())
    } catch (error) {
      console.error('Update profile error:', error)
      res.status(500).json({ error: 'Error updating profile' })
    }
  }
}

module.exports = authController
