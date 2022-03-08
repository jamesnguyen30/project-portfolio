const { auth, firestore} = require("../../utils/config")
const {collection, addDoc} = require("firebase/firestore")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence} = require('firebase/auth')

exports.healthCheck = (req, res) => {
  res.status(200).json("Healthy API");
};

const getAuthResponse = (userCredential) => ({
  displayName: userCredential.user.displayName,
  photoURL: userCredential.user.photoURL,
})

exports.signUp = (req, res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((userCredential) => {
      // const data = getAuthResponse(userCredential)
      const profile = {
        uid: userCredential.user.uid,
        favorites: [],
        wanted: [],
      }
      addDoc(collection(firestore, 'profiles'), profile)
      .then(result=>{
        return res.status(200).json({message: "Created new user"});
      })
      .catch(err=>{
        return res.status(500).json({message: err})
      })
      // return res.status(500).json({message: err})
    })
    .catch((error) => {
      console.log(error)
      return res.status(401).json({error: error.code});
    });
};

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const data = getAuthResponse(userCredential)
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error)
      return res.status(401).json({error: error.code});
    });
};

exports.signOut = (req, res) => {
  signOut(auth).then(() => {
    return res.status(200).json({ message: "Ok" });
  }).catch((err) => {
    return res.status(500).json({ message: err });
  });
};

exports.persistAuth = (req,res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  setPersistence(auth, browserLocalPersistence)
  .then(()=>{
    return signInWithEmailAndPassword(auth,user.email, user.password)
  })
  .then(response=>{
    return res.status(200).send("signed in")
  }).catch(err=>{
    console.error(err)
  })
}

// exports.updatePassword = (req, res)=>{
//   const newPassword = req.body.newPassword;
//   const currentUser = firebase.auth().currentUser;

//   if (currentUser) {
//     currentUser.updatePassword(newPassword)
//         .then(()=>{
//           return res.status(200).json({message: "Updated password"});
//         })
//         .catch((err)=>{
//           return res.status(403).json({message: err});
//         });
//   } else {
//     return res.status(403).json({message: "Unauthorized password update"});
//   }
// };
