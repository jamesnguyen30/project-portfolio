const functions = require("firebase-functions");
const express = require("express");
const {isSignedIn, authorize} = require("./middlewares/auth");
const {seedTest} = require("./utils/seedTest");
require("dotenv").config();

// Prevent CORS error in client
const cors = require("cors");

const app = express();

const {healthCheck, revokeToken} = require("./routes/auth/auth");

const {
  getProfile,
  createProfileData,
} = require("./routes/profile/profile");

const {
  searchSymbol,
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist,
  reorderWatchlist,
  getCandleData,
  getQuote,
  seedWatchlist,
  getGuestWatchlist,
} = require("./routes/market/market");

const {
  todayHeadlines,
  newsByTerm,
} = require("./routes/news/news");

app.use(cors());
app.get("/healthCheck", healthCheck);
app.get("/seedTest", seedTest);
app.get("/isSignedIn", authorize, (req, res) => {
  return res.send("ok");
});
app.post("/revokeToken", revokeToken);

app.post("/searchSymbol", authorize, searchSymbol);
app.get("/watchlist", authorize, getWatchlist);
app.get("/watchlist/guest", getGuestWatchlist);
app.post("/watchlist", authorize, addToWatchlist);
app.delete("/watchlist", authorize, deleteFromWatchlist);
app.put("/watchlist", authorize, reorderWatchlist);
app.post("/candleData", authorize, getCandleData);
app.post("/quote", authorize, getQuote);

app.get("/headlines", todayHeadlines);
app.get("/news", newsByTerm);


exports.api = functions.https.onRequest(app);
