const axios = require('axios')
const NEWS_API_URL = 'http://localhost:8000'

exports.todayHeadlines = () => {
    return axios.get(`${NEWS_API_URL}/news/headlines`).then(response => {
        var processedData = []
        for(const news of response.data.data){
            const {text, ...body} = news
            processedData.push(body)
        }
        response.data.data = processedData
        return response.data
    })
}

exports.newsByTerm = (term) => {
    return axios.get(`${NEWS_API_URL}/news/term/${term}`).then(response => {
        var processedData = []
        for(const news of response.data.data){
            const {text, ...body} = news
            processedData.push(body)
        }
        response.data.data = processedData
        return response.data
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