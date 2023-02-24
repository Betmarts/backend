const mongoose = require("mongoose");
const schema = mongoose.Schema

const Bookingschema = new schema({
    bet_slip: [],
    potential_win: {
        type: String,
        required: true
    },
    total_odds: {
        type: String,
        required: true
    },
    booking_code: {
        type: String,
        required: true
    }
}, { timestamp : true})

module.exports = mongoose.model('Booking', Bookingschema)