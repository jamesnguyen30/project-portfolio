// const firebase = require("firebase");
const firebaseConfig = require("../secrets/firebaseConfig");
const {initializeApp } = require("firebase/app")
const firebaseApp = initializeApp(firebaseConfig)
const {getFirestore} = require('firebase/firestore')
const {getAuth} = require("firebase/auth");
const db = getFirestore()
const auth = getAuth();
// initializeApp(firebaseApp)

module.exports = {firebaseApp, auth}
// admin.initializeApp({

// });
// firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
