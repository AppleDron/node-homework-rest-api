const Joi = require("joi");

const userSubscribtionSchema = Joi.string().valid("starter", "pro", "business");

module.exports = userSubscribtionSchema;
