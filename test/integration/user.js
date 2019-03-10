process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require(path.join(__dirname, '/../../models/User'))
const server = require(path.join(__dirname, '/../../app'))
let should = chai.should()
const config = require(path.join(__dirname, '/../../config/index'))
const userFactory = require(path.join(__dirname, '/../factories/user'))

let userMock

chai.use(chaiHttp)

describe('Integration - User ', () => {

    before(async () => {
        await User.deleteMany()
    })

    describe('POST user/ ', () => {
        it('Should create a User', (done) => {
            userMock = userFactory()
            chai.request(server)
                .post('/user')
                .send(userMock)
                .set('X-api-key', config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.body.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.should.have.property('message').eql('User successfully created')
            })

        })
    })

    after(async () => {
        await User.deleteMany()
    })


})