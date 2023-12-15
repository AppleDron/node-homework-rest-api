const HttpError = require("../middlewares/HttpError");
const saveFileToStorage = require("../middlewares/saveFileToStorage");
const userService = require("../services/userService");
const userSchema = require("../validation/userSchemaJoi");
const userSubscribtionSchema = require("../validation/userSubscribtionSchema");

class UserController {
  async registrationUser(req, res, next) {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: `Missing ${error.details[0].context.key} field` });
    } else {
      const user = await userService.registration(value);

      if (!user) {
        return res.status(409).json({ message: "Email in use" });
      }

      res
        .status(201)
        .json({ user: { email: user.email, subscription: user.subscription } });
    }
  }

  async loginUser(req, res, next) {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: `Missing ${error.details[0].context.key} field`,
      });
    }

    const user = await userService.login(value);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparedPassword = await userService.comparePasswords(
      value.password,
      user.password
    );

    if (!comparedPassword) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = userService.accessToken(user.id, user.email);

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });

    await userService.updateuserById(user.id, { token });
  }

  async logoutUser(req, res, next) {
    const user = await userService.logout(req.user.id);

    if (!user) {
      return next(new HttpError(401, "Not authorized"));
    }

    user.token = null;
    await user.save();

    res.status(204).json();
  }

  async currentUser(req, res, next) {
    if (!req.user) {
      return next(new HttpError(401, "Not authorized"));
    }

    const user = userService.currentUser(req.user);

    res.status(200).json(user);
  }

  async updateSubscribtion(req, res) {
    const { id, subscription } = req.body;

    const { error, value } = userSubscribtionSchema.validate(subscription);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = userService.updateuserById(id, { subscription: value });

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    return res
      .status(200)
      .json({ message: "Subscribtion updated successfully" });
  }

  async updateAvatar(req, res, next) {
    if (!req.user) {
      return next(new HttpError(401, "Not authorized"));
    }

    const userId = req.user.id;

    const avatarUrl = await saveFileToStorage(req.file);

    const { avatarURL } = await userService.updateuserById(userId, {
      avatarURL: avatarUrl,
    });

    res.status(200).json({ avatarUrl: avatarURL });
  }
}

const userController = new UserController();

module.exports = userController;
