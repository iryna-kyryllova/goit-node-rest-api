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
