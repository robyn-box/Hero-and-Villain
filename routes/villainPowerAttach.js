const express = require('express')
const Villainpower = require('../models/Villainpower')
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const getVillainById = require('../middleware/getVillainById')


router.get("/:id", getVillainById, async function (req, res, next) {
    let supervillain = res.supervillain
    supervillain = await Supervillain.findById(supervillain)
    let villainpowers = []
    villainpowers = await Villainpower.find({})
    console.log(supervillain, villainpowers)
    
    res.render('villainpowerattach', {supervillain: supervillain, villainpowers: villainpowers})
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
    res.redirect("/")
})




module.exports = router