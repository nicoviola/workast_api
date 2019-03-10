const Joi = require('joi')
const globalConstants = require('../../const/globalConstants')
Joi.objectId = require('joi-objectid')(Joi);
/**
 *  Common data types to be used in validations
 */

let userName = Joi.string().empty().max(255)
let userAvatar = Joi.string().empty().regex(globalConstants.URL_REGEX)
let objectId = Joi.objectId()
let articleText = Joi.string().empty()
let articleTitle = Joi.string().empty().max(255)

module.exports = {
    userName,
    userAvatar,
    objectId,
    articleText,
    articleTitle
}