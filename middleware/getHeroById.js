const Superhero = require('../models/Superhero')
const mongoose = require('mongoose')

async function getHeroById(req, res, next) {
    let superhero;
    // console.log(req.params)
    
    try {
        superhero = await Superhero.findById(req.params.id).populate('heropowers')
        // console.log(superhero)
        
        if( superhero == null) {
            return res.status(400).json({message: "Unable to find Superhero"})
        }

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    
    res.superhero = superhero
    next()


}


module.exports = getHeroById