const mongoose = require('mongoose')
const validator = require('validatorjs')


const userSchema = new mongoose.Schema({
    username: {
        
        type: String,
       minlength: [ 5, "Username must be at least 5 characters"],
       match: [/^[\w+\d+/]+/, "Must be alphanumeric"]
        
    },
    password: {
        type: String,
        required: true,
        minlength: [10, "Minimum length of your password must be at least 10 letters or numbers"]
    },
})

module.exports = mongoose.model("User", userSchema)