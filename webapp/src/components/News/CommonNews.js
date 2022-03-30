import React from 'react'
import { Box, Typography, Tooltip } from '@mui/material'
import SummaryButton from './SummaryButton'
import NewsSource from './NewsSource'

const MOCK_IMAGE = 'https://image.cnbcfm.com/api/v1/image/107037798-1648503081608-GettyImages-1205519775r.jpg?v=1648503136&w=740&h=416&ffmt=webp'

const CommonNews = (props) => {
  return (
    <Box sx={{
      width: 400,
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
        width: 75,
        transition: 'width 100ms'
      },
      backgroundColor: 'primary.white'
    }}>
      <Box
        className="commonNewsImage"
        component="img"
        src={MOCK_IMAGE}
        sx={{
          width: 150,
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
          >The bond market is flashing a warning sign a recession may be coming. Here’s why. Also this is very long so it should be truncated with elipsis and when it even more than 5 lines it should be truncated</Typography>
        </Box>
        <NewsSource alt={'ABC News'}/>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Tooltip title="Is this article helpful?" placement='top-start'>
            <Typography
              sx={{
                flex: 1,
                fontSize: '12px',
                color: 'seconary.black',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}
            >Helpful?</Typography>
          </Tooltip>
          <SummaryButton />
        </Box>

      </Box>

    </Box>
  )
}

export default CommonNews
