import contactsService from '../services/contactsServices.js'
import HttpError from '../helpers/HttpError.js'
import controllerWrapper from '../decorators/controllerWrapper.js'

export const getAllContacts = controllerWrapper(async (req, res) => {
  const data = await contactsService.listContacts()
  res.json(data)
})

export const getOneContact = controllerWrapper(async (req, res) => {
  const { id } = req.params
  const data = await contactsService.getContactById(id)

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})

export const deleteContact = controllerWrapper(async (req, res) => {
  const { id } = req.params
  const data = await contactsService.removeContact(id)

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})

export const createContact = controllerWrapper(async (req, res) => {
  const { name, email, phone } = req.body
  const data = await contactsService.addContact(name, email, phone)

  res.status(201).json(data)
})

export const updateContact = controllerWrapper(async (req, res) => {
  const { id } = req.params
  const body = req.body

  if (!Object.keys(body).length) throw HttpError(400, 'Body must have at least one field')

  const data = await contactsService.updateContact(id, body)

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})
