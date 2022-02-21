// const firebase = require("firebase");
const firebaseConfig = require("../secrets/firebaseConfig");
const {initializeApp } = require("firebase/app")
const firebaseApp = initializeApp(firebaseConfig)
const {getFirestore, connectFirestoreEmulator} = require('firebase/firestore')
const {getAuth, connectAuthEmulator} = require("firebase/auth");
const firestore = getFirestore()
const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099')
connectFirestoreEmulator(firestore, 'localhost', 8080)
// initializeApp(firebaseApp)

module.exports = {firebaseApp, firestore, auth}
// admin.initializeApp({

// });
// firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
