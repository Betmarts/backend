const mongoose = require("mongoose");
const schema = mongoose.Schema

const crashSchame = new schema({
        message: {
            type: String,
            required: true,
        },
        startTime: {
            type: Number,
            required: true,
        },
        crashPoint: {
            type: Number,
            required: true,
        },
        crashcount: {
            type: Number,
            required: true,
        }
}, { timestamp : true})

const crash = mongoose.model('crash', crashSchame)
module.exports =crash