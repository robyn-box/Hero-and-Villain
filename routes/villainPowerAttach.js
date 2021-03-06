const express = require('express')
const Villainpower = require('../models/Villainpower')
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const verifyUser = require('../middleware/verifyUser')
const getVillainById = require('../middleware/getVillainById')


router.get("/:id", verifyUser, getVillainById, async function (req, res, next) {
    let loggedIn = req.loggedIn
    if (loggedIn === true) {
        let supervillain = res.supervillain
        // supervillain = await Supervillain.findById(supervillain)
        let villainpowers =  await Villainpower.find({})
        // console.log(supervillain, villainpowers)
        res.render('villainpowerattach', {supervillain, villainpowers, loggedIn})
    } else {
        res.redirect("/")
    }
})

router.post("/:id", getVillainById, async function (req, res, next) {
    const id = req.params.id
    // console.log("id", id)
    const aVillainpower = req.body.villainpower
    // console.log("avillainpower", aVillainpower)
    const villainpower = await Villainpower.findById(aVillainpower)
    // console.log('villainpower', villainpower)
    supervillain = await Supervillain.findById(id)
    
    Supervillain.findByIdAndUpdate(id, {$push: {villainpowers: villainpower}}).exec()
    console.log("villain power attached", supervillain)
    res.redirect("/index")
})




module.exports = router