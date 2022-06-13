const axios = require('axios')
const NEWS_API_URL = 'http://localhost:8000'

exports.todayHeadlines = () => {
    return axios.get(`${NEWS_API_URL}/news/headlines`).then(data => {
        return data.data
    })
}

exports.checkHealth = () => {
    return axios.get(`${NEWS_API_URL}/news/headlines`).then(data => {
        if (data.data.mesasge == "healhty"){
            return true
        }
    }).catch(e => {
        console.log(e)
        return false
    })
}