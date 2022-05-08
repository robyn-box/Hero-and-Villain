const express = require('express')
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const getVillainById = require('../middleware/getVillainById')
const Superhero = require('../models/Superhero')
const verifyUser = require('../middleware/verifyUser')



router.get('/:id', verifyUser, getVillainById, async function (req, res, next) {
    let loggedIn = req.loggedIn
    if (loggedIn === true) {
        let supervillain = res.supervillain
        res.render('villainedit', {supervillain})
    } else {
        res.redirect("/")
    }
})

router.post('/:id', getVillainById, async function (req, res, next) {
    let supervillain = res.supervillain
    let id = req.params.id
    console.log("supervillain",supervillain, "id",id)
    supervillain = await Supervillain.findByIdAndUpdate(id, req.body) 
    console.log(supervillain)
    const supervillains = await Supervillain.find({})
    const superheroes = await Superhero.find({})
    res.redirect('/index')

})


module.exports = router