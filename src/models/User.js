const { Schema, model} = require('mongoose')
const validate = require('mongoose-validator')
const globalConstants = require('./../const/globalConstants')


let urlValidator = [
    validate({
        validator: 'matches',
        arguments: globalConstants.URL_REGEX,
        message: 'Must be a Valid URL',
})]

const UserSchema = new Schema({
    name: { type: String, required: true, unique:true },
    avatar: { type: String, validate: urlValidator },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = model('User', UserSchema)