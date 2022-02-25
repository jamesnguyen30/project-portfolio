const {auth, firestore} = require('../../utils/config')
const {addFavoritesToUser} = require('../../utils/seedTest')
const {collection, getDocs, query, where} = require("firebase/firestore")

exports.getProfile = (req,res) => {
  const user = auth.currentUser
  if(user != null){
    const data = {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoUrl,
      emailVerified: user.emailVerified,
    }

    const profileQuery = query(collection(firestore, 'profiles'), where('uid', '==', user.uid))
    getDocs(profileQuery).then(snapshots => {
      snapshots.forEach(snapshot=>{
        const profile = snapshot.data()
        data.favorites = profile.favorites
        data.wanted = profile.wanted
        return res.status(200).json(data)
      })
    }).catch(err=>{
      console.log(err)
      return res.status(500).json({message: "Error while fetching profile!"})
    })
  } else {
    return res.status(403).json({'message': "Unauthorized request"})
  }
}

exports.addTestFavorites = (req,res) => {
  const user = auth.currentUser
  if(user != null){
    addFavoritesToUser(user.uid)
    res.status(200).json("ok")
  } else {
    res.status(403).json({'message': "Unauthorized request"})
  }
} 

