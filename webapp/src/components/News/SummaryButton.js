import { React } from 'react'
import { Box, Typography } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'

// @props alt (required): string, in case logoUrl is null
// @props logoUrl: string, news logo URL (if available)
const SummaryButton = (props) => {
  return (
    <Box
    {...props}
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
        transform: 'translateY(3px)',
        transition: 'transform 50ms'
      }
    }}>
    <ArticleIcon sx={{ color: 'secondary.black' }} />
    <Typography sx={{ fontSize: '14px', color: 'secondary.black' }}>Summary</Typography>
  </Box>
  )
}

export default SummaryButton
