process.env.ENVIRONMENT = 'test'
const path = require('path')
const articleFactory = require(path.join(__dirname, '../factories/article'))
const userFactory = require(path.join(__dirname, '../factories/user'))
const Article = require(path.join(__dirname, '/../../models/Article'))
const User = require(path.join(__dirname, '/../../models/User'))
const expect = require('chai').expect
//require(path.join(__dirname, '/../../database'))
let articleMock


describe('Article model', () => {
    before(async () => {
        await Article.deleteMany({})
        await User.deleteMany({})
    })

    beforeEach((done) => {
        articleMock = articleFactory()
        done()
    })

    it('shouldn\'t create an article without userId', async () => {
        const newArticle = new Article(articleMock)
        try{
            await newArticle.save()
        }catch (err) {
            expect(err).to.have.property('message')
            expect(err).to.have.property('name').eql('ValidationError')
        }
    })

    it('should create an article associated with a previously created user', async () => {
        const newUser = new User(userFactory())
        await newUser.save()
        const newArticle = new Article(Object.assign(articleMock, {userId: newUser._id}))
        await newArticle.save()
        let persisted = await Article.findById({_id: newArticle._id})
        expect(persisted).to.have.property('_id')
        expect(persisted).to.have.property('userId').eql(newUser._id)
    })

    after(async () => {
        await Article.deleteMany({})
        await User.deleteMany({})
    })

})