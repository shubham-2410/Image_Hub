
const mongoose = require('mongoose')

// User Model
const userModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    images:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gallery"
        }],
})

module.exports = mongoose.model("User", userModel);