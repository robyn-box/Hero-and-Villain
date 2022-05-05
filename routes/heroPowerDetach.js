const express = require('express');
const Heropower = require('../models/Heropower');
const router = express.Router()
const Superhero = require('../models/Superhero')
const getHeroById = require('../middleware/getHeroById')
const verifyUser = require('../middleware/verifyUser')


router.get("/:id", verifyUser, getHeroById, async function(req, res, next) {
    let loggedIn = req.loggedIn;
    if (loggedIn === true){
        let superhero = res.superhero
        
        heropowers = await Heropower.find({})
        // console.log(superhero, heropowers)
        res.render('heropowerdetach', { superhero, heropowers, loggedIn})

    }  else {
        res.redirect("/")
    }  
})

router.post("/:id", getHeroById, async function (req, res, next) {
    const id = req.params.id
    console.log("id",id)
    const aHeropower = req.body.heropower
    console.log("aHeropower",aHeropower)
    const heropower = await Heropower.findById(aHeropower)
    console.log("heropower",heropower)
    superhero = await Superhero.findById(id)
    console.log(superhero)
    // console.log("????",heropower.id)
    // console.log("!!!!", superhero.heropowers)
    
    
    // Superhero.findByIdAndUpdate(id, {$pull: {superhero: {heropowers: heropower.id}}}).exec()
    superhero.heropowers.pull({_id: heropower.id})
    console.log("updated", superhero)
    superhero.save()
    
    // console.log("hero power detached",x)
    res.redirect("/")
})




module.exports = router;