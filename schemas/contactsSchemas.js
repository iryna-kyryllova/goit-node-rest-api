import Joi from 'joi'
import { emailRegex } from '../constants/auth.js'

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegex),
  phone: Joi.string(),
  favorite: Joi.boolean()
})

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required()
})
