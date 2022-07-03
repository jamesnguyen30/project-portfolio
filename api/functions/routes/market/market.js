const {admin, firestore} = require("../../utils/config");
const {
  searchSymbol,
  candleData,
  getQuote,
} = require("../../lib/marketApi");

const defaultWatchlist = [
  {symbol: "AAPL", description: "Apple"},
  {symbol: "NVDA", description: "Nvidia"},
  {symbol: "TSLA", description: "Tesla"},
  {symbol: "GOOG", description: "Google"},
  {symbol: "META", description: "Meta"},
  {symbol: "MSFT", description: "Microsoft"},
  {symbol: "AMZN", description: "Amazon"},
  {symbol: "NDAQ", description: "Nasdaq"},
];


exports.searchSymbol = (req, res) => {
  const query = req.body.q;
  searchSymbol(query).then((response) => {
    return res.status(200).json(response.data);
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({mesasge: "Server error, please check log"});
  });
};

exports.getQuote = (req, res) => {
  const {symbol} = req.body;
  getQuote(symbol).then((response) => {
    return res.json(response.data);
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({message: "Server error! please check log"});
  });
};

const initProfileDoc = (userId, initData = defaultWatchlist) => {
  return firestore.collection("profile").doc(userId).set({
    watchlist: initData,
  });
};

exports.getGuestWatchlist = async (req, res) => {
  try {
    const data = [];
    for (const watchlist of defaultWatchlist) {
      const quote = await getQuote(watchlist.symbol);
      data.push({name: watchlist, ...quote.data});
    }
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("API server error");
  }
};

exports.getWatchlist = (req, res) => {
  const {userId} = req.decodedToken;

  const profileDoc = firestore.collection("profile").doc(userId);

  profileDoc.get().then(async (docRef) => {
    if (docRef.exists) {
      const {watchlist} = docRef.data();
      try {
        for (let i = 0; i < watchlist.length; i++) {
          const quote = await getQuote(watchlist[i].symbol);
          watchlist[i] = {name: watchlist[i], ...quote.data};
        }
        return res.json(watchlist);
      } catch (err) {
        console.error(err);
        return res.status(500).send("API server error");
      }
    } else {
      initProfileDoc(userId).then((_) => {
        return res.json([]);
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error while creating document");
      });
    }
  }).catch((err) => {
    console.error(err);
    return res.send("error");
  });
};

exports.addToWatchlist = (req, res) => {
  const {userId} = req.decodedToken;
  const {symbol, description} = req.body;
  const profileDoc = firestore.collection("profile").doc(userId);

  profileDoc.get().then((docRef) => {
    if (docRef.exists) {
      profileDoc.update({
        watchlist: admin.firestore.FieldValue.arrayUnion(
            {"symbol": symbol, "description": description}),
      }).then((_) => {
        return res.send("ok");
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error while updating document");
      });
    } else {
      initProfileDoc(userId, [symbol]).then((_) => {
        return res.send("ok");
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error while updating document");
      });
    }
  });
};

// exports.seedWatchlist = (req, res) => {
// }

exports.deleteFromWatchlist = (req, res) => {
  const {userId} = req.decodedToken;
  const {symbol, description} = req.body;
  const profileDoc = firestore.collection("profile").doc(userId);

  profileDoc.get().then((docRef) => {
    if (docRef.exists) {
      profileDoc.update({
        watchlist: admin.firestore.FieldValue.arrayRemove(
            {symbol, description}
        ),
      }).then((_) => {
        return res.send("ok");
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error while updating document");
      });
    } else {
      initProfileDoc(userId, [symbol]).then((_) => {
        return res.send("ok");
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error while updating document");
      });
    }
  });
};

exports.reorderWatchlist = (req, res) => {
  const {userId} = req.decodedToken;
  const {oldIdx, newIdx} = req.body;

  const profileDoc = firestore.collection("profile").doc(userId);

  profileDoc.get().then((docRef) => {
    if (docRef.exists) {
      const {watchlist} = docRef.data();
      if (oldIdx < 0 || oldIdx >= watchlist.length ||
        newIdx < 0 || newIdx >= watchlist.length) {
        return res.status(401).json(
            {message: "oldIdx or newIdx is out of range"}
        );
      }

      const tmp = watchlist[oldIdx];
      watchlist[oldIdx] = watchlist[newIdx];
      watchlist[newIdx] = tmp;

      profileDoc.update({watchlist: watchlist}).then((_) => {
        return res.send("ok");
      }).catch((err) => {
        console.error(err);
        return res.status(500).send("Error while updating document");
      });
    } else {
      return res.status(401).send("watchlist is empty");
    }
  }).catch((err)=>{
    console.error(err);
    return res.status(500).send("server error");
  });
};

exports.getCandleData = (req, res) => {
  const {symbol, days} = req.body;
  candleData(symbol, days !== null ? days : 30).then((response) => {
    return res.status(200).json(response.data);
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({messge: "Server error"});
  });
};
