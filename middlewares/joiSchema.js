const Joi = require('joi');

module.exports.userSchema = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(25),
    email: Joi.string().required(),
    password: Joi.string().required().min(5)
})

module.exports.userSchemaLogin = Joi.object({
    username: Joi.string().required().alphanum().min(3).max(25),
    password: Joi.string().required().min(4)
})


module.exports.newDataSchema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3),
    tag: Joi.array().items(Joi.string()).default(['General']),
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming it's a valid ObjectId string
  });