const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();

const app = express();

app.get("/healthCheck", (req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send("Hello from New York with Love");
});

app.get("/screams", (req, res)=>{
  admin.firestore().collection("screams").get().then((data)=>{
    const screams = [];
    data.forEach((doc) =>{
      screams.push(doc.data());
    });
    res.json(screams);
  }).catch((err)=>{
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

exports.api = functions.https.onRequest(app);
