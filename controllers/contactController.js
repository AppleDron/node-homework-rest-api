const {
  removeContact,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const contactService = require("../services/contactService");
const {
  contactSchema,
  favoriteSchema,
} = require("../validation/contactSchema");

class ContactController {
  async getAllContacts(req, res, next) {
    try {
      const contacts = await contactService.getAllContacts(req.query);
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  }

  async getContactByID(req, res, next) {
    try {
      const contact = await getContactById(req.params.contactId);
      if (!contact) {
        return res.status(404).json({ message: "Not found" });
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  }

  async createNewContact(req, res, next) {
    const { error, value } = contactSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: `Missing ${error.details[0].context.key} field` });
    } else {
      const body = await addContact(value);
      res.status(201).json(body);
    }
  }

  async deleteContact(req, res, next) {
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
  }

  async updateContact(req, res, next) {
    try {
      const { error, value } = contactSchema.validate(req.body);

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
  }

  async updateFavorite(req, res, next) {
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
  }
}

const contactController = new ContactController();

module.exports = contactController;
