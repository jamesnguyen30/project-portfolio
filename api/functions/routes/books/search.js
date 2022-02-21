const { getList, getBook } = require('../../api/google_books_api/booksApi')
const { collection, query, where, getDocs } = require("firebase/firestore")
const { firestore } = require('../../utils/config')

exports.search = (req, res) => {
  getList(req.query.q).then(api => {
    return res.json(api.data)
  }).catch(err => {
    console.log(err)
    return res.status(500).json({ error: err })
  })
}

exports.getBook = (req, res) => {
  const bookid = req.query.id
  getBook(bookid).then(api => {
    const data = api.data
    data.posts = []
    // data.recaps = [{ title: 'Recap 1' }]

    const q = query(collection(firestore, 'posts')
      , where('bookid', '==', bookid))

    getDocs(q).then(snapshot => {
      snapshot.forEach(doc => {
        const {authorid, ...result } = doc.data()
        //get author name
        data.posts.push(result)
      })
      return res.json(api.data)
    }).catch(err=>{
      return res.status(500).json({error: err})
    })

  }).catch(err => {
    console.log(err)
    return res.status(500).json({ error: err })
  })
}