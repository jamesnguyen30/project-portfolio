const {auth, firestore} = require('../../utils/config')
const {addFavoritesToUser} = require('../../utils/seedTest')
const {updateProfile}  = require('firebase/auth')

exports.getProfile = (req,res) => {
  const user = auth.currentUser
  if(user != null){
    const data = {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoUrl,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    }
    return res.status(200).json(data)
  } else {
    return res.status(403).json({'message': "Unauthorized request"})
  }
}

exports.updateProfile = (req,res) => {
  const user = auth.currentUser
  if(user!=null){
    const updateData = {
      displayName: req.body.displayName,
      photoURL: req.body.photoURL
    } 

    updateProfile(user, updateData).then(()=>{
      return res.status(200).json({
        message: "Updated profile"
      })
    }).catch(err=>{
      console.error(err)
      return res.status(500).json({
        error: "Error while updating profile. Please check log"
      })
    })
  } else {
    return res.status(403).json({'message': "Unauthorized request"})
  }
}

