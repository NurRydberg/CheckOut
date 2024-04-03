const loggedIn = (req, res, next) => {
    if (!req.session.user) { 
        return res.status(401).json("You must be logged in")
    }
    next()
}

module.exports = {loggedIn}