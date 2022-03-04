import React from 'react'
import { Typography, Box, Link } from '@mui/material'
import { styled } from '@mui/system'
import PropTypes from 'prop-types'

const Item = styled(Typography)`
  color: white;
  &:hover { 
    border-bottom: 5px solid white;
    cursor: pointer;
  }
`

const NavItem = (props) => {
  const { text, to } = props
  return (
    <Box sx={{ backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Item variant='body1' component={Link} href={to} underline="none">{text}</Item>
    </Box>
  )
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default NavItem
