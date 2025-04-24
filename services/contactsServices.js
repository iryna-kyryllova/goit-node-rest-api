import Contact from '../db/models/Contact.js'

const listContacts = (query) => Contact.findAll({ where: query })

const getContactById = (contactId) => Contact.findByPk(contactId)

const getContact = (query) => Contact.findOne({ where: query })

const removeContact = async (query) => {
  const contact = await getContact(query)
  if (!contact) return null
  await contact.destroy()
  return contact
}

const addContact = (data) => Contact.create(data)

const updateContact = async (query, data) => {
  const contact = await getContact(query)
  if (!contact) return null
  return contact.update(data, { returning: true })
}

const updateStatusContact = async (query, data) => {
  const contact = await getContact(query)
  if (!contact) return null
  return contact.update(data, { returning: true })
}

export default {
  listContacts,
  getContactById,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
