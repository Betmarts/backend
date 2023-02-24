const mongoose = require("mongoose");
const schema = mongoose.Schema

const balanceSchame = new schema({
    centralBal:  {
        type: 'String',
        required: true
    },
    usd: {
        type: 'String',
        required: true
    },
    sol: {
        type: 'String',
        required: true
    },
    nexo: {
        type: 'String',
        required: true
    },
    bnb: {
        type: 'String',
        required: true
    },
    usdc: {
        type: 'String',
        required: true
        
    },
    matic: {
        type: 'String',
        required: true
    },
    btc: {
        type: 'String',
        required: true
    },
    eth: {
        type: 'String',
        required: true
    },
    usdt: {
        type: 'String',
        required: true
    },
    busd: {
        type: 'String',
        required: true
    }
}, { timestamp : true})

const balance = mongoose.model('balance', balanceSchame)
module.exports = balance