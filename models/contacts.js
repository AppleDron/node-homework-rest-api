const Contact = require("../validation/mongoSchema");

const listContacts = async () => {
  const contacts = await Contact.find().where("deletedAt").equals(null);
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
    .where("deletedAt")
    .equals(null);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return;
  }

  await Contact.findByIdAndUpdate(contactId, {
    $set: {
      deletedAt: new Date(),
    },
  });

  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return false;
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    returnOriginal: false,
  });
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return false;
  }

  contact.favorite = body.favorite;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, {
    returnOriginal: false,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
