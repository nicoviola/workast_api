const faker = require('faker')

function defaultProps () {
    return {
        name: faker.internet.email().toLowerCase(),
        avatar: faker.image.avatar()
    }
}

function getFakeUser ( props = {}){
    return Object.assign({}, defaultProps(), props)
}

module.exports = (props = {})=> {
    return getFakeUser(props)
}