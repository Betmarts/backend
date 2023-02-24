const mongoose = require("mongoose");
const schema = mongoose.Schema
const withdawSchame = new schema({
    email: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    walletaddress: {
        type: String,
        required: true,
    },
    withdawamount: {
        type: String,
        required: true
    }
}, { timestamp : true})

const withdaw = mongoose.model('withdraw', withdawSchame)
module.exports = withdaw