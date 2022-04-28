const mongoose = require('mongoose')
const validator = require('validatorjs')
const User = require('./Superhero')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, "Username must be at least 5 characters"],
        validate: {
            validator: function (v) {
                return new Promise(function (resolve, reject) {
                    resolve (/^[\w*\d*]+/.test(v))
                })
            },
            message: props => `${props.value} can only be letters and numbers`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [10, "Minimum length of your password must be at least 10 letters or numbers"]
    },
})