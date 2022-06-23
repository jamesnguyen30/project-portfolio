import React, { useState } from 'react'
import {
  Typography,
  CircularProgress
} from '@mui/material'
// import UtilityActionButton from '../buttons/UtilityActionButton'
// import ImportantNews from './ImportantNews'
// import { getNewsByTermAction } from '../../redux/actions/newsActions'
// import { NEWS_FETCHED, NEWS_NOT_FETCHED } from '../../redux/actions'
// import { useSelector } from 'react-redux'
import { getNewsByTerm } from '../../api/news'
import CommonNews from './CommonNews'

import PropTypes from 'prop-types'

const DetailWatchingNews = (props) => {
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])

  if (loading) {
    getNewsByTerm(props.term).then(response => {
      setNews(response.data)
      setLoading(false)
    })
  }

  return (
    <React.Fragment>
      <Typography>Detail Watching News</Typography>
      {
        loading && (
          <CircularProgress/>
        )
      }
      {
        !loading && news.map((item, index) => (
          <CommonNews
            key = {index}
            title = {item.title}
            image_url = {item.image_url}
          />
        ))
      }
    </React.Fragment>
  )
}

DetailWatchingNews.propTypes = {
  term: PropTypes.string.isRequired
}

export default React.memo(DetailWatchingNews)
