const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
let articleSchemes = require('../middlewares/schemes/article')
let validate = require('../middlewares/validate')

/**
 * GET  all articles
 */
router.get('/', articleController.list)

/*** POST article
 * Create an article
 */
router.post('/', validate(articleSchemes.createArticle), articleController.createArticle)

module.exports = router