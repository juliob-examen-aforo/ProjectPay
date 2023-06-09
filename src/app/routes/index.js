const epxress = require('express')
const router = epxress.Router()

router.use('/payment', require('./transaction.routes'))

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

module.exports = router