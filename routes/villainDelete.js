const express = require('express')
const router = express.Router()
const Superhero = require("../models/Superhero")
const Supervillain = require("../models/Supervillain")
const getVillainById = require('../middleware/getVillainById')
const verifyUser = require('../middleware/verifyUser')


router.get('/:id', verifyUser, getVillainById, async function(req, res, next) {
    let loggedIn = req.loggedIn

    if(loggedIn === true) {
        let id = req.params.id
        const supervillain = await Supervillain.findById(id)
        // console.log(supervillain)
        res.render('villaindelete', {supervillain: supervillain})
    } else {
        res.redirect("/")
    }
})

router.post('/:id', getVillainById, async function(req, res, next) {
    let id = req.params.id
    let supervillain;

    supervillain = await Supervillain.findByIdAndDelete(id)
    res.redirect('/index')    
})





module.exports = router;