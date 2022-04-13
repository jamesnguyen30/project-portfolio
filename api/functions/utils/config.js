const {getFirestore} = require('firebase-admin/firestore')
const admin = require("firebase-admin")

const serviceAccount = require('../secrets/booksocialnetwork-4e3b7-firebase-adminsdk-ku0h3-ac117da738.json')

admin.initializeApp({
  credential : admin.credential.cert(serviceAccount),
  projectId: 'booksocialnetwork-4e3b7'
})
firestore = getFirestore()

module.exports = {
  firestore, 
  admin,
}
