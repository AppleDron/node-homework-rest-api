const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(9).max(20).required(),
});

module.exports = schema;
