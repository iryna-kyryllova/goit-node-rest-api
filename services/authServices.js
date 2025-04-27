import bcrypt from 'bcrypt'
import gravatar from 'gravatar'
import User from '../db/models/User.js'
import HttpError from '../helpers/HttpError.js'
import { generateToken } from '../helpers/jwt.js'

const findUser = (query) => User.findOne({ where: query })

const register = async (data) => {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })

  if (user) {
    throw HttpError(409, 'Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const avatar = gravatar.url(email)

  return User.create({ ...data, password: hashedPassword, avatarURL: avatar })
}

const login = async (data) => {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })

  if (!user) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const payload = { id: user.id }

  const token = generateToken(payload)

  await user.update({ token })

  return { token, user }
}

const logout = async (id) => {
  const user = await findUser({ id })

  if (!user || !user.token) {
    throw HttpError(401, 'Not authorized')
  }

  await user.update({ token: null })
}

export default { findUser, register, login, logout }
