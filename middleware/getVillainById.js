const Supervillain = require('../models/Supervillain')
const mongoose = require('mongoose')

async function getVillainById(req, res, next) {
    let supervillain;
    // console.log("1111",req.params)
    
    try {
        supervillain = await Supervillain.findById(req.params.id).populate('villainpowers')
        console.log(supervillain)
        
        if( supervillain == null) {
            return res.status(400).json({message: "Unable to find Supervillain"})
        }

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    
    res.supervillain = supervillain
    next()


}


module.exports = getVillainById