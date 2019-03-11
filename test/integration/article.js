process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
const faker = require('faker')
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
        articleMock = new Article(articleFactory())
        articleMock.userId = userMock._id
        await articleMock.save()

    })

    describe('POST article/ ', () => {
        it('Should create an Article', (done) => {
            let article = articleFactory()
            article.userId = userMock._id
            chai.request(server)
                .post('/articles')
                .send(article)
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
                    res.body.error.should.have.property('code').eql(errors.MissingParameters.code)
                    done()
                })

        })
        it('Shouldṇ\'t create a Article with an invalid userId', (done) => {
            let article = articleFactory()
            article.userId = faker.random.uuid()
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

    describe('POST article/:id', () => {
        it('should update an article', (done) => {
            let article = articleFactory()
            chai.request(server)
                .post(`/articles/${articleMock._id}`)
                .send(article)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.should.have.property('message').eql('Article successfully updated')
                    res.body.should.have.property('data').to.be.not.empty
                    res.body.data.should.have.property('title').eql(article.title)
                    done()
                })
        })

        it('Shouldṇ\'t update an article that has not been created yet', (done) => {
            let article = articleFactory()
            chai.request(server)
                .post(`/articles/${unsavedUserId}`)
                .send(article)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('error').to.be.not.empty
                    res.body.error.should.have.property('code').eql(errors.ArticleNotFound.code)
                    done()
                })
        })

        it('Shouldṇ\'t update an article with an invalid user id', (done) => {
            let article = articleFactory()
            article.userId = unsavedUserId
            chai.request(server)
                .post(`/articles/${articleMock._id}`)
                .send(article)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if(err){
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('error').to.be.not.empty
                    res.body.error.should.have.property('code').eql(errors.UserNotFound.code)
                    done()
                })
        })

    })

    describe('DELETE article/:id', () => {
        it('should delete an article', (done) => {
            chai.request(server)
                .delete(`/articles/${articleMock._id}`)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.should.have.property('message').eql('Article successfully deleted')
                    done()
                })
        })

        it('Shouldṇ\'t delete an article that has not been created yet', (done) => {
            chai.request(server)
                .delete(`/articles/${unsavedUserId}`)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('error').to.be.not.empty
                    res.body.error.should.have.property('code').eql(errors.ArticleNotFound.code)
                    done()
                })
        })
    })

    after(async () => {
        await Article.deleteMany({})
        await User.deleteMany({})
    })


})