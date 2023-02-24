const mongoose = require("mongoose");
const schema = mongoose.Schema

const Walletschema = new schema({
    Walletname: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamp : true})

module.exports = mongoose.model('Wallet', Walletschema)