const {collection, addDoc, getDoc} = require("firebase/firestore")
const {auth, firestore} = require("../../utils/config")

exports.createPost = (req,res) => {
  const uid = auth.currentUser.uid

  const data = {
    bookid: req.body.bookid,
    title: req.body.title,
    content: req.body.content,
    authorid: uid,
    date: Date.now(),
    upvotes: 0,
    chapter: req.body.chapter
   }

  addDoc(collection(firestore, "posts"), data).then(result => {
    res.send('ok')
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error: err})
  })
}

