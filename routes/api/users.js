const express = require("express");
const userController = require("../../controllers/userController");
const auth = require("../../middlewares/checkToken");

const router = express.Router();

router.post("/register", userController.registrationUser);

router.post("/login", userController.loginUser);

router.post("/logout", auth, userController.logoutUser);

router.get("/current", auth, userController.currentUser);
router.patch("/", userController.updateSubscribtion);

module.exports = router;
