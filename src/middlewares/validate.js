const Joi = require('joi')

/**
 * Validation middleware
 */
module.exports = (scheme) => {


    return (req, res, next) => {
        let result = Joi.validate(req.body, scheme)
        if (result.error) {
            next(result.error)
        }
        next()
    }
}