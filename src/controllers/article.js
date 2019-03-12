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
    },

    updateArticle: async (req, res, next) => {
        const id = req.params.id
        let updatedArticle = req.body
        try {
            let article = await Article.findOne({
                _id: id
            })
            if(!article) {
                return next(errors.ArticleNotFound)
            }
            if(!!updatedArticle.userId && article.userId !== updatedArticle.userId){
                let user = await User.findOne({
                    _id: updatedArticle.userId
                })
                if(!user){
                    return next(errors.UserNotFound)
                }
            }
            Object.assign(article, updatedArticle)
            await article.save()
            res.json({
                success: true,
                message: 'Article successfully updated',
                data: article
            })

        }catch (e) {
            next(e)
        }

    },
    deleteArticle: async (req, res, next) => {
        const id = req.params.id
        try{
            let article = await Article.findOne({
                _id: id
            })
            if(!article) {
                return next(errors.ArticleNotFound)
            }
            await article.remove()
            res.json({
                success: true,
                message: 'Article successfully deleted',
                data: {}
            })

        }catch (e) {
            next(e)
        }
    },
    search: async (req, res, next) => {
        const tags = req.query.tags
        let articles = await Article.find({
            tags:{
                $in: tags
            }
        })
        res.json({
            success: true,
            message:'',
            data: {
                articles: articles
            }
        })
    }


}