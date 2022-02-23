const {auth} = require("../utils/config")

exports.isSignedIn = (req, res, next)=>{
    const currentUser = auth.currentUser;
    if (currentUser==null) {
      console.log("Unauthorized attempt!!!")
      return res.status(403)
          .json({message: "Unauthorized. Please sign in first"});
    } else {
      req.currentUser = auth.currentUser
      return next();
    }
  };

exports.verifyIdToken