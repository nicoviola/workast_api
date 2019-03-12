const Joi = require('joi')
const datatypes = require('./datatypes')

/**
 * Schemes to validate Article related request parameters
 */

let createArticle = Joi.object({
    title: datatypes.articleTitle.required(),
    text: datatypes.articleText.required(),
    userId: datatypes.objectId.required(),
    tags: datatypes.tags.optional()
})

let updateArticle = Joi.object({
    title: datatypes.articleTitle.optional(),
    text: datatypes.articleText.optional(),
    userId: datatypes.objectId.optional(),
    tags: datatypes.tags.optional()
})

module.exports = {
    createArticle,
    updateArticle
}