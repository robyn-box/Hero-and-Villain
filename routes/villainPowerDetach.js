const express = require('express');
const Villainpower = require('../models/Villainpower');
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const getVillainById = require('../middleware/getVillainById')
const verifyUser = require('../middleware/verifyUser')


router.get("/:id", verifyUser, getVillainById, async function(req, res, next) {
    let loggedIn = req.loggedIn;
    if (loggedIn === true){
        let supervillain = res.supervillain
        
        let villainpowers = await Villainpower.find({})
        // console.log(supervillain, villainpowers)
        res.render('villainpowerdetach', { supervillain, villainpowers, loggedIn})

    }  else {
        res.redirect("/")
    }  
})

router.post("/:id", getVillainById, async function (req, res, next) {
    const id = req.params.id
    console.log("id",id)
    const aVillainpower = req.body.villainpower
    console.log("aVillainpower",aVillainpower)
    const villainpower = await Villainpower.findById(aVillainpower)
    console.log("villainpower",villainpower)
    supervillain = await Supervillain.findById(id)
    console.log(supervillain)
    // console.log("????",villainpower.id)
    // console.log("!!!!", supervillain.villainpowers)
    
    supervillain.villainpowers.pull({_id: villainpower.id})
    console.log("updated", supervillain)
    supervillain.save()
    
    // console.log("villain power detached",x)
    res.redirect("/index")
})




module.exports = router;