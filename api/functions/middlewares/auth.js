const { auth, admin} = require("../utils/config")

exports.isSignedIn = (req, res, next) => {
  const currentUser = auth.currentUser;
  if (currentUser == null) {
    return res.status(403)
      .json({ message: "Unauthorized. Please sign in first" });
  } else {
    req.currentUser = auth.currentUser
    return next();
  }
};

exports.authorize = (req,res,next) => {
  const {idToken} = req.body
  admin.auth().verifyIdToken(idToken).then(decodedToken=>{
    next()
  }).catch(err=>{
    console.error(err)
    return res.status(403).send("unauthorized")
  })
}
