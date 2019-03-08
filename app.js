const express = require('express')
const morgan = require('morgan')


const app = express()


app.set('port', 3000)

app.use(morgan())

app.listen(app.get('port'), ()=>{
    console.log('listening on port ',app.get('port') )
})