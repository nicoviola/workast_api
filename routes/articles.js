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

/*** POST article/:id
 * Updates an already existing article
 */
router.post('/:id([0-9a-fA-F]{24})', validate(articleSchemes.updateArticle), articleController.updateArticle)

module.exports = router