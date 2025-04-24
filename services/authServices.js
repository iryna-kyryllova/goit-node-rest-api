import bcrypt from 'bcrypt'
import User from '../db/models/User.js'
import HttpError from '../helpers/HttpError.js'
import { generateToken } from '../helpers/jwt.js'

export const findUser = (query) => User.findOne({ where: query })

export const register = async (data) => {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })

  if (user) {
    throw HttpError(409, 'Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  return User.create({ ...data, password: hashedPassword })
}

export const login = async (data) => {
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

  return { token, user }
}

export default { register, login }
