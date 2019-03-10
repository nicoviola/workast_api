process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http')
const Article = require(path.join(__dirname, '/../../models/Article'))
const User = require(path.join(__dirname, '/../../models/User'))
const server = require(path.join(__dirname, '/../../app'))
const errors = require(path.join(__dirname, '/../../const/errors'))
let should = chai.should()
const config = require(path.join(__dirname, '/../../config/index'))
const articleFactory = require(path.join(__dirname, '/../factories/article'))
const userFactory = require(path.join(__dirname, '/../factories/user'))
let articleMock
let userMock
let unsavedUserId
chai.use(chaiHttp)

describe('Integration - Article ', () => {

    before(async () => {
        await Article.deleteMany({})
        userMock = new User(userFactory())
        // Create the user who wrote the article
        await userMock.save()
        unsavedUserId = new User(userFactory())._id

    })

    describe('POST article/ ', () => {
        it('Should create a Article', (done) => {
            articleMock = articleFactory()
            articleMock.userId = userMock._id
            chai.request(server)
                .post('/articles')
                .send(articleMock)
                .set('X-api-key', config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.should.have.property('message').eql('Article successfully created')
                    done()
                })

        })
        it('Shouldṇ\'t create a Article without userId', (done) => {
            let article = articleFactory({name: articleMock.name})
            chai.request(server)
                .post('/articles')
                .send(article)
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
        it('Shouldṇ\'t create a Article associated with an unsaved user', (done) => {
            let article = articleFactory()
            article.userId = unsavedUserId
            chai.request(server)
                .post('/articles')
                .send(article)
                .set('X-api-key', config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.body.should.have.property('success').eql(false)
                    res.body.should.have.property('error').to.be.not.empty
                    res.body.error.should.have.property('code').eql(errors.UserNotFound.code)
                    done()
                })

        })
    })

    after(async () => {
        await Article.deleteMany({})
    })


})