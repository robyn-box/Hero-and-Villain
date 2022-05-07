const mongoose = require('mongoose')
const validator = require('validatorjs')
const Heropower = require('./Heropower')
const User = require('./User')

const superheroSchema = new mongoose.Schema({
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
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },    
    weight: {
        type: Number,
    },
    gender: {
        type: String,
    },
    affiliation: {
        type: String,
    },
    heropowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Heropower'}],
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model("Superhero", superheroSchema)