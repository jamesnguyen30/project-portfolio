const {auth, firestore} = require('../../utils/config')
const {searchSymbol} = require('../../lib/finnhub')
const {collection, getDocs, query, where, arrayUnion, arrayRemove, updateDoc} = require('firebase/firestore')

exports.searchSymbol = (req,res) => {
  const query = req.body.q
  searchSymbol(query).then(response=>{
    return res.status(200).json(response.data)
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({mesasge: "Server error, please check log"})
  })
}

exports.getWatchlist = (req,res) => {
  const currentUser = auth.currentUser

  const profileQuery = query(collection(firestore, 'profiles'),where("uid", "==", currentUser.uid))
  getDocs(profileQuery).then(snapshots => {
    snapshots.forEach(snapshot=>{
      const watchlist = snapshot.data().watchlist
      console.log()
      return res.status(200).json(watchlist)
    })
  }).catch(err=>{
    console.error(err)
    return res.status(500)
  })
} 

exports.saveWatchlist = (req,res) => {
  const {symbol} = req.body
  const currentUser = auth.currentUser
  const profileQuery = query(collection(firestore, 'profiles'),where("uid", "==", currentUser.uid))
  
  getDocs(profileQuery).then(snapshots => {
    snapshots.forEach(snapshot => {
      updateDoc(snapshot.ref, {watchlist: arrayUnion(symbol)}).then(_ => {
        return res.status(200).json({message: 'success'})
      }).catch(err=>{
        console.error(err)
        return res.status(500).json({message: "Server error"})
      })
    })
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({message: "Server error"})
  })
}

exports.deleteFromWatchlist = (req,res) => {
  const {symbol} = req.body
  const currentUser = auth.currentUser
  const profileQuery = query(collection(firestore, 'profiles'),where("uid", "==", currentUser.uid))
  
  getDocs(profileQuery).then(snapshots => {
    snapshots.forEach(snapshot => {
      updateDoc(snapshot.ref, {watchlist: arrayRemove(symbol)}).then(_ => {
        return res.status(200).json({message: 'success'})
      }).catch(err=>{
        console.error(err)
        return res.status(500).json({message: "Server error"})
      })
    })
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({message: "Server error"})
  })
}



