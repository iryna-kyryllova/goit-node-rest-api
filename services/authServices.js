import bcrypt from 'bcrypt'
import User from '../db/models/User.js'
import HttpError from '../helpers/HttpError.js'

export const register = async (data) => {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })
  if (user) {
    throw HttpError(409, 'Email in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  return User.create({ ...data, password: hashedPassword })
}

export default { register }
