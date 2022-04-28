var express = require('express');
const Superhero = require('../models/Superhero');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const superheroes = await Superhero.find({})
  res.render('index', {superheroes})
});

module.exports = router;
