const Joi = require('joi')

/**
 * Validation middleware
 */
module.exports = () => {

    return (req, res, next) => {
        let result = Joi.validate(req.body)
        if (result.error) {
            next(result.error)
        }
        next()
    }
}