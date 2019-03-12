const Joi = require('joi')
const datatypes = require('./datatypes')

/**
 * Schemes to validate User related request parameters
 */

let createUser = Joi.object({
    name: datatypes.userName.required(),
    avatar: datatypes.userAvatar.required()
})

module.exports = {
    createUser
}