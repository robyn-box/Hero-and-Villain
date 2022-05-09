var express = require('express');
const Superhero = require('../models/Superhero');
const Supervillain = require('../models/Supervillain')
var router = express.Router();
const verifyUser = require('../middleware/verifyUser')


/* GET START page. */
router.get('/', verifyUser, async function (req, res, next) {
  res.render('start')
})