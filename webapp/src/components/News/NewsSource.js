import { React } from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

// @props alt (required): string, in case logoUrl is null
// @props logoUrl: string, news logo URL (if available)
const NewsSource = (props) => {
  return (
    <Box sx={{
      marginLeft: 1,
      marginRight: 1,
      paddingLeft: 1,
      paddingRight: 1,
      display: 'flex',
      flexDirection: 'row',
      maxHeight: 25,
      alignItems: 'center'
    }}>
      <Typography sx={{ flex: 1 }}>{props.alt}</Typography>

        <Typography
          sx={{
            flex: 1,
            color: 'secondary.black',
            fontSize: '12px',
            textAlign: 'right'
          }}>
          30 minutes ago
        </Typography>
    </Box>
  )
}

NewsSource.propTypes = {
  alt: PropTypes.string.isRequired,
  logoUrl: PropTypes.string
}

export default NewsSource
