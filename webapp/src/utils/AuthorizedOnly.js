import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { checkSignin } from '../api/auth'
import PropTypes from 'prop-types'

const AuthorizedOnly = (props) => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState()
  console.log(`rendered loading = ${loading}, signin = ${isSignedIn}`)

  useEffect(() => {
    console.log('use effect')
    checkSignin().then(response => {
      console.log('signed in')
      setIsSignedIn(true)
      setLoading(false)
    }).catch(_ => {
      console.log('NOT signed in')
      setIsSignedIn(false)
      setLoading(false)
    })
  }, [loading])

  return (
    <Box>
      {
        loading && (
          <CircularProgress/>
        )
      }
      {
        loading === false && isSignedIn && (
          <props.Component {...props}/>
        )
      }
      {
        loading === false && isSignedIn === false && (
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
