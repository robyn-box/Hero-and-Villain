const express = require('express');
const getHeroById = require('../middleware/getHeroById');
const router = express.Router()
const Superhero = require('../models/Superhero')
const verifyUser = require('../middleware/verifyUser')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const verifyToken = require('../middleware/verifyToken')


router.get('/:id', verifyUser, getHeroById, async function(req, res, next) {
    let superhero = res.superhero
    let id = res.id
    let matchedUser = false
    let loggedIn = req.loggedIn
    let verifyToken = req.cookies.verifyToken

    if(verifyToken) {
        userId = jwt.verify(verifyToken, secret, {complete: true}) 
    }

    let creatorId = superhero.creatorId
    // console.log(creatorId)
    if (loggedIn === true && userId.payload.id == creatorId) {
        matchedUser = true;
        return res.render('herodetails', {superhero, loggedIn, matchedUser})
    }
    if (loggedIn === true) {
        return res.render('herodetails', {superhero, loggedIn})
    } else {
        return res.render('herodetails', {superhero})
    }
})



module.exports = router;