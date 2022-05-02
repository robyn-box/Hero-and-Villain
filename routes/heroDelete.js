const express = require('express')
const router = express.Router()
const Superhero = require("../models/Superhero")
const Supervillain = require("../models/Supervillain")
const getHeroById = require('../middleware/getHeroById')


router.get('/:id', getHeroById, async function(req, res, next) {
    let id = req.params.id
    const superhero = await Superhero.findById(id)
    // console.log(superhero)

    res.render('herodelete', {superhero: superhero})
})

router.post('/:id', getHeroById, async function(req, res, next) {
    let id = req.params.id
    let superhero;

    superhero = await Superhero.findByIdAndDelete(id)
    res.redirect('/')    
})





module.exports = router;