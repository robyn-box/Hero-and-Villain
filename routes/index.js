var express = require('express');
const Superhero = require('../models/Superhero');
const Supervillain = require('../models/Supervillain')
var router = express.Router();
const verifyUser = require('../middleware/verifyUser')

/* GET home page. */
router.get('/', verifyUser, async function(req, res, next) {
  const superheroes = await Superhero.find({})
  const supervillains = await Supervillain.find({})
  let loggedIn = req.loggedIn
  if (req.loggedIn === true) {
    console.log("User logged in")
    res.render('index', {superheroes, supervillains, loggedIn})
  } else {
    console.log("User not logged in")
    res.render('index', {superheroes, supervillains})
  }

});

module.exports = router;
