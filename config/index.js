require('dotenv').config()

let config = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    apiKey: process.env.API_KEY,
    environment: process.env.ENVIRONMENT,
    api_listening_port: process.env.API_LISTENING_PORT

}

// switch config depending on the enviroment
switch (process.env.ENVIRONMENT) {
    case 'development':
        config = {...config, ...require('./development')}
        break
    case 'test':
        config = {...config, ...require('./test')}
}


module.exports = config