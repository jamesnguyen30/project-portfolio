import React from 'react'
import {
  Divider, Typography, Box
} from '@mui/material'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'
import HeadlineSection from '../../components/News/HeadlineSection'
import WatchingNewsSection from '../../components/News/WatchingNewsSection'
import StickerHeader from '../../components/News/StickerHeader'
import AppBar from '../../components/AppBar/AppBar'

const mockSticker =
  {
    assetFullname: 'APPLE, Inc',
    sticker: 'AAPL',
    price: 1313.9,
    change: 1.9
  }

const NewsPage = (props) => {
  const { drawerWidth } = props

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', width: `calc(100% - ${drawerWidth}px)` }}>
      <AppBar drawerWidth={drawerWidth} {...props}/>

      <ContentBody open={true} marginTop={65} style={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Headlines</Typography>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <HeadlineSection />
        </Box>

        <StickerHeader full {...mockSticker}/>

        <Divider />
        <Box sx={{ marginTop: 1 }}>
          <WatchingNewsSection />
        </Box>
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

export default NewsPage
