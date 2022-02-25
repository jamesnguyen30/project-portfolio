const {collection, addDoc, getDoc, query, where} = require("firebase/firestore")
const {auth, firestore} = require("../../utils/config")
const { getBook } = require('../../api/google_books_api/booksApi')

exports.fetchBulk = async (req,res) => {
  /**
   * Fetch books with an array of bookid
   */

  const bookids = JSON.parse(req.body.bookids)

  console.log(typeof(bookids))
  const books = []
  if(bookids!=null && bookids.length > 0){
    for(const bookid of bookids){
      await getBook(bookid).then(response=>books.push(response.data))
    }
    res.status(200).json(books)
   } else {
    res.status(401).send("Need an array of book ids")
  }


}
