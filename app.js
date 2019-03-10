const express = require('express')
const morgan = require('morgan')
const config = require('./config/index')
const indexRouter = require('./routes/index')


require('./database')

const app = express()
app.set('port', config.api_listening_port)

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(morgan('dev'))

app.use('/', indexRouter)


app.listen(app.get('port'), ()=>{
    console.log('listening on port ',app.get('port') )
})

module.exports = app