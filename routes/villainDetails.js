const express = require('express');
const getVillainById = require('../middleware/getVillainById');
const router = express.Router()
const Supervillain = require('../models/Supervillain')
const verifyUser = require('../middleware/verifyUser')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const verifyToken = require('../middleware/verifyToken')

router.get("/:id", verifyUser, getVillainById, async function (req, res, next) {
    let supervillain = res.supervillain
    let id = res.id
    let matchedUser = false
    let loggedIn = req.loggedIn
    let verifyToken = req.cookies.verifyToken

    if(verifyToken) {
        userId = jwt.verify(verifyToken, secret, {complete: true})
    }
    let creatorId = supervillain.creatorId
    // console.log(supervillain)
    if (loggedIn === true && userId.payload.id == creatorId) {
        matchedUser = true
        return res.render('villaindetails', {supervillain, loggedIn, matchedUser})
    }
    if (loggedIn === true) {
        return res.render('villaindetails', {supervillain, loggedIn})
    } else {
        return res.render('villaindetails', {supervillain})
    }

})






module.exports = router;