import Contact from '../db/models/Contact.js'

const listContacts = () => Contact.findAll()

const getContactById = (contactId) => Contact.findByPk(contactId)

const removeContact = (contactId) => Contact.destroy({ where: { id: contactId } })

const addContact = (name, email, phone) => Contact.create({ name, email, phone })

const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId)
  if (!contact) return null
  return contact.update(data, { returning: true })
}

const updateStatusContact = async (contactId, data) => {
  const contact = await getContactById(contactId)
  if (!contact) return null
  return contact.update(data, { returning: true })
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
