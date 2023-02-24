const mongoose = require("mongoose");
const schema = mongoose.Schema

const OtpSchema = new schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamp : true})

const Otp = mongoose.model('Otp', OtpSchema)
module.exports = Otp