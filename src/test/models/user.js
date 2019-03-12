process.env.ENVIRONMENT = 'test'
const path = require('path')
const userFactory = require(path.join(__dirname, '../factories/user'))
const User = require(path.join(__dirname, '/../../models/User'))
const expect = require('chai').expect
//require(path.join(__dirname, '/../../database'))
let userMock


describe('User model', () => {
    before(async () => {
        await User.deleteMany({})
    })

    beforeEach((done) => {
        userMock = userFactory()
        done()
    })

    it('should create a user', async () => {
        const newUser = new User(userMock)
        await newUser.save()
        let persisted = await User.findById({_id: newUser._id})
        expect(persisted).to.have.property('_id')
    })


    it('shouldn\'t create an user with invalid url', async () => {
        const newUser = new User(userMock)
        try{
            await newUser.save()
        }catch (err) {
            expect(err).to.have.property('message')
            expect(err).to.have.property('name').eql('ValidationError')
        }

    })

    after(async () => {
        await User.deleteMany({})
    })

})