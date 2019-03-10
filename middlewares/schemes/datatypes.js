const Joi = require('joi')
const globalConstants = require('../../const/globalConstants')

/**
 *  Common data types to be used in validations
 */

let userName = Joi.string().empty().max(255)
let userAvatar = Joi.string.empty().regex(globalConstants.URL_REGEX)

module.exports = {
    userName,
    userAvatar
}