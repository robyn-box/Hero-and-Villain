const express = require('express')
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const Villainpower = require('../models/Villainpower')
const verifyUser = require('../middleware/verifyUser')


router.get('/', verifyUser, async function (req, res) {
    let loggedIn = req.loggedIn
    if(loggedIn === true) {
        res.render('villainPowerCreate')
    } else {
        res.redirect("/")
    }
})

router.post('/', function (req, res) {
    // console.log(req.body) 
    const { name, description, imageUrl} = req.body

    const aVillainpower = new Villainpower({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        villainpowers: []
    })
    aVillainpower.save((err) => {
        if (err) {
            console.log("no power added")
            return res.render("index", {message: err})
        } else {
            console.log("Villain Power Created")
            return res.redirect("/index")
        }
    })
})







module.exports = router;