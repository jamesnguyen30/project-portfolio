import React from 'react'
import { Typography, Box } from '@mui/material'

const UnauthorizedErrorPage = () => {
  console.log('Error page rendered')
  return (
    <Box>
      <Typography>Unauthorized attempt!!</Typography>
    </Box>
  )
}

export default UnauthorizedErrorPage
