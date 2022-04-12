const {admin} = require("../utils/config")

// exports.isSignedIn = (req, res, next) => {
//   const currentUser = auth.currentUser;
//   if (currentUser == null) {
//     return res.status(403)
//       .json({ message: "Unauthorized. Please sign in first" });
//   } else {
//     req.currentUser = auth.currentUser
//     return next();
//   }
// };

exports.authorize = (req,res,next) => {
  const idToken = req.headers.authorization.split(" ")[1]
  admin.auth().verifyIdToken(idToken).then(decodedToken=>{
    req.decodedToken = decodedToken
    next()
  }).catch(err=>{
    return res.status(403).send("unauthorized")
  })
}
