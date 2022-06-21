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
    const {term} = req.query
    // const {term} = req.body
    newsByTerm(term).then(data => {
        return res.json(data)
    }).catch(err=>{
        return res.status(500).send({'message': 'news api error'})
    })
}
