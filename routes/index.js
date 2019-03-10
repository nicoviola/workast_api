const express = require('express')
const router = express.Router()


/**
 * GET  homepage
 */
router.get('/',(req,res,next)=>{
    res.json({message: 'API home'})
})

module.exports = router