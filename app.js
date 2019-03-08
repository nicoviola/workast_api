const express = require('express')
const morgan = require('morgan')
const indexRouter = require('./routes/index')
require('./database')

const app = express()
app.set('port', 3000)

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(morgan('dev'))

app.use('/', indexRouter)


app.listen(app.get('port'), ()=>{
    console.log('listening on port ',app.get('port') )
})