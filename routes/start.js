var express = require('express');
const Superhero = require('../models/Superhero');
const Supervillain = require('../models/Supervillain')
var router = express.Router();
const verifyUser = require('../middleware/verifyUser')

router.get('/', verifyUser, async function (req, res, next) {
    let loggedIn = req.loggedIn 
        if (loggedIn === true) {
            res.redirect('index')
        
    } else {
        res.redirect("/")
    }
  })


  module.exports = router;