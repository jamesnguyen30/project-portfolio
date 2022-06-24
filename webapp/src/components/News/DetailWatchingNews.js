import React, { useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Pagination
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
      {
        loading && (
          <CircularProgress/>
        )
      }
      <Typography>Showing {news.length} news </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Stack spacing={3}>
          {
            !loading && news.slice(0, 10).map((item, index) => {
              const dateObj = new Date(Date.parse(item.date))
              // const dateStr = `${dateObj.getMonth()}.${dateObj.getDay()}.${dateObj.getFullYear()}`
              const dateStr = dateObj.toDateString()

              return (
              <CommonNews
                key = {index}
                title = {item.title}
                image_url = {item.image_url}
                source = {item.source}
                time = {dateStr}
              />
              )
            })
          }
        </Stack>
        <Pagination count = {5} sx ={{ padding: 5 }}/>
      </Box>

    </React.Fragment>
  )
}

DetailWatchingNews.propTypes = {
  term: PropTypes.string.isRequired
}

export default React.memo(DetailWatchingNews)
