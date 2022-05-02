const bcrypt = require('bcrypt')
const User = require('../models/User')
const secret = process.env.SECRET
const jwt = require('jsonwebtoken')


async function verifyToken(req, res, next) {
    let {username, password} = req.body
    let verifyToken
    
    try {
        if(!username || !password) {
            return res.render('login', {message: "Please complete form!"})
        }
        let user;
        user = await User.findOne({username: username})
        if (!user) {
            return res.render("login", {message: "Username Not Found!"})
        } 
        let passwordMatch;
        passwordMatch = await bcrypt.compareSync(password, user.password)
        if(!passwordMatch) {
            return res.render("login", {message: "Password is not a match"})
        }
        verifyToken = jwt.sign({id: user.id}, secret)
        res.cookie("verifyToken", verifyToken)
       
        console.log({verifyToken, user: {id: user.id, username: username}})

    } catch (error) {
        res.status(500).json({error: error.message})
    }

    res.loggedIn = verifyToken
    next()

}


module.exports = verifyToken