const mongoose = require("mongoose");
const schema = mongoose.Schema

const depositSchema = new schema({
    ID: {
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
    depositamount: {
        type: String,
        required: true
    },
   status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamp : true})

const deposit = mongoose.model('deposit', depositSchema)
module.exports = deposit