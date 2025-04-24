import express from 'express'
import { register, login, logout, getCurrentUser } from '../controllers/authControllers.js'
import validateBody from '../helpers/validateBody.js'
import { authRegisterSchema, authLoginSchema } from '../schemas/authSchemas.js'
import authenticate from '../middlewares/authenticate.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(authRegisterSchema), register)

authRouter.post('/login', validateBody(authLoginSchema), login)

authRouter.post('/logout', authenticate, logout)

authRouter.get('/current', authenticate, getCurrentUser)

export default authRouter
