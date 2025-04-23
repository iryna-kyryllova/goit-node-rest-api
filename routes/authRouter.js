import express from 'express'
import { register, login } from '../controllers/authControllers.js'
import validateBody from '../helpers/validateBody.js'
import { authRegisterSchema, authLoginSchema } from '../schemas/authSchemas.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(authRegisterSchema), register)

authRouter.post('/login', validateBody(authLoginSchema), login)

export default authRouter
