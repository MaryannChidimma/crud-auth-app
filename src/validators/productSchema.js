const Joi = require("joi")

const addProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});
const queryProductsSchema = Joi.object({
    search: Joi.string(),
})
const idValidation = Joi.object({
    id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({ "string.pattern.base": "Product Id" })
        .required(),
})

module.exports = {
    addProductSchema,
    queryProductsSchema,
    idValidation
}