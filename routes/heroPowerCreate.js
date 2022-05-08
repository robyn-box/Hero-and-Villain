const express = require('express')
const router = express.Router()
const Superhero = require('../models/Superhero')
const Heropower = require('../models/Heropower')
const verifyUser = require('../middleware/verifyUser')

router.get('/', verifyUser, async function (req, res, next) {
    let loggedIn = req.loggedIn 
    if(loggedIn === true) {
        res.render('heropowercreate')

    } else {
        res.redirect("/")
    }
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
            res.redirect("/index")
        }
    })
})




module.exports = router;