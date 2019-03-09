const mongoose = require('mongoose')
const config = require('./config/index')

const databaseUrl = `${config.host}:${config.port}/${config.database}`
console.log(`Connecting to ${databaseUrl}`)
mongoose.connect(databaseUrl,{ useNewUrlParser: true })
    .then(db => console.log('db connected'))
    .catch(err => console.log(err))