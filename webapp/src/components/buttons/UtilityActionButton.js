import React from 'react'

import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
// import AddRoundedIcon from '@mui/icons-material/AddRounded'

const UtilityActionButton = props => {
  return (
    <Box
      {...props}
      sx={{
        color: 'primary.white',
        backgroundColor: 'primary.darkPurple',
        paddingLeft: 2,
        paddingRight: (props.icon !== null) ? 1 : 2,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        ':hover': {
          boxShadow: 3,
          cursor: 'pointer'
        },
        ':active': {
          transform: 'translateY(3px)',
          transition: 'transform 50ms',
          boxShadow: 6
        },
        ...props.sx
      }}
    >
      <Typography sx={{ fontSize: '15px' }}>
        {props.text}
      </Typography>
      {
        props.icon !== null && (props.icon)
      }
    </Box>
  )
}

UtilityActionButton.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.object,
  text: PropTypes.string
}

UtilityActionButton.defaultProps = {
  text: 'Add',
  icon: null
}

export default UtilityActionButton
