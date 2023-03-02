const mongoose = require("mongoose");
const schema = mongoose.Schema

const depositSchema = new schema({
    user_id: {
        type: String,
        required: true,
    },
    coin_name: {
        type: String,
        required: true,
    },
    coin_amount: {
        type: String,
        required: true,
    },
    usd_amount: {
        type: String,
        required: true
    },
    wallet_address: {
        type: String,
        required: true,
    },
    gas_fee: {
        type: String,
        required: true,
    },
    network_address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
   status: {
        type: String,
        required: true
    },
    date_time: {
        type: String,
        required: true
    }
}, { timestamp : true})

const deposit = mongoose.model('deposit', depositSchema)
module.exports = deposit