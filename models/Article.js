const {Schema, model} = require('mongoose')
const articleSchema = new Schema({
    title: { type:String, required: true },
    text:  { type:String, required: true },
    tags:  { type:[String] },
    userId: {type: Schema.ObjectId, ref:'User' ,required: true}
})

module.exports = model('Article', articleSchema)

