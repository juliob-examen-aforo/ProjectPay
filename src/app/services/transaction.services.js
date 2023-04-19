const transactionRepository = require('../repositories/transaction.repository')
const messagesAsync = require('../middlewares/messagesasync')

const transactionService = {
    addTransaction: async (amount, invoiceId) => {
        const message = await transactionRepository.addTransaction(amount, invoiceId)
        messagesAsync.send(message.id, invoiceId, amount, 'pay')
        console.log(message)
        return message
    }
}

module.exports = transactionService