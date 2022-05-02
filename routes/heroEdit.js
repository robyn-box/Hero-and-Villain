const express = require('express')
const router = express.Router()
const Superhero = require('../models/Superhero')
const getHeroById = require('../middleware/getHeroById')
const Supervillain = require('../models/Supervillain')



router.get('/:id', getHeroById, async function (req, res, next) {
    let superhero = res.superhero
    res.render('heroedit', {superhero})
})

router.post('/:id', getHeroById, async function (req, res, next) {
    let superhero = res.superhero
    let id = req.params.id
    console.log("superhero",superhero, "id",id)
    superhero = await Superhero.findByIdAndUpdate(id, req.body) 
    console.log(superhero)
    const superheroes = await Superhero.find({})
    const supervillains = await Supervillain.find({})
    res.redirect('/')

})












module.exports = router