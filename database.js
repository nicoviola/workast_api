const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:27017/workast',() => {
        useNewUrlParser: true
    }).then(db => console.log('db connected'))
      .catch(err => console.log(err))