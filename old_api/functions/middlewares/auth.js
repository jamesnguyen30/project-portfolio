const {admin, firebase} = require("../utils/firebase");

exports.isSignedIn = (req, res, next)=>{
  const currentUser = firebase.auth().currentUser;
  if (currentUser==null) {
    return res.status(403)
        .json({message: "Unauthorized. Please sign in first"});
  } else {
    req.currentUser = firebase.auth().currentUser;
    return next();
  }
};

exports.verifyToken = (req, res, next)=>{
  const bearerToken = req.headers["authorization"];
  const jwt = bearerToken.split("Bearer ")[1];

  admin.auth().verifyIdToken(jwt)
      .then((decodedToken)=>{
        console.log(decodedToken);
        next();
      })
      .catch((err)=>{
        console.log(err);
        res.status(403).json({message: "Unauthorized"});
      });
};
