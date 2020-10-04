const mongoose = require('mongoose');

let feedBackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('feedback', feedBackSchema)
