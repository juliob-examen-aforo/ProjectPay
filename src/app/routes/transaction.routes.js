const express = require('express')
const router = express.Router()

const { addTransaction } = require('../controllers/transaction.controller')

router.post('/pay', addTransaction)

module.exports = router