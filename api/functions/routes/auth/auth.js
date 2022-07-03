const {admin} = require("../../utils/config");

exports.healthCheck = (req, res) => {
  res.status(200).json("Healthy API");
};

exports.revokeToken = (req, res) => {
  const {uid} = req.body;
  admin.auth().revokeRefreshTokens(uid).then((_) => {
    return res.send("revoked token");
  }).catch((err)=>{
    console.error(err);
    return res.status(500).send("Server error");
  });
};
