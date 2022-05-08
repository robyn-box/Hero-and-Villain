const express = require('express');
const Heropower = require('../models/Heropower');
const router = express.Router()
const Superhero = require('../models/Superhero')
const getHeroById = require('../middleware/getHeroById')
const verifyUser = require('../middleware/verifyUser')


router.get("/:id", verifyUser, getHeroById, async function(req, res, next) {
    let loggedIn = req.loggedIn;
    if (loggedIn === true) {
        let superhero = res.superhero
        // superhero = await Superhero.findById(superhero)
        let heropowers = await Heropower.find({})
        // // console.log(superhero, heropowers)
        // console.log("heropowers", heropowers)
        res.render('heropowerattach', { superhero, heropowers, loggedIn})
    } else {
        res.redirect("/index")
    }

})

router.post("/:id", getHeroById, async function (req, res, next) {
    const id = req.params.id
    console.log("id",id)
    const aHeropower = req.body.heropower
    // console.log("aHeropower",aHeropower)
    const heropower = await Heropower.findById(aHeropower)
    // console.log("heropower",heropower)
    superhero = await Superhero.findById(id)
    
    Superhero.findByIdAndUpdate(id, {$push: {heropowers: heropower}}).exec()
    console.log("hero power attached",superhero)
    res.redirect("/index")
})






module.exports = router;