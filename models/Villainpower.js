const mongoose = require('mongoose')
const User = require('./User')
const Supervillain = require('./Supervillain')
const validator = require('validatorjs')

const villainpowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, "Must be at least 5 characters"],
        match: [/^[\w+\d+/]+/, "Must be alphanumeric"]
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.*/g, "Must be a valid web address"]
    },
    villainpowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Supervillain'}]
})

module.exports = mongoose.model('Villainpower', villainpowerSchema)