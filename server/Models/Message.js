const mongoose = require('mongoose');

var Schema = mongoose.Schema

var message = new Schema({
    content: {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

mongoose.models = {}

var Message = mongoose.model('Message', message)

module.export = Message