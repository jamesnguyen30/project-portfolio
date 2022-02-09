const checkIfAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) return next() 
    return res.redirect("/auth/failedLogin") 
}

module.exports = checkIfAuthenticated