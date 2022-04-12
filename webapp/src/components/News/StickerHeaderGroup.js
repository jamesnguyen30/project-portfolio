import React from 'react'

import { Box, Typography, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
// import UtilityActionButton from '../buttons/UtilityActionButton'
// import AddRoundedIcon from '@mui/icons-material/AddRounded'

const StickerHeaderGroup = (props) => {
  return (
    <Box sx={{
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Stack direction={'row'} spacing={2}>
        {/* Just a place holder */}
        {
          [1, 2, 3, 4].map(x => (
            <Box
              key={x}
              sx={{
                ':hover': {
                  cursor: 'pointer'
                },
                ':hover .sticker': {
                  textDecoration: 'underline'
                },
                ':active .icon': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 100ms'
                }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  className='sticker'
                  sx={{
                    fontSize: '15px',
                    fontWeight: 'bold'
                  }}
                >AAPL</Typography>
                <ArrowDropUpIcon
                  className="icon"
                  sx={{ color: 'primary.darkGreen' }} />
              </Box>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: 'primary.darkGreen'
                }}
              >$999.9</Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: 'primary.darkGreen'
                }}
              >+99.9%</Typography>
            </Box>

          ))
        }
      </Stack>
    </Box>
  )
}

StickerHeaderGroup.propTypes = {
  assetFullname: PropTypes.string
}

StickerHeaderGroup.defaultProps = {
  full: false
}

export default StickerHeaderGroup
