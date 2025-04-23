import { DataTypes } from 'sequelize'
import sequelize from '../Sequelize.js'
import { emailRegex } from '../../constants/auth.js'

const User = sequelize.define('user', {
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: emailRegex
    }
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ['starter', 'pro', 'business'],
    defaultValue: 'starter'
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null
  }
})

// User.sync()

export default User
