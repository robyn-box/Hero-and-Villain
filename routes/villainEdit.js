const express = require('express')
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const getVillainById = require('../middleware/getVillainById')
const Superhero = require('../models/Superhero')



router.get('/:id', getVillainById, async function (req, res, next) {
    let supervillain = res.supervillain
    res.render('villainedit', {supervillain})
})

router.post('/:id', getVillainById, async function (req, res, next) {
    let supervillain = res.supervillain
    let id = req.params.id
    console.log("supervillain",supervillain, "id",id)
    supervillain = await Supervillain.findByIdAndUpdate(id, req.body) 
    console.log(supervillain)
    const supervillains = await Supervillain.find({})
    const superheroes = await Superhero.find({})
    res.redirect('/')

})


module.exports = router