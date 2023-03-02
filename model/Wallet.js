const mongoose = require("mongoose");
const schema = mongoose.Schema

const Walletschema = new schema({
    user_id: {
        type: String,
        required: true,
        unique : true
    },
    btc: {
        type: String,
        required: true,
    },
    eth: {
        type: String,
        required: true,
    },
    nexo: {
        type: String,
        required: true,
    },
    sol: {
        type: String,
        required: true,
    },
    usdc: {
        type: String,
        required: true,
    },
    usdt: {
        type: String,
        required: true,
    },
    matic: {
        type: String,
        required: true,
    },
    bnb: {
        type: String,
        required: true,
    },
    busd: {
        type: String,
        required: true,
    },
}, { timestamp : true})

module.exports = mongoose.model('Wallet', Walletschema)