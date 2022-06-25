import React from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

// Utility button component
// @props
// icon: component, pass to props like icon ={<Icon/>}
// children: component, Should be text

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
      {
        props.preIcon && (props.preIcon)
      }
      <Typography sx={{ fontSize: '15px' }}>
        {props.children}
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
  preIcon: PropTypes.object,
  children: PropTypes.string
}

UtilityActionButton.defaultProps = {
  text: 'Add',
  preIcon: null,
  icon: null
}

export default UtilityActionButton
