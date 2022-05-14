
/**
 *
 * @param schema - The joi validator object schema that entails how the data should look like
 * @param source - The property in the request data that should be validated
 * @returns
 */

const { BadRequestError } = require("../../lib/appError");

const Validator =
    (schema, source) =>
        (req, res, next) => {
            const result = schema.validate(req[source]);

            if (result.error) {
                throw new BadRequestError(result.error.message)
            }
            next();
        };
module.exports = { Validator };
