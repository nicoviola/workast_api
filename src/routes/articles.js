const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
let articleSchemes = require('../middlewares/schemes/article')
let validate = require('../middlewares/validate')

/**
 * GET  all articles
 */
router.get('/', articleController.list)

/*** POST articles
 * Create an article
 */
router.post('/', validate(articleSchemes.createArticle), articleController.createArticle)

/*** POST articles/:id
 * Updates an already existing article
 */
router.post('/:id([0-9a-fA-F]{24})', validate(articleSchemes.updateArticle), articleController.updateArticle)

/*** DELETE articles/:id
 * Deletes an already existing article
 */
router.delete('/:id([0-9a-fA-F]{24})',  articleController.deleteArticle)


/*** GET articles/search
 * Search for tags
 */
router.get('/search',  articleController.search)

module.exports = router