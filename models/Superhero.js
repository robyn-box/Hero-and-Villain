const mongoose = require('mongoose')
const validator = require('validatorjs')

const superheroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [ 5, "Name must be at least 5 characters"],
    },
    imageUrl: {
        type: String,
        required: true,
        validator: function (v) {
            return /^http|https/.test(v)
        },
        message: props => `${props.value} enter a valid URL`
    },
    background: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return new Promise(function(resolve, reject) {
                    resolve (/^[\w+\d+/]+/.test(v))
                })
            },
            message: props => `${props.value} can only be letters and numbers`
        },
    },
    superheroPowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Superhero'}],
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model("Superhero", superheroSchema)