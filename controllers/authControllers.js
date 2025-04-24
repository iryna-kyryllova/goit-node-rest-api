import authService from '../services/authServices.js'
import controllerWrapper from '../decorators/controllerWrapper.js'

export const register = controllerWrapper(async (req, res) => {
  const newUser = await authService.register(req.body)

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
})

export const login = controllerWrapper(async (req, res) => {
  const { token, user } = await authService.login(req.body)

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
})

export const logout = controllerWrapper(async (req, res) => {
  const { id } = req.user

  await authService.logout(id)

  res.status(204).json()
})

export const getCurrentUser = controllerWrapper(async (req, res) => {
  const { email, subscription } = req.user

  res.json({
    email,
    subscription
  })
})
