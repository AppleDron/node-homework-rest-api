const {
  removeContact,
  listContacts,
  getContactById,
  addContact,
  updateContact,
} = require("../../../models/contacts");
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
      res.status(200).json({
        message: `Found a contact by id ${contact[0].id}`,
        data: contact,
      });
    } catch (error) {
      res.status(404).json({ message: "Not found" });
      next(error);
    }
  };

  createNewContact = async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        const body = await addContact(value);
        res.status(201).json({
          message: "Successfully created a new contact",
          data: body,
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Missing required name field" });
      next(error);
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
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(404).json({ message: "Not found" });
      next(error);
    }
  };

  updateContact = async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        const body = await updateContact(req.params.contactId, value);
        res.status(200).json({ message: "template message", data: body });
      }
    } catch (error) {
      res.status(404).json({ message: "Not found" });
      next(error);
    }
  };
}

const contactService = new ContactService();

module.exports = contactService;
