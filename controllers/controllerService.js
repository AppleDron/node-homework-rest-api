const {
  removeContact,
  listContacts,
  getContactById,
  addContact,
  updateContact,
} = require("../models/contacts");
const schema = require("../validation/schema");

class ContactService {
  constructor() {}

  getAllContacts = async (req, res, next) => {
    try {
      const contacts = await listContacts();
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  };

  getContactByID = async (req, res, next) => {
    try {
      const contact = await getContactById(req.params.contactId);
      if (!contact.length) {
        res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(...contact);
    } catch (error) {
      res.status(404).json({ message: "Not found" });
      next(error);
    }
  };

  createNewContact = async (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: `Missing ${error.details[0].context.key} field` });
    } else {
      const body = await addContact(value);
      res.status(201).json(body);
    }
    // next(error);
  };

  deleteContact = async (req, res, next) => {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      res.status(200).json({
        message: `Contact deleted`,
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  };

  updateContact = async (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: `Missing ${error.details[0].context.key} field` });
    } else {
      const body = await updateContact(req.params.contactId, value);

      if (!body) {
        res.status(404).json({ message: "Not found" });
      }

      res.status(200).json(body);
    }
  };
}

const contactService = new ContactService();

module.exports = contactService;
