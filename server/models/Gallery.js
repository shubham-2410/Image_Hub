
const mongoose = require('mongoose')

// User Model
const galleryModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("Gallery", galleryModel);