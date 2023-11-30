const fs = require("node:fs/promises");
const path = require("node:path");
const shortid = require("shortid");

const pathToContacts = path.join(process.cwd(), "models", "contacts.json");

const listContacts = async () => {
  const db = await fs.readFile(pathToContacts);
  const contacts = JSON.parse(db.toString());
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.filter(({ id }) => contactId === id);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);

  if (index === -1) {
    return false;
  } else {
    const filteredContacts = contacts.filter(({ id }) => contactId !== id);
    await fs.writeFile(pathToContacts, JSON.stringify(filteredContacts));
    return true;
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  body.id = shortid.generate();
  const newContactList = [...contacts, body];

  await fs.writeFile(pathToContacts, JSON.stringify(newContactList));
  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);

  if (index === -1) {
    return false;
  }
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await fs.writeFile(pathToContacts, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
