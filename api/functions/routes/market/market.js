const { admin, firestore } = require('../../utils/config')
const {
  searchSymbol,
  candleData,
  getQuote
} = require('../../lib/marketApi')


exports.searchSymbol = (req, res) => {
  const query = req.body.q
  searchSymbol(query).then(response => {
    return res.status(200).json(response.data)
  }).catch(err => {
    console.error(err)
    return res.status(500).json({ mesasge: "Server error, please check log" })
  })
}

exports.getQuote = (req, res) => {
  const { symbol } = req.body
  getQuote(symbol).then(response => {
    return res.json(response.data)
  }).catch(err => {
    console.error(err)
    return res.status(500).json({ message: 'Server error! please check log' })
  })
}

const initProfileDoc = (user_id, initData = []) => {
  return firestore.collection('profile').doc(user_id).set({
    watchlist: initData
  })
}

exports.getWatchlist = (req, res) => {
  const { user_id } = req.decodedToken

  const profileDoc = firestore.collection("profile").doc(user_id)

  profileDoc.get().then(async docRef => {
    if (docRef.exists) {
      const { watchlist } = docRef.data()
      try{
        for(var i = 0; i < watchlist.length; i++){
          const quote = await getQuote(watchlist[i])
          watchlist[i] = {name: watchlist[i], ...quote.data}
        }
        return res.json(watchlist)
      } catch (err){
        console.error(err)
        return res.status(500).send("API server error")
      }
    } else {
      initProfileDoc(user_id).then(_ => {
        return res.json([])
      }).catch(err => {
        console.error(err)
        return res.status(500).send("Error while creating document")
      })
    }
  }).catch(err => {
    console.error(err)
    return res.send('error')
  })
}

exports.addToWatchlist = (req, res) => {

  const { user_id } = req.decodedToken
  const { symbol } = req.body
  const profileDoc = firestore.collection('profile').doc(user_id)

  profileDoc.get().then(docRef => {
    if (docRef.exists) {
      profileDoc.update({
        watchlist: admin.firestore.FieldValue.arrayUnion(symbol)
      }).then(_ => {
        return res.send("ok")
      }).catch(err => {
        console.error(err)
        return res.status(500).send("Error while updating document")
      })
    } else {
      initProfileDoc(user_id, [symbol]).then(_ => {
        return res.send('ok')
      }).catch(err => {
        console.error(err)
        return res.status(500).send("Error while updating document")
      })
    }
  })

}

// exports.seedWatchlist = (req, res) => {
// }

exports.deleteFromWatchlist = (req, res) => {
  const { user_id } = req.decodedToken
  const { symbol } = req.body
  const profileDoc = firestore.collection('profile').doc(user_id)

  profileDoc.get().then(docRef => {
    if (docRef.exists) {
      profileDoc.update({
        watchlist: admin.firestore.FieldValue.arrayRemove(symbol)
      }).then(_ => {
        return res.send("ok")
      }).catch(err => {
        console.error(err)
        return res.status(500).send("Error while updating document")
      })
    } else {
      initProfileDoc(user_id, [symbol]).then(_ => {
        return res.send('ok')
      }).catch(err => {
        console.error(err)
        return res.status(500).send("Error while updating document")
      })
    }
  })
}

exports.reorderWatchlist = (req, res) => {
  const { user_id } = req.decodedToken
  const { oldIdx, newIdx } = req.body

  const profileDoc = firestore.collection('profile').doc(user_id)

  profileDoc.get().then(docRef => {
    if(docRef.exists){
      const {watchlist} = docRef.data()
      if (oldIdx < 0 || oldIdx >= watchlist.length || newIdx < 0 || newIdx >= watchlist.length) {
        return res.status(401).json({ message: "oldIdx or newIdx is out of range" })
      }

      var tmp = watchlist[oldIdx]
      watchlist[oldIdx] = watchlist[newIdx]
      watchlist[newIdx] = tmp

      profileDoc.update({watchlist: watchlist}).then(_ => {
        return res.send("ok")
      }).catch(err => {
        console.error(err)
        return res.status(500).send("Error while updating document")
      })
    } else {
      return res.status(401).send("watchlist is empty")
    }
  }).catch(err=>{
    console.error(err)
    return res.status(500).send("server error")
  })
}

exports.getCandleData = (req, res) => {
  const { symbol, days } = req.body
  candleData(symbol, days !== null ? days : 30).then(response => {
    return res.status(200).json(response.data)
  }).catch(err => {
    console.error(err)
    return res.status(500).json({ messge: "Server error" })
  })
}
