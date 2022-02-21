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
    isrecap: false,
    section: 'chapter 1'
  }

  addDoc(collection(firestore, "posts"), data).then(result => {
    console.log(result)
    res.send('ok')
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error: err})
  })
}

