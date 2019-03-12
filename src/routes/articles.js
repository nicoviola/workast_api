const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
let articleSchemes = require('../middlewares/schemes/article')
let validate = require('../middlewares/validate')

/**
 * @api {get} /articles/  gets all articles
 * @apiName GetArticles
 * @apiGroup Article
 * 

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'success': 'true',
 *       'message': ''
 *       'data': {
 *              articles: [
 *                  {
 *                  '_id': '346f8191f117'
 *                  'title':'My article',
 *                  'text':'Here's my new article it doesn't say much',
 *                  'userId':'366f8291f472'
 *                  'tags': ['some', 'amazing', 'tags']
 *                  }
 *              ]
 *       }
 *     }
 *
 */
router.get('/', articleController.list)

/**
 * @api {post} /articles/  Create an article
 * @apiName CreateArticle
 * @apiGroup Article
 * 
 * @apiParam {String} title Article title 
 * @apiParam {String} text Article text 
 * @apiParam {String} userID Article userID 
 * @apiParam {Array} [tags] Article tags
 * 
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       'title':'My article',
 *       'text':'Here's my new article it doesn't say much',
 *       'userId':'366f8291f472'
 *       'tags': ['some', 'amazing', 'tags']
 *     }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'success': 'true',
 *       'message': 'Article successfully created'
 *       'data': {
 *              '_id': '346f8191f117'
 *              'title':'My article',
 *              'text':'Here's my new article it doesn't say much',
 *              'userId':'366f8291f472'
 *              'tags': ['some', 'amazing', 'tags']
 *       }
 *     }
 * @apiUse UserNotFound
 * @apiUse MissingParameters
 * @apiUse ValidationError
 */

router.post('/', validate(articleSchemes.createArticle), articleController.createArticle)

/**
 * @api {put} /articles/:id  Edit an article
 * @apiName EditArticle
 * @apiGroup Article
 * 
 * @apiParam {String} title Article title 
 * @apiParam {String} text Article text 
 * @apiParam {String} userID Article userID 
 * @apiParam {Array} [tags] Article tags
 * 
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       'title':'My article',
 *       'text':'Here's my new article it doesn't say much',
 *       'userId':'366f8291f472'
 *       'tags': ['some', 'amazing', 'tags']
 *     }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'success': 'true',
 *       'message': 'Article successfully updated'
 *       'data': {
 *              '_id': '346f8191f117'
 *              'title':'My article',
 *              'text':'Here's my new article it doesn't say much',
 *              'userId':'366f8291f472'
 *              'tags': ['some', 'amazing', 'tags']
 *       }
 *     }
 *
 * @apiUse UserNotFound
 * @apiUse ArticleNotFound
 * @apiUse MissingParameters
 * @apiUse ValidationError
 */

router.post('/:id([0-9a-fA-F]{24})', validate(articleSchemes.updateArticle), articleController.updateArticle)
/*
* @api {delete} /articles/:id  Delete an article
* @apiName DeleteArticle
* @apiGroup Article
* 
* 
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       'success': 'true',
*       'message': 'Article successfully deleted'
*       'data': {}
*     }
*
* @apiUse ArticleNotFound
* @apiUse MissingParameters
* @apiUse ValidationError
*/
router.delete('/:id([0-9a-fA-F]{24})',  articleController.deleteArticle)


/**
 * @api {get} /articles/search  search articles that matches given tags
 * @apiName SearchArticles
 * @apiGroup Article
 * 
 * @apiParam {Array} [tags] Article tags
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'success': 'true',
 *       'message': ''
 *       'data': {
 *              articles: [
 *                  {
 *                  '_id': '346f8191f117'
 *                  'title':'My article',
 *                  'text':'Here's my new article it doesn't say much,
 *                  'userId':'366f8291f472'
 *                  'tags': ['some', 'amazing', 'tags']
 *                  }
 *              ]
 *       }
 *     }
 *
 * @apiUse MissingParameters
 * @apiUse ValidationError
 */
router.get('/search',  articleController.search)

module.exports = router