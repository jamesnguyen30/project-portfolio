const functions = require("firebase-functions");
const express = require("express");
const firebaseConfig = require('./secrets/firebaseConfig')
const {initializeApp } = require("firebase/app")
// const {getFirestore} = require('firebase/firestore')


const firebaseApp = initializeApp(firebaseConfig)
// const db = getFirestore(firebaseApp)

const app = express();

const {
  healthCheck,
  signUp,
  // signIn,
  // updatePassword,
  // signOut,
} = require("./routes/auth/auth");


app.use("/healthCheck", healthCheck);
app.use("/signUp", signUp);


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
