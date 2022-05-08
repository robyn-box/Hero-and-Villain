var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const saltRounds = +process.env.saltRounds
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const { response } = require('../app');
const { token } = require('morgan');
const verifyToken = require('../middleware/verifyToken')


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register')
  // res.send('respond with a resource');
});

router.post('/register', async function (req, res, next) {
  const {username, password, repeatPassword} = req.body

  if(username === "" || password === "") {
    return res.status(400).json({message: "Please Complete Form!"})
  } 
  const tempUser = await User.findOne({username: username})
  if (tempUser) {
    return res.status(400).json({message: "Please Pick Another Username!"})
  }
  if (password != repeatPassword) {
    return res.status(400).json({message: "Passwords Do Not Match!"})
  
  } else {
    // Create a new user
    // Hash password with bcrypt
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    let match = /^\w*\d*$/.test(password)
    if (match) {
      // Create a new user with model if password is alphanumeric

      const newUser = new User({
        username: username,
        password: hash
      })

      await newUser.save(function(err) {
        if (err) {
          console.log(err)
          res.redirect("/")
        } else {
          console.log("User Saved!")
          res.redirect("login")
        }
      })
    } else {
      message = "Password Must be alphanumeric"
      console.log("Password Invalid")
      return res.render("index", {message})
    }
  }
})

router.get('/login', async function(req, res, next) {
  res.render('login')
})

router.post("/login", verifyToken, async function(req, res, next) {
  let verifyToken = req.loggedIn
  console.log(token)
  res.redirect("/index")
})
    
router.get('/logout', function(req, res) {
  res.clearCookie("verifyToken")
  res.redirect("/")
})
    
  

      
module.exports = router
