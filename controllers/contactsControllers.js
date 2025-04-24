import contactsService from '../services/contactsServices.js'
import HttpError from '../helpers/HttpError.js'
import controllerWrapper from '../decorators/controllerWrapper.js'

export const getAllContacts = controllerWrapper(async (req, res) => {
  const { id: owner } = req.user
  const data = await contactsService.listContacts(owner)
  res.json(data)
})

export const getOneContact = controllerWrapper(async (req, res) => {
  const { id: owner } = req.user
  const { id } = req.params
  const data = await contactsService.getContact({ id, owner })

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})

export const deleteContact = controllerWrapper(async (req, res) => {
  const { id: owner } = req.user
  const { id } = req.params
  const data = await contactsService.removeContact({ id, owner })

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})

export const createContact = controllerWrapper(async (req, res) => {
  const { id: owner } = req.user
  const data = await contactsService.addContact({ ...req.body, owner })

  res.status(201).json(data)
})

export const updateContact = controllerWrapper(async (req, res) => {
  const { id: owner } = req.user
  const { id } = req.params
  const body = req.body

  if (!Object.keys(body).length) throw HttpError(400, 'Body must have at least one field')

  const data = await contactsService.updateContact({ id, owner }, body)

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})

export const updateStatusContact = controllerWrapper(async (req, res) => {
  const { id: owner } = req.user
  const { id } = req.params
  const body = req.body

  if (!body) throw HttpError(400, 'Missing field favorite')

  const data = await contactsService.updateStatusContact({ id, owner }, body)

  if (!data) throw HttpError(404, 'Not found')

  res.json(data)
})
