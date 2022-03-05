const {collection, getDocs, setDoc, query, where, updateDoc, arrayUnion, arrayRemove} = require("firebase/firestore")
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

exports.deleteFavorite = (req,res) => {
  /**
   *  add a favorite book to user profile
   *  */ 
  const user = auth.currentUser
  console.log(req.body.bookid)
  if(user != null){
    const uid = user.uid
    const profileQuery = query(collection(firestore, 'profiles'), where('uid', '==', uid))
    getDocs(profileQuery).then(snapshots=>{
      snapshots.forEach(async snapshot=>{
        const profileRef = snapshot.ref
        const favorite = snapshot.data().favorites.find(item => item.bookid === req.body.bookid)
        if(favorite!==null){
          updateDoc(profileRef, {favorites: arrayRemove(favorite)}).then(response=>{
            res.status(200).send('ok')
          }).catch(err=>{
            res.status(500).send(str(err))
          })
        } else {
            res.status(404).send(`No favorite with id=${req.body.id} not found`)
        }
      })
    })
  } else {
    res.status(403).json({'message': "Unauthorized request"})
  }


}
