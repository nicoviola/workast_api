let createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')
const config = require('./config/index')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const articlesRouter = require('./routes/articles')
const cors = require('cors')
let errorHandler = require('./middlewares/error')

require('./database')

const app = express()
app.set('port', config.api_listening_port)
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(morgan('dev'))
/**
 * CORS configuration
 */
let whitelist = config.allowedOrigins
let apiKey = config.apiKey

let corsOptions = {
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range', 'X-Api-Key'],
    credentials: true,
    optionsSuccessStatus: 200
}


let corsOptionsDelegate = function (req, callback) {
    let originIsWhitelisted = req.header('Origin') && whitelist.indexOf(req.header('Origin')) !== -1
    let originIsAuthorized = req.header('x-api-key') && req.header('x-api-key') === apiKey
    corsOptions.origin = originIsWhitelisted || originIsAuthorized
    callback(originIsWhitelisted || originIsAuthorized ? null :  new Error('Not allowed by CORS'))
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptionsDelegate))

app.use('/', indexRouter)
app.use('/users',usersRouter)
app.use('/articles', articlesRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(errorHandler)

app.listen(app.get('port'), ()=>{
    console.log('listening on port ',app.get('port') )
})

module.exports = app