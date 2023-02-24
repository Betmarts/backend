const mongoose = require("mongoose");
const schema = mongoose.Schema

const HistorySchema = new schema({
    ID: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    wallectID: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamp : true})

const history = mongoose.model('History', HistorySchema)
module.exports = history