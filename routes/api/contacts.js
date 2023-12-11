const express = require("express");
const contactController = require("../../controllers/contactController");

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContactByID);

router.post("/", contactController.createNewContact);

router.delete("/:contactId", contactController.deleteContact);

router.put("/:contactId", contactController.updateContact);

router.patch("/:contactId/favorite", contactController.updateFavorite);

module.exports = router;
