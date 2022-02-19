const {googleBooksAPIKey} = require("../../secrets/api_keys")
const {getList, getBook} = require('../../api/google_books_api/booksApi')

exports.search = (req,res) => {
  getList(req.query.q).then(api=>{
    return res.json(api.data)
  }).catch(err=>{
    console.log(err)
    return res.status(500).json({error: err})
  })
}

exports.getBook = (req,res) => {
    const bookId = req.query.id
    getBook(bookId).then(api=>{
      const data = api.data
      data.posts = [{title: 'Post 1'}]
      data.recaps = [{title: 'Recap 1'}]
      return res.json(api.data)
    }).catch(err=>{
      console.log(err)
      return res.status(500).json({error: err})
    })
}