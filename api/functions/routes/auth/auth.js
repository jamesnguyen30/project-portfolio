const { auth } = require("../../utils/config")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')

exports.healthCheck = (req, res) => {
  res.status(200).json("Healthy API");
};

const getAuthResponse = (userCredential) => ({
  // token: userCredential.user.getIdToken(),
  displayName: userCredential.user.displayName,
  email: userCredential.user.email,
  emailVerified: userCredential.user.emailVerified,
})



exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((userCredential) => {
      const data = getAuthResponse(userCredential)
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({ message: error });
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
      console.log(data)
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({ message: error });
    });
};

exports.signOut = (req, res) => {
  signOut(auth).then(() => {
    return res.status(200).json({ message: "Ok" });
  }).catch((err) => {
    return res.status(500).json({ message: err });
  });
};

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
