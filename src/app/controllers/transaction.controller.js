const transactionService = require('../services/transaction.services')

const addTransaction = async (req, res) => {
    const { amount, invoiceId } = req.body
    return res.status(200).send(await transactionService.addTransaction(amount, invoiceId))
}

module.exports = { addTransaction }