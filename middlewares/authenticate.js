import HttpError from '../helpers/HttpError.js'
import { findUser } from '../services/authServices.js'
import { verifyToken } from '../helpers/jwt.js'

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return next(HttpError(401, 'Not authorized 1'))
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer' || !token) {
    return next(HttpError(401, 'Not authorized 2'))
  }

  const { payload, error } = verifyToken(token)

  if (error) {
    return next(HttpError(401, 'Not authorized 3'))
  }

  const user = await findUser({ email: payload.email })

  if (!user) {
    return next(HttpError(401, 'Not authorized 4'))
  }

  next()
}

export default authenticate
