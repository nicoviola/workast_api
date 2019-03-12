process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require(path.join(__dirname, '/../../models/User'))
const server = require(path.join(__dirname, '/../../app'))
const errors = require(path.join(__dirname, '/../../const/errors'))
let should = chai.should()
const config = require(path.join(__dirname, '/../../config/index'))
const userFactory = require(path.join(__dirname, '/../factories/user'))
let invalidUrl = 'fttdp://some.invalid.u r l.?'
let userMock

chai.use(chaiHttp)

describe('Integration - User ', () => {

    before(async () => {
        await User.deleteMany({})
    })

    describe('POST user/ ', () => {
        it('Should create a User', (done) => {
            userMock = userFactory()
            chai.request(server)
                .post('/users')
                .send(userMock)
                .set('X-api-key', config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.should.have.property('message').eql('User successfully created')
                    done()
            })

        })
        it('Shouldṇ\'t create a User with an already existing name', (done) => {
            let user = userFactory({name: userMock.name})
            chai.request(server)
                .post('/users')
                .send(user)
                .set('X-api-key', config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.body.should.have.property('success').eql(false)
                    res.body.should.have.property('error').to.be.not.empty
                    res.body.error.should.have.property('code').eql(errors.UserAlreadyExists.code)
                    done()
                })

        })
        it('Shouldṇ\'t create a User with an invalid avatar Url', (done) => {
            let user = userFactory({avatar: invalidUrl})
            chai.request(server)
                .post('/users')
                .send(user)
                .set('X-api-key', config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.body.should.have.property('success').eql(false)
                    res.body.should.have.property('error').to.be.not.empty
                    res.body.error.should.have.property('code').eql(errors.ValidationError.code)
                    done()
                })

        })
    })

    after(async () => {
        await User.deleteMany({})
    })


})