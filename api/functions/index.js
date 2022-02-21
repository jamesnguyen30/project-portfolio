const functions = require("firebase-functions");
const express = require("express");
const {fireabaseApp} = require('./utils/config')
const {isSignedIn} = require("./middlewares/auth")
const {createPost} = require("./routes/books/posts")

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

//Books API
const {
 search,
 getBook
} = require('./routes/books/search')

app.use(cors())
app.use("/healthCheck", healthCheck);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.get("/signOut", signOut);
app.get("/isSignedIn", isSignedIn, (req,res)=>{
  res.send("Signed In")
});

app.get('/search', search)
app.get('/getBook', getBook )
app.post('/createPost', isSignedIn, createPost)

exports.api = functions.https.onRequest(app);
