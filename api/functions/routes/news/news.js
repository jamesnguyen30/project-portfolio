const {
    todayHeadlines,
    newsByTerm
} = require('../../lib/newsApi')

exports.todayHeadlines = (req,res) => {
    todayHeadlines().then(data => {
        return res.json(data)
    }).catch(err=>{
        return res.status(500).send({'message': 'news api error'})
    })
}

exports.newsByTerm = (req,res) => {
    const {term, limit, page} = req.query
    // const {term} = req.body
    newsByTerm(term, limit, page).then(data => {
        return res.json(data)
    }).catch(err=>{
        return res.status(500).send({'message': 'news api error'})
    })
}
