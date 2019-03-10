const faker = require('faker')

function defaultProps() {
    return {
        title: faker.company.catchPhrase(),
        text: faker.lorem.paragraphs(),
        tags: [faker.hacker.verb(), faker.hacker.ingverb(), faker.hacker.verb()]
    }
}

function getFakeArticle(props = {}){
    return Object.assign({}, defaultProps(), props)
}

module.exports = (props = {}) => {
    return getFakeArticle(props)
}