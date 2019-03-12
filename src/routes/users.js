const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
let userSchemes = require('../middlewares/schemes/user')
let validate = require('../middlewares/validate')

/**
 * GET  all users
 */
router.get('/', userController.list)

/**
 * POST user
 * Create a user
 */
router.post('/', validate(userSchemes.createUser), userController.createUser)

module.exports = router