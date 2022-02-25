const functions = require("firebase-functions");
const express = require("express");
const {fireabaseApp} = require('./utils/config')
const {isSignedIn} = require("./middlewares/auth")
const {createPost} = require("./routes/books/posts")
const {seedTest} = require("./utils/seedTest")
const {fetchBulk} = require("./routes/books/fetch")

//Prevent CORS error in client
const cors = require('cors')

const app = express();

const {
  healthCheck,
  signUp,
  signIn,
  signOut,
  // updatePassword,
} = require("./routes/auth/auth");

const {
  getProfile,
  addTestFavorites
} = require('./routes/profile/profile')

//Books API
const {
 search,
 getBook
} = require('./routes/books/search')

app.use(cors())
app.get("/healthCheck", healthCheck);
app.get("/seedTest", seedTest);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.get("/signOut", signOut);
app.get("/isSignedIn", isSignedIn, (req,res)=>{
  res.send("Signed In")
});

app.get('/search', search)
app.get('/getBook', getBook )
app.post('/createPost', isSignedIn, createPost)

app.get('/profile', isSignedIn, getProfile)
app.get('/addTestFavorites', isSignedIn, addTestFavorites)

app.post('/fetchBulk', fetchBulk)


exports.api = functions.https.onRequest(app);
