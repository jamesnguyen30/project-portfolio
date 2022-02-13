const {auth} = require("../../utils/config")
const {createUserWithEmailAndPassword} = require('firebase/auth')

exports.healthCheck = (req, res)=>{
  res.status(200).json("Healthy API");
};

exports.signUp = (req, res)=>{
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log(newUser)

  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((data)=>{
        return data.user.getIdToken();
      })
      .then((token)=>{
        return res.status(200).json({token: token});
      }).catch((error) => {
        res.status(500).json({message: error});
      });
};

// exports.signIn = (req, res)=>{
//   const user = {
//     email: req.body.email,
//     password: req.body.password,
//   };

//   firebase.auth()
//       .signInWithEmailAndPassword(user.email, user.password)
//       .then((data)=>{
//         return data.user.getIdToken();
//       })
//       .then((token)=>{
//         return res.status(200).json({token: token});
//       })
//       .catch((error)=>{
//         res.status(403).json({message: error});
//       });
// };

// exports.signOut = (req, res)=>{
//   firebase.auth().signOut().then(()=>{
//     return res.status(200).json({message: "Signed out"});
//   }).catch((err)=>{
//     return res.status(500).json({message: err});
//   });
// };

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
