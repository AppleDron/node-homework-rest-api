const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      message: "Successfully found a contact list",
      data: contacts,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    res.json({
      message: `Found a contact by id ${contact[0].id}`,
      data: contact,
      statusCode: 200,
    });
  } catch (error) {
    res.json({ message: "Not found", statusCode: 404 });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = await addContact(req.body);
    res.json({
      message: "Successfully created a new contact",
      data: body,
      statusCode: 201,
    });
  } catch (error) {
    res.json({ message: "missing required name field", statusCode: 400 });
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    res.json({
      message: `Deleted contact with id ${contact[0].id}`,
      data: contact,
      statusCode: 200,
    });
  } catch (error) {
    res.json({ message: "Not found", statusCode: 404 });
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = await updateContact(req.params.contactId, req.body);

    console.log(body);
    res.json({ message: "template message", data: body, statusCode: 200 });
  } catch (error) {
    res.json({ message: "Not found", statusCode: 404 });
    next(error);
  }
});

module.exports = router;
