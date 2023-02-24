const mongoose = require("mongoose");
const schema = mongoose.Schema

const UserProfileSchama = new schema({
    firstname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    DOB: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    acc_name: {
        type: String,
        required: true,
    },
    acc_num: {
        type: String,
        required: true,
    },
    mainBal: {
        type: String,
        required: true,
    },
    exposure: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamp : true})

const UserProfile = mongoose.model('UserProfile', UserProfileSchama)
module.exports = UserProfile