const Contact = require("../validation/mongoSchema");

const getContacts = async (limit, startIndex, filter) => {
  const contacts = await Contact.find(filter)
    .where("deletedAt")
    .equals(null)
    .limit(limit)
    .skip(startIndex)
    .exec();
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

  if (!contact || contact.deletedAt) {
    return null;
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
    return contact;
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

const countDocuments = async (filter) => {
  return await Contact.countDocuments(filter).exec();
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  countDocuments,
};
