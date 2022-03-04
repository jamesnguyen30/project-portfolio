const {collection, getDocs, setDoc, query, where, updateDoc, arrayUnion} = require("firebase/firestore")
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

exports.addFavorite = (req,res) => {
  /**
   *  add a favorite book to user profile
   *  */ 
  const user = auth.currentUser
  if(user != null){
    const favorite = {
      bookid: req.body.bookid,
      createdOn: Date.now(),
      finished: false
    }

    console.log(favorite)
    const uid = user.uid
    const profileQuery = query(collection(firestore, 'profiles'), where('uid', '==', uid))

    getDocs(profileQuery).then(snapshots=>{
      snapshots.forEach(async snapshot=>{
        const profileRef = snapshot.ref
        await updateDoc(profileRef, {favorites: arrayUnion(favorite)})
        res.status(200).send('ok')
      })
    })
  } else {
    res.status(403).json({'message': "Unauthorized request"})
  }
}
