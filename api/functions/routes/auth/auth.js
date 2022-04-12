const { auth, firestore } = require("../../utils/config")
const { collection, addDoc } = require("firebase/firestore")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } = require('firebase/auth')

exports.healthCheck = (req, res) => {
  res.status(200).json("Healthy API");
};

// const getAuthResponse = (userCredential) => ({
//   displayName: userCredential.user.displayName,
//   photoURL: userCredential.user.photoURL,
// })

exports.signUp = (req, res) => {

  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then(async (userCredential) => {
      userCredential.user.getIdToken().then(
        idToken => {
          const profile = {
            uid: userCredential.user.uid,
            watchlist: [],
          }
          addDoc(collection(firestore, 'profiles'), profile)
            .then(result => {
              return res.status(200).json(idToken);
            })
            .catch(err => {
              console.error(err)
              return res.status(500).json({ message: "Server error, please check log" })
            })
        }
      ).catch(err => {
        console.error(err)
        return res.status(500).json({ message: "Server error, please check log" })
      })
    })
    .catch((error) => {
      console.error(err)
      return res.status(500).json({ message: "Server error, please check log" })
    });
};

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // const data = getAuthResponse(userCredential)
      auth.currentUser.getIdToken().then(idToken => {
        return res.status(200).json(idToken);
      }).catch(err => {
        console.error(err)
        return res.status(500).json({ message: "Server error, please check log" })
      })
    })
    .catch((error) => {
      console.log(error)
      return res.status(401).json({ error: error.code });
    });
};

exports.signOut = (req, res) => {
  signOut(auth).then(() => {
    return res.status(200).json({ message: "Ok" });
  }).catch((err) => {
    return res.status(500).json({ message: err });
  });
};

exports.checkSignin = (req, res) => {
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        unsubscribe()
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }).then(isSignedIn => {
    if (isSignedIn) {
      return res.send('signed in')
    } else {
      return res.status(403).send("not signed in")
    }
  })
}

exports.verifyIdToken = (req, res) => {
  const { idToken } = req.body

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
