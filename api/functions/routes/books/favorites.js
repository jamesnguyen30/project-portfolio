const {collection, addDoc, getDoc, query, where} = require("firebase/firestore")
const {auth, firestore} = require("../../utils/config")

exports.getFavorites = (req,res) => {
  /**
   *  Get a favorite books of signed in user 
   *  */ 

  const user = auth.currentUser
  if(user != null){
    
  } else {
    res.status(403).json({'message': "Unauthorized request"})
  }
}