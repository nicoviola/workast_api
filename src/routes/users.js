const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
let userSchemes = require('../middlewares/schemes/user')
let validate = require('../middlewares/validate')

/**
 * @api {get} /users/  gets all users
 * @apiName GetUsers
 * @apiGroup User
 * 

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'success': 'true',
 *       'message': ''
 *       'data': {
 *              users: [
 *                  {
 *                  '_id': '346f8191f117'
 *                  'name':'nico',
 *                  'avatar':'www.funavatars.com/me',
 *                  }
 *              ]
 *       }
 *     }
 *
 */
router.get('/', userController.list)

/**
 * @api {post} /users/  Creates an user
 * @apiName CreateUser
 * @apiGroup User
 * 
 * @apiParam {String} name User name
 * @apiParam {String} avatar User url for avatar 
 * 
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       'name':'NIco',
 *       'avatar':'www.funavatars.com/me',
 *     }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'success': 'true',
 *       'message': 'Article successfully created'
 *       'data': {
 *              '_id': '346f8191f117'
 *              'name':'NIco',
 *              'avatar':'www.funavatars.com/me',
 *       }
 *     }
 * 
 * @apiUse MissingParameters
 * @apiUse ValidationError
 */

router.post('/', validate(userSchemes.createUser), userController.createUser)

module.exports = router