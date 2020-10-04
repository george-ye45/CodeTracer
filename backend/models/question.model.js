const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    testCases: {
        type: [],
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('coding_questions', questionSchema)
