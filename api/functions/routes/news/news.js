const {
    todayHeadlines
} = require('../../lib/newsApi')

exports.todayHeadlines = (req,res) => {
    todayHeadlines().then(data => {
        console.log(data)
        return res.json(data)
    }).catch(err=>{
        console.log(err)
        return res.send("oops")
    })
}

