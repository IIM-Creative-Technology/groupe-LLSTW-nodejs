const mongoose = require('mongoose');

var users = new mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    /*
    createdAt: {
        type: Date,
        default: Date.now
    }
    */
})

mongoose.models = {}

module.exports = mongoose.model('Users', users)