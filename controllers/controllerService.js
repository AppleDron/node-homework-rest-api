const {
  removeContact,
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const { userSchema, favoriteSchema } = require("../validation/userSchema");

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
      if (!contact) {
        return res.status(404).json({ message: "Not found" });
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  };

  createNewContact = async (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: `Missing ${error.details[0].context.key} field` });
    } else {
      const body = await addContact(value);
      res.status(201).json(body);
    }
  };

  deleteContact = async (req, res, next) => {
    try {
      const contact = await removeContact(req.params.contactId);

      if (contact) {
        res.status(200).json({
          message: `Contact deleted`,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  };

  updateContact = async (req, res, next) => {
    try {
      const { error, value } = userSchema.validate(req.body);

      if (error) {
        res
          .status(400)
          .json({ message: `Missing ${error.details[0].context.key} field` });
      } else {
        const body = await updateContact(req.params.contactId, value);

        res.status(200).json(body);
      }
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  };

  updateFavorite = async (req, res, next) => {
    try {
      const { error, value } = favoriteSchema.validate(req.body);
      const contactId = req.params.contactId;

      if (error) {
        res.status(400).json({ message: "missing field favorite" });
      } else {
        const result = await updateStatusContact(contactId, value);
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  };
}

const contactService = new ContactService();

module.exports = contactService;
