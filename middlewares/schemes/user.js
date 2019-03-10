const Joi = require('Joi')
const datatypes = require('./datatypes')

/**
 * Schemes to validate User related request parameters
 */

let createUser = Joi.object({
    name: datatypes.userName,
    avatar: datatypes.userAvatar
})

module.exports = {
    createUser
}