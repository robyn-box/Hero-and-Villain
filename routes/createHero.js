const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero')

router.get('/', function (req, res) {
    res.render('createHero')
})


router.post('/', async function (req, res, next) {
    console.log(req.body)
    const { name, imageUrl, background} = req.body
    const aHero = new Superhero({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        background: req.body.background,
        superheroPower: []
    })
    
    aHero.save((err) => {
        if (err) {
            console.log(err)
            res.render('index', {message: err})
        } else {
            console.log("Hero Created")
            res.redirect("/")
        }
    })
})


module.exports = router;