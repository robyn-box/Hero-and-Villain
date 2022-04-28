const mongoose = require('mongoose')
const User = require('./User')
const Superhero = require('./Superhero')
const validator = require('validatorjs')

const heropowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, "Name of power must be at least 4 characters"],
    },
    validate: {
        validator: function(v) {
            return new Promise(function (resolve, reject) {
                resolve (/^[\w+\d+]+/.test(v))
            })
        },
        message: props => `${props.value} must be only letters or numbers`
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return new Promise(function (resolve, reject) {
                    resolve (/^[\w+\d+]+/.test(v))
                })
            },
            message: props => `${props.value} must be only letters or numbers`
        },
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return new Promise(function (resolve, reject) {
                    resolve (/^[\w+\d+]+/.test(v))
                })
            },
            message: props => `${props.value} must be only letters or numbers`
        },
    },
    heropower: [{type: mongoose.Schema.Types.ObjectId, ref: 'Superhero'}]
})

module.exports = mongoose.model('Heropower', heropowerSchema)