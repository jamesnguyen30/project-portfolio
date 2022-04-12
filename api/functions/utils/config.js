const firebaseConfig = require("../secrets/firebaseConfig");
const {initializeApp} = require("firebase/app")
const firebaseApp = initializeApp(firebaseConfig)
const {getFirestore, connectFirestoreEmulator} = require('firebase/firestore')
const firestore = getFirestore()
const admin = require("firebase-admin")

const serviceAccount = require('../secrets/booksocialnetwork-4e3b7-firebase-adminsdk-ku0h3-ac117da738.json')

admin.initializeApp({
  credential : admin.credential.cert(serviceAccount),
  projectId: 'booksocialnetwork-4e3b7'
})


connectFirestoreEmulator(firestore, 'localhost', 8080)

module.exports = {
  firestore, 
  admin,
  firebaseApp
}
