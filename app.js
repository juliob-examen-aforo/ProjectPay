require('dotenv').config()
const express = require('express')
const app = express()
const appPromise = require('./src/app/middlewares/configprovider').appPromise

appPromise.then(function(app) {
    const PORT = process.env.SERVER_PORT_PAY || 3004
    app.use('/api', require('./src/app/routes'))
    app.listen(PORT, () => {
        console.log('Application running on port ', PORT)
    })
});

