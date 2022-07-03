const axios = require("axios");
const NEWS_API_URL = "https://fathomless-scrubland-10072.herokuapp.com";

exports.todayHeadlines = () => {
  return axios.get(`${NEWS_API_URL}/news/headlines`).then((response) => {
    const processedData = [];
    for (const news of response.data.data) {
      const {text, ...body} = news;
      console.log(text);
      processedData.push(body);
    }
    response.data.data = processedData;
    return response.data;
  });
};

exports.newsByTerm = (term, limit, page) => {
  return axios.get(`${NEWS_API_URL}/news/term/`,
      {params: {term: term, limit: limit, page: page}}).then((response) => {
    const processedData = [];
    for (const news of response.data.data) {
      const {text, ...body} = news;
      console.log(text);
      processedData.push(body);
    }
    response.data.data = processedData;
    return response.data;
  });
};

exports.checkHealth = () => {
  return axios.get(`${NEWS_API_URL}/news/headlines`).then((data) => {
    if (data.data.mesasge == "healhty") {
      return true;
    }
  }).catch((e) => {
    console.log(e);
    return false;
  });
};
