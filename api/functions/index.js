const functions = require("firebase-functions");
const express = require("express");
const {isSignedIn, authorize} = require("./middlewares/auth")
const {seedTest} = require("./utils/seedTest")

//Prevent CORS error in client
const cors = require('cors')

const app = express();

const {
  healthCheck,
  signUp,
  signIn,
  signOut,
  checkSignin
} = require("./routes/auth/auth");

const {
  getProfile,
  updateProfile
} = require('./routes/profile/profile')

const {
  searchSymbol,
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist,
  reorderWatchlist,
  getCandleData,
  getQuote,
  seedWatchlist
} = require("./routes/market/market");

app.use(cors())
app.get("/healthCheck", healthCheck);
app.get("/seedTest", seedTest);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.get("/signOut", signOut);
app.get('/isSignedIn', checkSignin)
app.post('/authorize', authorize, (req,res)=>{
  return res.send("signed in")
})
// app.get("/isSignedIn", isSignedIn, (req,res)=>{
//   res.send("Signed In")
// });

app.get('/profile', isSignedIn, getProfile)
app.post('/profile', isSignedIn, updateProfile)

app.post("/searchSymbol", isSignedIn, searchSymbol)
app.get("/watchlist", isSignedIn, getWatchlist)
app.post("/watchlist", isSignedIn, addToWatchlist)
app.delete("/watchlist", isSignedIn, deleteFromWatchlist)
app.put("/watchlist", isSignedIn, reorderWatchlist)
app.post("/candleData", isSignedIn, getCandleData)
app.post("/quote", isSignedIn, getQuote)
app.get('/seedWatchlist', isSignedIn, seedWatchlist)

exports.api = functions.https.onRequest(app);
