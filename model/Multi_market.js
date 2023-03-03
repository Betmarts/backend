const mongoose = require("mongoose");
const schema = mongoose.Schema

const MultiSchema = new schema({
    game_id: {
        type: String,
        required: true
    },
    game_type: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamp : true})

const Multi = mongoose.model('Multi', MultiSchema)
module.exports = Multi