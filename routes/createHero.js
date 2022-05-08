const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero')
const verifyUser = require('../middleware/verifyUser')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

router.get('/', verifyUser, function (req, res) {
    let loggedIn = req.loggedIn;
    if (loggedIn === true) {
        res.render('createhero', {loggedIn})
    } else {
        res.redirect('/')
    }
    
})


router.post('/', verifyUser, async function (req, res, next) {

    let verifyToken = req.cookies.verifyToken
    let verifiedUser = jwt.verify(verifyToken, secret, {complete: true})
    // console.log(verifyToken, verifiedUser)
    // console.log(verifiedUser.payload.id)
    console.log(req.body)
    
    const { name, imageUrl, age, height, weight, gender} = req.body
    const aHero = new Superhero({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
        // affiliation: req.body.affiliation,
        heropowers: [],
        creatorId: verifiedUser.payload.id
        
        
    })
    
    aHero.save((err) => {
        if (err) {
            console.log(err)
            res.render('index', {message: err})
        } else {
            console.log(aHero)
            console.log("Hero Created")
            res.redirect("/")
        }
    })
})


module.exports = router;