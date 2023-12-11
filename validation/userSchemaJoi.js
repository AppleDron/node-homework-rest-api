const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(30).required(),
});

module.exports = { userSchema };
