import express from 'express'
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateAvatar
} from '../controllers/authControllers.js'
import validateBody from '../helpers/validateBody.js'
import { authRegisterSchema, authLoginSchema } from '../schemas/authSchemas.js'
import authenticate from '../middlewares/authenticate.js'
import upload from '../middlewares/upload.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(authRegisterSchema), register)

authRouter.post('/login', validateBody(authLoginSchema), login)

authRouter.post('/logout', authenticate, logout)

authRouter.get('/current', authenticate, getCurrentUser)

authRouter.patch('/avatars', upload.single('avatar'), authenticate, updateAvatar)

export default authRouter
