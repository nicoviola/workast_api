let User = require('../models/User')
const errors = require('../const/errors')

module.exports = {
    createUser: async (req, res, next) => {
        const newUser = new User(req.body)
        try{
            let user = await User.findOne({
               name: newUser.name
            })
            if(!!user) return next(errors.UserAlreadyExists)
            await newUser.save()
            res.json({
                success: true,
                message: 'User successfully created',
                data: newUser
            })
        }catch (e) {
            return next(e)
        }
    },

    list: async (req, res, next) => {
        try{
            let users = await User.find()
            res.json({
                success: true,
                message:'',
                data: {
                    users: users
                }
            })
        }catch (e) {
            next(e)
        }
    }

}