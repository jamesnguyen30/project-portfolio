const {
    todayHeadlines
} = require('../../lib/newsApi')

exports.todayHeadlines = (req,res) => {
    todayHeadlines().then(data => {
        return res.json(data)
    }).catch(err=>{
        return res.status(404).send({'message': 'news api error'})
    })
}

