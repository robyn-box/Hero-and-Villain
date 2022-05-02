const express = require('express')
const router = express.Router()
const Superhero = require('../models/Superhero')
const Heropower = require('../models/Heropower')

router.get('/', function (req, res) {
    res.render('heropowercreate')
})

router.post('/', function (req, res) {
    console.log(req.body)
    const {name, description, imageUrl } = req.body

    const aHeropower = new Heropower({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        heropowers: []
    })
    
    aHeropower.save((err) => {
        if (err) {
            console.log('no power saved')
            return res.render("index", {message: err})
        } else {
            console.log("Hero Power Created")
            res.redirect("/")
        }
    })
})




module.exports = router;