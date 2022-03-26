import { React } from 'react'
import { Box, Typography } from '@mui/material'
import NewsSource from './NewsSource'
import SummaryButton from './SummaryButton'

const MOCK_URL = 'https://s.yimg.com/uu/api/res/1.2/umgx_Y8MT6e2Z0LvuwSMqw--~B/Zmk9c3RyaW07aD0zMjA7dz01NzA7YXBwaWQ9eXRhY2h5b24-/https://s.yimg.com/os/creatr-uploaded-images/2022-03/2b7bbc10-ac60-11ec-b498-7d6d499b02df.cf.webp'

const StickerNews = () => {
  return (
    <Box
      sx={{
        width: 300,
        height: 350,
        border: 1,
        borderColor: 'secondary.gray',
        backgroundColor: 'primary.white',
        borderRadius: 3,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        ':hover': {
          cursor: 'pointer'
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
        src={MOCK_URL} />

      <NewsSource alt={'ABC news'} />
      <Typography
        className="stickerNewsTitle"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          maxHeight: '150',
          fontSize: '15px',
          fontWeight: 'bold',
          margin: 2
        }}
      >
        Mortgage rate soars closer to 5% in its second huge jump this week. This should be a very long title and it can take up to 3 lines. When it overflows it should be truncated with ellipsis
      </Typography>
      <Box sx={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 1
      }}>
        <Typography
        sx={{
          flex: 1,
          fontSize: '12px',
          color: 'seconary.black',
          ':hover': {
            textDecoration: 'underline'
          }
        }}
        >Helpful</Typography>
        <SummaryButton />
      </Box>
    </Box>

  )
}

export default StickerNews
