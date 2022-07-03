const {getFirestore} = require("firebase-admin/firestore");
const admin = require("firebase-admin");

const serviceAccount =
require("../secrets/booksocialnetwork-4e3b7-firebase-adminsdk-ku0h3-2aeea4106a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "booksocialnetwork-4e3b7",
});

const firestore = getFirestore();

module.exports = {
  firestore,
  admin,
};
