let Article = require('../models/Article')
let User = require('../models/User')
const errors = require('../const/errors')

module.exports = {
    createArticle: async (req, res, next) => {
        const newArticle = new Article(req.body)
        try{
            let user = await User.findOne({
                _id: newArticle.userId
            })
            if(!user) {
                return next(errors.UserNotFound)
            }
            await newArticle.save()
            res.json({
                success: true,
                message: 'Article successfully created',
                data: newArticle
            })
        }catch (e) {
            return next(e)
        }
    },

    list: async (req, res, next) => {
        try{
            let articles = await Article.find().populate('userId')
            res.json({
                success: true,
                message:'',
                data: {
                    articles: articles
                }
            })
        }catch (e) {
            next(e)
        }
    }

}