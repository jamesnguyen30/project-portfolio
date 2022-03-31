import React from 'react'

import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import UtilityActionButton from '../buttons/UtilityActionButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

const StickerHeader = (props) => {
  return (
    <Box sx={{
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
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
        <ArrowDropUpIcon
        className="icon"
        fontSize="large"
        sx={{ color: 'primary.darkGreen' }}
        />
        <Typography
          className="sticker"
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: 2
          }}
        >{props.assetFullname} ({props.sticker})</Typography>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 'bold',
            marginRight: 1,
            color: 'primary.darkGreen'
          }}
        >${props.price}</Typography>
        <Typography
          sx={{
            fontSize: '15px',
            marginRight: 1,
            color: 'primary.green'
          }}
        >+${props.change} (+99.9%)</Typography>
      </Box>
      <UtilityActionButton text={'Add to watch list'} icon={<AddRoundedIcon/>}/>

    </Box>
  )
}

StickerHeader.propTypes = {
  assetFullname: PropTypes.string.isRequired,
  sticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired
}

StickerHeader.defaultProps = {
}

export default StickerHeader
