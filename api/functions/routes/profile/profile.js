const {firestore, auth} = require("../../utils/config");

const defaultWatchlist = [
  {symbol: "AAPL", description: "Apple"},
  {symbol: "NVDA", description: "Nvidia"},
  {symbol: "TSLA", description: "Tesla"},
  {symbol: "GOOG", description: "Google"},
  {symbol: "META", description: "Meta"},
  {symbol: "MSFT", description: "Microsoft"},
  {symbol: "AMZN", description: "Amazon"},
  {symbol: "NDAQ", description: "Nasdaq"},
];

exports.getProfile = (req, res) => {
  const user = auth.currentUser;
  if (user != null) {
    const data = {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoUrl,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
    return res.status(200).json(data);
  } else {
    return res.status(403).json({"message": "Unauthorized request"});
  }
};

exports.createProfileData = (req, res) => {
  const {user_id} = req.decodedToken;

  firestore.collection("profile").doc(user_id).set({
    watchlist: defaultWatchlist,
  }).then((response)=>{
    res.status(200).send("ok");
  }).catch((err)=>{
    console.error(err);
    res.status(500).send("Internal Server Error");
  });
};

