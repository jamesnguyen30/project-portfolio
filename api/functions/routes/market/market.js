const {auth, firestore} = require('../../utils/config')
const {
  searchSymbol, 
  candleData,
  historicalData,
  getQuote
} = require('../../lib/marketApi')

const {collection, getDocs, query, where, arrayUnion, arrayRemove, updateDoc} = require('firebase/firestore')
const { isTemplateLiteralTypeNode } = require('typescript')

exports.searchSymbol = (req,res) => {
  const query = req.body.q
  searchSymbol(query).then(response=>{
    return res.status(200).json(response.data)
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({mesasge: "Server error, please check log"})
  })
}

exports.getQuote = (req,res) => {
  const {symbol} = req.body
  getQuote(symbol).then(response=>{
    return res.json(response.data)
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({message: 'Server error! please check log'})
  })
}

exports.getWatchlist = (req,res) => {
  const currentUser = auth.currentUser

  const profileQuery = query(collection(firestore, 'profiles'),where("uid", "==", currentUser.uid))
  getDocs(profileQuery).then(snapshots => {
    snapshots.forEach(async snapshot=>{
      const watchlist = snapshot.data().watchlist

      try{
        for(var i = 0;i < watchlist.length;i++) {
          const quote= await getQuote(watchlist[i])
          watchlist[i] = {name: watchlist[i], ...quote.data}
        }
        console.log(watchlist)
        
        return res.json(watchlist)
      } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Server error'})
      }
      // historicalData(watchlist).then(response=>{
      //   return res.status(200).json(response.data)
      // }).catch(err=>{
      //   console.error(err)
      //   return res.status(500).json({message: 'Server error'})
      // })
    })
  }).catch(err=>{
    console.error(err)
    return res.status(500)
  })
} 

exports.addToWatchlist = (req,res) => {
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

exports.reorderWatchlist = (req,res) => {
  const currentUser = auth.currentUser
  const profileQuery = query(collection(firestore, 'profiles'),where("uid", "==", currentUser.uid))
  const {oldIdx, newIdx} = req.body

  getDocs(profileQuery).then(snapshots => {
    snapshots.forEach(snapshot => {
      let watchlist = snapshot.data().watchlist
      if(oldIdx < 0 || oldIdx >= watchlist.length || newIdx < 0 || newIdx >= watchlist.length){
        return res.status(400).json({message: "oldIdx or newIdx is out of range"}) 
      }

      var tmp = watchlist[oldIdx]
      watchlist[oldIdx] = watchlist[newIdx]
      watchlist[newIdx] = tmp


      updateDoc(snapshot.ref, {watchlist: watchlist}).then(_ => {
        return res.status(200).json({message: 'success'})
      }).catch(err=>{
        console.error(err)
        return res.status(500).json({message: 'Server error'})
      })
    })
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({message: 'Server error'})
  })
}

exports.getCandleData = (req,res) => {
  const {symbol, days} = req.body
  candleData(symbol, days!== null ? days: 30).then(response=>{
    return res.status(200).json(response.data)
  }).catch(err=>{
    console.error(err)
    return res.status(500).json({messge: "Server error"})
  })
}
