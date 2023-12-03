const express = require("express");
const contactService = require("../../controllers/controllerService");

const router = express.Router();

router.get("/", contactService.getAllContacts);

router.get("/:contactId", contactService.getContactByID);

router.post("/", contactService.createNewContact);

router.delete("/:contactId", contactService.deleteContact);

router.put("/:contactId", contactService.updateContact);

router.patch("/:contactId/favorite", contactService.updateFavorite);

module.exports = router;
