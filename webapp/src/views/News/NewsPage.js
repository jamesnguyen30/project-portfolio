import React, { useState } from 'react'
import {
  Divider, Typography, Box
} from '@mui/material'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'
import HeadlineSection from '../../components/News/HeadlineSection'
import WatchingNewsSection from '../../components/News/WatchingNewsSection'
import DetailWatchingNews from '../../components/News/DetailWatchingNews'
import StickerHeader from '../../components/News/StickerHeader'
import AppBar from '../../components/AppBar/AppBar'

import {
  useSelector
} from 'react-redux'

const NewsPage = (props) => {
  const { drawerWidth } = props

  const watchlistState = useSelector(state => state.watchlistReducer)

  const [term, setTerm] = useState()
  const [headlinePage, setHeadlinePage] = useState(true)
  const [detailPage, setDetailPage] = useState(false)

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
                watchlistState.watchlist.map((item, index) => {
                  console.log(item)
                  return (
                    <Box key ={index} sx={{ marginTop: 1 }}>
                      <Divider />
                      <StickerHeader full assetFullname={item.name.description} symbol = {item.name.symbol} price = {item.c} change = {item.d} changePercent={item.dp}/>
                      <WatchingNewsSection term={item.name.description} onReadMoreClicked = {goToDetailPage}/>
                    </Box>
                  )
                })
              }
            </React.Fragment>
          )
        }
        {
          detailPage && (
            <DetailWatchingNews term={term} />
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
