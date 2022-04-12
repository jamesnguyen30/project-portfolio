const functions = require("firebase-functions");
const express = require("express");
const {isSignedIn, authorize} = require("./middlewares/auth")
const {seedTest} = require("./utils/seedTest")
require('dotenv').config()

//Prevent CORS error in client
const cors = require('cors')

const app = express();

const {
  healthCheck,
  // signUp,
  // signIn,
  // signOut,
  revokeToken
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
app.get('/isSignedIn', authorize, (req,res)=>{
  return res.send("ok")
})
app.post('/revokeToken', revokeToken)

app.get('/profile', authorize, getProfile)
app.post('/profile', authorize, updateProfile)

// app.post("/searchSymbol", isSignedIn, searchSymbol)
// app.get("/watchlist", isSignedIn, getWatchlist)
// app.post("/watchlist", isSignedIn, addToWatchlist)
// app.delete("/watchlist", isSignedIn, deleteFromWatchlist)
// app.put("/watchlist", isSignedIn, reorderWatchlist)
// app.post("/candleData", isSignedIn, getCandleData)
// app.post("/quote", isSignedIn, getQuote)
// app.get('/seedWatchlist', isSignedIn, seedWatchlist)

exports.api = functions.https.onRequest(app);
