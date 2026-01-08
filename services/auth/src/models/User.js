const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const bcrypt = require('bcryptjs')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  community: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [[
        'andalucia', 'aragon', 'asturias', 'cantabria',
        'castilla-la-mancha', 'castilla-y-leon', 'cataluna',
        'valencia', 'extremadura', 'galicia', 'la-rioja',
        'madrid', 'murcia', 'navarra', 'pais-vasco'
      ]]
    }
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(user.password, salt)
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  }
})

User.prototype.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

User.prototype.toJSON = function() {
  const values = { ...this.get() }
  delete values.password
  return values
}

module.exports = User
