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
  createProfileData
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

// app.get('/profile', authorize, getProfile)
// app.post('/profile', authorize, updateProfile)
// app.get('/initProfile', authorize, createProfileData)

app.post("/searchSymbol", authorize, searchSymbol)
app.get("/watchlist", authorize, getWatchlist)
app.post("/watchlist", authorize, addToWatchlist)
app.delete("/watchlist", authorize, deleteFromWatchlist)
app.put("/watchlist", authorize, reorderWatchlist)
app.post("/candleData", authorize, getCandleData)
app.post("/quote", authorize, getQuote)
// app.get('/seedWatchlist', authorize, seedWatchlist)

exports.api = functions.https.onRequest(app);
