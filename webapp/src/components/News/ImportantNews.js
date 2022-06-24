import React from 'react'
import { Box, Typography } from '@mui/material'
import NewsSource from './NewsSource'
// import SummaryButton from './SummaryButton'
import PropTypes from 'prop-types'

// const MOCK_URL = 'https://s.yimg.com/uu/api/res/1.2/umgx_Y8MT6e2Z0LvuwSMqw--~B/Zmk9c3RyaW07aD0zMjA7dz01NzA7YXBwaWQ9eXRhY2h5b24-/https://s.yimg.com/os/creatr-uploaded-images/2022-03/2b7bbc10-ac60-11ec-b498-7d6d499b02df.cf.webp'

const ImportantNews = (props) => {
  // const [openSummary, setOpenSummary] = useState(false)

  const openInNewTab = (url) => {
    window.open(url)
  }

  return (
    <Box
      sx={{
        ...props.sx,
        width: 300,
        height: 360,
        border: 1,
        borderColor: 'secondary.gray',
        backgroundColor: 'primary.white',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        ':hover': {
          cursor: 'pointer',
          boxShadow: 3
        },
        ':hover .stickerNewsImage': {
          height: 100,
          transition: 'height 100ms'
        },
        ':hover .stickerNewsTitle': {
          WebkitLineClamp: 5,
          height: 150,
          transition: 'height 100ms'
        }
      }}
      onClick={() => openInNewTab(props.url)}
    >
      <Box
        className="stickerNewsImage"
        sx={{
          width: 300,
          height: 200,
          objectFit: 'cover',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }}
        component={'img'}
        src={props.image_url} />

      <NewsSource alt={props.source} time={props.date}/>
      <Typography
        className="stickerNewsTitle"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          maxHeight: 150,
          fontSize: '15px',
          fontWeight: 'bold',
          margin: 2,
          ':hover': {
            textDecoration: 'underline'
          }
        }}
      >
        {props.title}
      </Typography>
    </Box>
  )
}

ImportantNews.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string.required,
  url: PropTypes.string.required,
  image_url: PropTypes.string.required,
  source: PropTypes.string.required,
  date: PropTypes.string
}

ImportantNews.defaultProps = {
}

export default ImportantNews
