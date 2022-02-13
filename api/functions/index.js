const functions = require("firebase-functions");
const express = require("express");
const {fireabaseApp} = require('./utils/config')

const app = express();

const {
  healthCheck,
  signUp,
  // signIn,
  // updatePassword,
  // signOut,
} = require("./routes/auth/auth");


app.use("/healthCheck", healthCheck);
app.post("/signUp", signUp);


// app.get("/screams", (req, res)=>{
//   admin.firestore().collection("screams").get().then((data)=>{
//     const screams = [];
//     data.forEach((doc) =>{
//       screams.push(doc.data());
//     });
//     res.json(screams);
//   }).catch((err)=>{
//     console.error(err);
//     res.status(500).send("Error: " + err);
//   });
// });

exports.api = functions.https.onRequest(app);
