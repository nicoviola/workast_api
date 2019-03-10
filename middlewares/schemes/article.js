const Joi = require('joi')
const datatypes = require('./datatypes')

/**
 * Schemes to validate Article related request parameters
 */

let createArticle = Joi.object({
    title: datatypes.articleTitle.required(),
    text: datatypes.articleText.required(),
    userId: datatypes.objectId.required()
})

module.exports = {
    createArticle
}