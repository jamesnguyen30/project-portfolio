import React, { useState } from 'react'
import {
  Divider, Typography, Box, CircularProgress
} from '@mui/material'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'
import HeadlineSection from '../../components/News/HeadlineSection'
import WatchingNewsSection from '../../components/News/WatchingNewsSection'
import StickerHeader from '../../components/News/StickerHeader'
import DetailWatchingNews from '../../components/News/DetailWatchingNews'
import AppBar from '../../components/AppBar/AppBar'

import {
  useSelector
} from 'react-redux'
import { getNewsByTerm } from '../../api/news'

const NewsPage = (props) => {
  const { drawerWidth } = props

  const watchlistState = useSelector(state => state.watchlistReducer)

  const [term, setTerm] = useState()
  const [headlinePage, setHeadlinePage] = useState(true)
  const [detailPage, setDetailPage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])

  const goToDetailPage = (term) => {
    setDetailPage(true)
    setHeadlinePage(false)
    setTerm(term)
  }

  const goToHeadlinePage = () => {
    setDetailPage(false)
    setHeadlinePage(true)
    setTerm(null)
  }

  if (loading) {
    const terms = []
    for (const watchlist of watchlistState.watchlist) {
      terms.push(watchlist.name.description)
    }
    const newsData = {}
    if (terms.length > 0) {
      getNewsByTerm(terms.join(','), 10).then(response => {
        for (const n of response.data.data) {
          if ((n.search_term in newsData) === false) {
            newsData[n.search_term] = []
          }
          newsData[n.search_term].push(n)
        }
        setNews(newsData)
        setLoading(false)
      })
    }
  }

  const findSticker = (description) => {
    for (const watchlist of watchlistState.watchlist) {
      if (watchlist.name.description.toLowerCase() === description.toLowerCase()) {
        return watchlist
      }
    }
    return null
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', width: `calc(100% - ${drawerWidth}px)` }}>
      <AppBar drawerWidth={drawerWidth} {...props} onHeadlineClicked={goToHeadlinePage}/>

      <ContentBody open={true} marginTop={65} style={{ flex: 1 }}>
        {
          headlinePage && (
            <React.Fragment>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Headlines</Typography>
              <Divider />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <HeadlineSection />
              </Box>
              {
                loading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>

                )
              }
              {
                !loading && Object.keys(news).map((description, index) => {
                  const sticker = findSticker(description)
                  return (
                    <Box key ={index} sx={{ marginTop: 1 }}>
                      <Divider />
                      <StickerHeader full assetFullname={sticker.name.description} symbol = {sticker.name.symbol}
                      price = {sticker.c} change = {sticker.d} changePercent={sticker.dp} onReadMoreClicked={goToDetailPage}/>
                      <WatchingNewsSection news={news[description]} onReadMoreClicked = {goToDetailPage}/>
                    </Box>
                  )
                })
              }
            </React.Fragment>
          )
        }
        {
          detailPage && (
            <DetailWatchingNews term={term} onBackToHeadline={goToHeadlinePage}/>
          )
        }
      </ContentBody>
    </Box>
  )
}

NewsPage.propTypes = {
  drawerWidth: PropTypes.number,
  isCheckingAuth: PropTypes.bool,
  isSignedIn: PropTypes.bool
}

NewsPage.defaultProps = {
  drawerWidth: 250,
  isCheckingAuth: false,
  isSignedIn: false
}

export default React.memo(NewsPage)
