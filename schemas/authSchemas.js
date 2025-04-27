import Joi from 'joi'
import { emailRegex } from '../constants/auth.js'

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(5).required()
})

export const authVerifySchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required()
})

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(5).required()
})
