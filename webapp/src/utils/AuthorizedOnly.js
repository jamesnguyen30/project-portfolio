import React from 'react'
import { Box } from '@mui/material'
import { checkSignin } from '../api/auth'
import PropTypes from 'prop-types'

const AuthorizedOnly = (props) => {
  let isSignedIn = false

  checkSignin().then(response => {
    isSignedIn = true
  }).catch(_ => {
    isSignedIn = false
  })

  return (
    <Box>
      {
        isSignedIn && (
          <props.Component {...props}/>
        )
      }
      {
        isSignedIn === false && (
          <props.ErrorComponent {...props}/>
        )
      }
    </Box>
  )
}

AuthorizedOnly.propTypes = {
  Component: PropTypes.func,
  ErrorComponent: PropTypes.func
}

export default AuthorizedOnly
