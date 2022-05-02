const express = require('express')
const router = express.Router()
const Superhero = require("../models/Superhero")
const Supervillain = require("../models/Supervillain")
const getVillainById = require('../middleware/getVillainById')


router.get('/:id', getVillainById, async function(req, res, next) {
    let id = req.params.id
    const supervillain = await Supervillain.findById(id)
    console.log(supervillain)

    res.render('villaindelete', {supervillain: supervillain})
})

router.post('/:id', getVillainById, async function(req, res, next) {
    let id = req.params.id
    let supervillain;

    supervillain = await Supervillain.findByIdAndDelete(id)
    res.redirect('/')    
})





module.exports = router;