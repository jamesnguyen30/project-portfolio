import React, { useState, useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@mui/material'
// import PropTypes from 'prop-types'
import ImportantNews from './ImportantNews'
// import CommonNews from './CommonNews'
import PropTypes from 'prop-types'

import { getNewsByTermAction } from '../../redux/actions/newsActions'
import { NEWS_FETCHED, NEWS_NOT_FETCHED } from '../../redux/actions'

import { useSelector, useDispatch } from 'react-redux'

// Render News according to received data
const WatchingNewsSection = (props) => {
  const [news, setNews] = useState()
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
      setNews(newsState.news)
      console.log(newsState.news)
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
        !loading && (
          <Grid container rowSpacing = {2} columnSpacing = {{ md: 2 }} sx={{ maxWidth: 'lg' }}>
            <Grid item md = {4}>
              <Box>
                <ImportantNews/>
              </Box>
              <Box>
                <ImportantNews/>
              </Box>
            </Grid>
            <Grid item md = {4}>
              <Box>
                <ImportantNews/>
              </Box>
              <Box>
                <ImportantNews/>
              </Box>
            </Grid>
            <Grid item md = {4}>
              <Box>
                <ImportantNews/>
              </Box>
              <Box>
                <ImportantNews/>
              </Box>
            </Grid>
          </Grid>
        )
      }
    </React.Fragment>
  )
}

WatchingNewsSection.propTypes = {
  term: PropTypes.string.isRequired
}

export default React.memo(WatchingNewsSection)
