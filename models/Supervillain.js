const mongoose = require('mongoose')
const validator = require('validatorjs')
const Villainpower = require('./Villainpower')
const User = require('./User')

const supervillainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Must be at least 2 characters"],
        match: [/^[\w+\d+/]+/, "Must be alphanumeric"]
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.*/g, "Must be a valid web address"]
    },
    background: {
        type: String,
        required: false,
        minlength: [10, "Must be a minimum of 30 characters"],
        match: [/^[\w+\d+/]+/, "Must be alphanumeric"]
    },
    villainpowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Villainpower'}],
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model("Supervillain", supervillainSchema)