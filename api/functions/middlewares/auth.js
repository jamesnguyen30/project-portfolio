const {admin} = require("../utils/config");

exports.authorize = (req, res, next) => {
  const idToken = req.headers.authorization.split(" ")[1];
  admin.auth().verifyIdToken(idToken).then((decodedToken)=>{
    req.decodedToken = decodedToken;
    next();
  }).catch((err)=>{
    return res.status(403).send("unauthorized");
  });
};
