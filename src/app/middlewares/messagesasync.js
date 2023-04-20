const { Kafka, Partitioners } = require('kafkajs')

const logProvider = require("./logprovider");
const kafka = new Kafka({
    createPartitioner: Partitioners.LegacyPartitioner,
    clientId: 'transaction-client',
    brokers: [process.env.KAFKA_SERVER],
})

const messagesAsync = {
    send: async (transactionId, invoiceId, amount, type) => {
        const producer = kafka.producer({
            allowAutoTopicCreation: true,
            transactionTimeout: 30000
        })
    
        await producer.connect()
    
        var data = {
            transactionId: transactionId,
            invoiceId: invoiceId,
            type: type,
            creationDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').toString(),
            amount: amount
        }
    
        await producer.send({
            topic: 'transaction-topic',
            messages: [
                { value: JSON.stringify(data) }
            ],
        })
        
        logProvider.info("Message sent to topic transaction-topic from  payment:", data);

        await producer.disconnect()
    }
}

module.exports = messagesAsync;
