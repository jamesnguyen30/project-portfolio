import React, { useState, useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@mui/material'
import UtilityActionButton from '../buttons/UtilityActionButton'
import ImportantNews from './ImportantNews'
import PropTypes from 'prop-types'

import { getNewsByTermAction } from '../../redux/actions/newsActions'
import { NEWS_FETCHED, NEWS_NOT_FETCHED } from '../../redux/actions'

import { useSelector, useDispatch } from 'react-redux'

// Render News according to received data
const WatchingNewsSection = (props) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const newsState = useSelector(state => state.newsReducer)
  const dispatch = useDispatch()

  console.log(props.term)

  useEffect(() => {
    if (newsState.type === null) {
      setLoading(true)
      setTimeout(() => {
        dispatch(getNewsByTermAction(props.term))
      }, 2000)
    } else if (newsState.type === NEWS_FETCHED) {
      setLoading(false)
      for (const newsObject of newsState.news) {
        if (newsObject.term === props.term) {
          setNews(newsObject.news)
          console.log(newsObject.news)
        }
      }
    } else if (newsState.type === NEWS_NOT_FETCHED) {
      // show error
      setLoading(false)
    } else {
      // show unknown error
      setLoading(false)
    }
  })

  return (
    <React.Fragment>
      {
        loading && (
          <CircularProgress />
        )
      }
      {
        !loading && news.length > 0 && (
          <Box sx ={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container rowSpacing = {3} sx={{ maxWidth: 'lg' }}>
              {
                news.slice(0, 6).map((item, index) => (
                  <Grid key={index} item xs = {4}>
                    <Box>
                      <ImportantNews
                        title={item.title}
                        image_url={item.image_url}
                        url={item.url}
                        source={item.source}
                      />
                    </Box>
                  </Grid>
                ))
              }
            </Grid>
            <Box sx={{ display: 'flex', width: '100%', margin: 3 }}>
              <UtilityActionButton sx= {{ backgroundColor: 'primary.main' }}>More news about {props.term}</UtilityActionButton>
            </Box>
          </Box>
        )
      }
    </React.Fragment>
  )
}

WatchingNewsSection.propTypes = {
  term: PropTypes.string.isRequired
}

export default React.memo(WatchingNewsSection)
