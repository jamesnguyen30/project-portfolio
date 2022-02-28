const {collection, addDoc, getDoc, query, where} = require("firebase/firestore")
const {auth, firestore} = require("../../utils/config")
const { getBook } = require('../../api/google_books_api/booksApi')

exports.fetchBooks = async (req,res) => {
  /**
   * Fetch books with an array of bookid
   */

  const favorites = JSON.parse(req.body.bookids)
  let books =[]

  if(favorites!=null && favorites.length > 0){
    for(const favorite of favorites){
      await getBook(favorite.bookid).then(response=>books.push(response.data))
    }
    res.status(200).json(books)
   } else {
    res.status(200).json([])
   }
}
