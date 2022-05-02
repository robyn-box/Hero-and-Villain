const mongoose = require('mongoose')
const User = require('./User')
const Superhero = require('./Superhero')
const validator = require('validatorjs')

const heropowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, "Name must be at least 4 characters"],
        match: [/^[\w+\d+/]+/, "Must be alphanumeric"]
    },
    description: {
        type: String,
        required: true,
        minlength: [30, "Description must be at least 30 characters"],
        match: [/^[\w+\d+/]+/, "Must be alphanumeric"]
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.*/g, "Must be a valid web address"]
    },
    heropowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Superhero'}]
})


module.exports = mongoose.model('Heropower', heropowerSchema)