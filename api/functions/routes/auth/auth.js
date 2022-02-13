const { auth } = require("../../utils/config")
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} = require('firebase/auth')

exports.healthCheck = (req, res) => {
  res.status(200).json("Healthy API");
};

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(200).json({ token: token });
    }).catch((error) => {
      console.log(error)
      res.status(500).json({ message: error });
    });
};

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  
  console.log(user)

  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(200).json({ token: token });
    })
    .catch((error) => {
      res.status(403).json({ message: error });
    });
};

exports.signOut = (req, res)=>{
  signOut().then(()=>{
    return res.status(200).json({message: "Signed out"});
  }).catch((err)=>{
    return res.status(500).json({message: err});
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
