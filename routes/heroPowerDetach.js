const express = require('express');
const Heropower = require('../models/Heropower');
const router = express.Router()
const Superhero = require('../models/Superhero')
const getHeroById = require('../middleware/getHeroById')


router.get("/:id", getHeroById, async function(req, res, next) {

    let superhero = res.superhero
    superhero = await Superhero.findById(superhero)
    let heropowers = [];
    heropowers = await Heropower.find({})
    // console.log(superhero, heropowers)

    
    res.render('heropowerdetach', { superhero: superhero, heropowers: heropowers})
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
    console.log("help",heropower.id)
    console.log("what is going on", superhero.heropowers)
    
    
    Superhero.findByIdAndUpdate(id, {$pull: {superhero: heropower.id}}).exec()
  
    
    console.log("hero power detached",heropower._id)
    res.redirect("/")
})



module.exports = router;