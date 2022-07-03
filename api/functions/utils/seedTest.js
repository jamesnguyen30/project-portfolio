const {auth} = require("../utils/config");
const {createUserWithEmailAndPassword} = require("firebase/auth");

exports.seedTest = async (req, res)=>{
  // seed user data
  const users = ["a", "b", "c", "d", "e"];
  const password = "password";
  const uids = [];

  console.log(users.length);

  for (let i = 0; i < users.length; i++) {
    createUserWithEmailAndPassword(auth,
        `${users[i]}@${users[i]}.com`, password)
        .then((cred)=>{
          console.log("Created test user");
          uids.push(cred.uid);
        }).catch((err)=>{
          console.error(`Error while creating users: ${err}`);
        });
  }

  return res.status(200).send("OK");
};
