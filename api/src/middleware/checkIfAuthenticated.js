const checkIfAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) return next() 
    return res.redirect("/failedLogin") 
}

module.exports = checkIfAuthenticated