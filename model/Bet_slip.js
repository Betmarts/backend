const mongoose = require("mongoose");
const schema = mongoose.Schema

const BetSlipschema = new schema({
    bet_data: [],
    potential_win: {
        type: String,
        required: true
    },
    total_odds: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamp : true})

module.exports = mongoose.model('BetSlip', BetSlipschema)