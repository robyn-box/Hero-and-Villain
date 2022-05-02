const secret = process.env.SECRET
const jwt = require('jsonwebtoken')


async function verifyUser(req, res, next) {
    let loggedIn;
    
    if (!req.cookies.verifyToken) {
        loggedIn = false
        req.loggedIn = false
        console.log("not logged in")
        next()
    } else {
        loggedIn = jwt.verify(req.cookies.verifyToken, secret)
        
        if(!loggedIn) {
            console.log("false")
            req.loggedIn = false
            next()

        } else {
            req.loggedIn = true
            next()

        }
    }
}

module.exports = verifyUser