const {getList} = require('../../api/google_books_api/books_api')

exports.searchBooksByName = (req,res)=>{
    getList("Lord of the ring").then(apiRes=>{
        console.log(apiRes.data)
        return res.json(apiRes.data)
    }).catch(err=>{
        console.error(err)
        return res.status(500).json({error: err})
    })
}