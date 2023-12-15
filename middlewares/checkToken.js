const { JWT_SECRET } = require("../constants/env");
const userService = require("../services/userService");
const HttpError = require("./HttpError");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [_, token] = authHeader.split(" ");

  const user = await userService.findUserByToken(token);

  if (!token || !user) {
    return next(new HttpError(401, "Not authorized"));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userService.findUserById(payload.sub);

    if (!user) {
      return next(new HttpError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new HttpError(401, "Unauthorizated"));
  }
};

module.exports = auth;
