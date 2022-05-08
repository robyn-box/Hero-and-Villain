const express = require('express');
const router = express.Router();
const Supervillain = require('../models/Supervillain');
const Villainpower = require('../models/Villainpower');
const verifyUser = require('../middleware/verifyUser')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

router.get("/", verifyUser, function (req, res) {
    let loggedIn = req.loggedIn
    if (loggedIn === true) {
        res.render('createvillain', {loggedIn})
    } else {
        res.redirect("/")
    }
    
})

router.post('/', verifyUser, async function (req, res, next) {
    console.log(req.body)
    let verifyToken = req.cookies.verifyToken
    let verifiedUser = jwt.verify(verifyToken, secret, {complete: true})
    const { name, imageUrl, age, height, weight, gender} = req.body
    
    const aVillain = new Supervillain({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        // affiliation: req.body.affiliation,
        villainpowers: [],
        creatorId: verifiedUser.payload.id
    })

    aVillain.save((err) => {
        if (err) {
            console.log(err)
            res.render('index', {message: err})
        } else {
            console.log("Villain Created")
            res.redirect('/')
        }
    })
})



module.exports = router;