import { React } from 'react'
import { Container, Box, Typography, Stack } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
// import PropTypes from 'prop-types'
// import stylesModule from './styles.module.css'

const MOCK_IMAGE = 'https://storage.googleapis.com/afs-prod/media/5377e0cfb7a7492198d9df86189ddfb6/800.jpeg'

const HeadlineNews = (props) => {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'row',
      border: 1,
      backgroundColor: 'primary.white',
      borderColor: 'secondary.gray',
      borderRadius: 3,
      ':hover': {
        cursor: 'pointer',
        boxShadow: 4
      },
      padding: 1,
      width: 'auto'
    }}>
      <Box sx={{
        borderRadius: 3,
        backgroundColor: 'red',
        width: 150,
        objectFit: 'cover'
      }} component="img" src={MOCK_IMAGE}/>
      <Stack sx={{ marginLeft: 1 }}>
        <Typography sx={{
          fontWeight: 'bold',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          maxWidth: 350,
          fontSize: '15px'
        }} gutterBottom >
          NATO leaders promise Zelenskyy more troops, Ukraine says it sank Russian warship Orsk. This headline should be very long and long long and it should exceed the limit
        </Typography>
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box>
            <Typography sx={{
              textAlign: 'right',
              backgroundColor: 'primary.darkGreen',
              color: 'white',
              borderRadius: 2,
              paddingLeft: 1,
              paddingRight: 1,
              fontSize: '14px'
            }}>ABC News</Typography>
            <Typography sx={{ flex: 1, color: 'secondary.black', fontSize: '12px' }}>30 minutes ago</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: 1
          }}>
            <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 2,
              // border: 1,
              borderColor: 'white',
              padding: 1,
              ':hover': {
                backgroundColor: 'secondary.lightGray'
              },
              ':active': {
                backgroundColor: 'secondary.gray',
                boxShadow: 3
              }
            }}>
              <ArticleIcon sx={{ color: 'secondary.black' }}/>
              <Typography sx={{ fontSize: '14px', color: 'secondary.black' }}>Summary</Typography>
            </Box>
          </Box>
        </Container>
      </Stack>
    </Container>
  )
}

HeadlineNews.propTypes = {

}

export default HeadlineNews
