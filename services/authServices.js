import User from '../db/models/User.js'
import HttpError from '../helpers/HttpError.js'

export const register = async (data) => {
  const { email } = data
  const user = await User.findOne({ where: { email } })
  if (user) {
    throw HttpError(409, 'Email in use')
  }

  return await User.create(data)
}

export default { register }
