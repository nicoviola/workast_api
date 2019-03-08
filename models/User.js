const { Schema, model} = require('mongoose')
const validate = require('mongoose-validator')

const urlValidator =  validate({
    validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
        message: 'Must be a Valid URL'
})


const UserSchema = new Schema({
    name: { type: String, required: true, unique:true},
    avatar: { type: String, validate: urlValidator},
    createdAt: { type: Date, default: Date.now() }
})

module.exports = model('User', UserSchema)