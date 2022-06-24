import React from 'react'
import { Box, Typography } from '@mui/material'
import NewsSource from './NewsSource'
import PropTypes from 'prop-types'

// const MOCK_IMAGE = 'https://image.cnbcfm.com/api/v1/image/107037798-1648503081608-GettyImages-1205519775r.jpg?v=1648503136&w=740&h=416&ffmt=webp'

const CommonNews = (props) => {
  const openInNewTab = (url) => {
    window.open(url)
  }
  return (
    <Box sx={{
      width: 600,
      height: 180,
      border: 1,
      borderColor: 'secondary.gray',
      borderRadius: 3,
      flowDirection: 'row',
      display: 'flex',
      ':hover': {
        cursor: 'pointer',
        boxShadow: 3
      },
      ':hover .commonNewsTitle': {
        WebkitLineClamp: 4,
        maxHeight: '300'
      },
      ':hover .commonNewsImage': {
        width: 250,
        transition: 'width 100ms'
      },
      backgroundColor: 'primary.white'
    }}
    onClick={() => openInNewTab(props.url)}
    >

      <Box
        className="commonNewsImage"
        component="img"
        src={props.image_url}
        sx={{
          width: 300,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          objectFit: 'cover'
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, margin: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            className="commonNewsTitle"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              maxHeight: '150',
              fontSize: '15px',
              fontWeight: 'bold'
            }}
          >{props.title}</Typography>
        </Box>
        <NewsSource alt={props.source} time ={props.time}/>
      </Box>

    </Box>
  )
}

CommonNews.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string.required,
  url: PropTypes.string.required,
  image_url: PropTypes.string.required,
  source: PropTypes.string.required,
  sentiment: PropTypes.string,
  summary: PropTypes.string,
  time: PropTypes.string
}

export default CommonNews
