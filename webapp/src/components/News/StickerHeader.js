import React from 'react'

import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import UtilityActionButton from '../buttons/UtilityActionButton'

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
            transform: props.change <= 0 ? 'translateY(5px)' : 'translateY(-5px)',
            transition: 'transform 100ms'
          }
        }}
      >
        {
          props.change <= 0 && (
            <ArrowDropDownIcon
            className="icon"
            fontSize="large"
            sx={{ color: 'primary.red' }}
            />
          )
        }
        {
          props.change > 0 && (
            <ArrowDropUpIcon
            className="icon"
            fontSize="large"
            sx={{ color: 'primary.red' }}
            />
          )
        }

        <Typography
          className="sticker"
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: 2
          }}
        >{props.assetFullname}</Typography>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 'bold',
            marginRight: 1,
            color: props.change > 0 ? 'primary.darkGreen' : 'primary.red'
          }}
        >${props.price}</Typography>
        <Typography
          sx={{
            fontSize: '15px',
            marginRight: 1,
            color: props.change > 0 ? 'primary.green' : 'secondary.red'
          }}
        >+${props.change} ({props.changePercent}%)</Typography>
      </Box>
      <UtilityActionButton
        onClick={() => props.onReadMoreClicked(props.assetFullname)}
      >More news about {props.assetFullname}</UtilityActionButton>

    </Box>
  )
}

StickerHeader.propTypes = {
  assetFullname: PropTypes.object,
  sticker: PropTypes.string,
  price: PropTypes.number,
  change: PropTypes.number,
  changePercent: PropTypes.number,
  onReadMoreClicked: PropTypes.func
}

StickerHeader.defaultProps = {
}

export default StickerHeader
