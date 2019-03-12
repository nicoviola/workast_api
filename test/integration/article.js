process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
const faker = require('faker')
const chaiHttp = require('chai-http')
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
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
const persistedArticles = []
const tags = [];
describe('Integration - Article ', () => {

    before(async () => {
        await Article.deleteMany({})
        userMock = new User(userFactory())
        const promises = []
        // Create the user who wrote the article
        await userMock.save()
        unsavedUserId = new User(userFactory())._id
        articleMock = new Article(articleFactory())
        articleMock.userId = userMock._id
        promises.push(articleMock.save())
        tags.push(faker.lorem.word(), faker.lorem.word())
        persistedArticles.push(new Article(articleFactory({tags:tags})), new Article(articleFactory({tags: [tags[0]]})),new Article(articleFactory()))
        persistedArticles.forEach((article)=>{
            article.userId = userMock._id
            promises.push(article.save())
        })
        await Promise.all(promises)

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

    describe('POST articles/:id', () => {
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

    describe('DELETE articles/:id', () => {
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

    describe('GET articles/search?tags=[]', () => {
        it('should get the two articles that contains the given tag', (done) => {
            let testTag= tags[0]
            chai.request(server)
                .get(`/articles/search?tags[]=${testTag}`)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.data.should.have.property('articles').not.to.be.empty
                    res.body.data.articles.should.have.property("length").eql(2)
                    res.body.data.articles.forEach((article) => {
                        article.should.have.property('tags').to.be.containingAnyOf([testTag])
                    })
                    done()
                })
        })

        it('should get the one article that contains the given tag', (done) => {
            let testTag = tags[1]
            chai.request(server)
                .get(`/articles/search?tags[]=${testTag}`)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.data.should.have.property('articles').not.to.be.empty
                    res.body.data.articles.should.have.property("length").eql(1)
                    res.body.data.articles.forEach((article) => {
                        article.should.have.property('tags').to.be.containingAnyOf([testTag])
                    })
                    done()
                })
        })
        it('should get the two article that contains the at least one of the given tags', (done) => {
            let testTags = tags
            chai.request(server)
                .get(`/articles/search?tags[]=${testTags[0]}&tags[]=${testTags[1]}`)
                .set("X-api-key", config.apiKey)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    res.should.have.status(200)
                    res.body.should.have.property('success')
                    res.body.data.should.have.property('articles').not.to.be.empty
                    res.body.data.articles.should.have.property("length").eql(2)
                    res.body.data.articles.forEach((article) => {
                        article.should.have.property('tags').to.be.containingAnyOf(testTags)
                    })
                    done()
                })
        })
    })


    after(async () => {
        await Article.deleteMany({})
        await User.deleteMany({})
    })


})