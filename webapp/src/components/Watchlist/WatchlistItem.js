import { React } from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import UtilityActionButton from '../buttons/UtilityActionButton'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

// An item in watch list featured a daily stock chart
// @props [] data (required): daily data for a sticker to render chart

const WatchlistItem = (props) => {
  // Just a test variable for a straightline
  // Will use 52-week price instead in production
  return (
    <Box
      {...props}
      sx={{
        borderRadius: 3,
        ':hover':
        {
          backgroundColor: 'secondary.lightGray',
          cursor: 'pointer'
        },
        ':active': !props.editing
          ? {
              transform: 'translateY(3px)',
              transition: 'transform 100ms'
            }
          : {},
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 1,
        padding: 1
      }}>
      <Box sx={{
        paddingLeft: 2,
        paddingRight: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
      }}>
        <ArrowDropUpIcon sx={{ color: 'primary.darkGreen' }}/>
        <Typography style={{
          fontWeight: 'bold',
          fontSize: '15px',
          flex: 1
        }}>{props.symbol}</Typography>
        <Typography sx={{
          fontSize: '15px',
          fontWeight: 'bold',
          color: 'primary.green'
        }}>${props.price}</Typography>
        <Typography sx={{
          fontSize: '12px',
          color: 'primary.darkGreen',
          textAlign: 'right'
        }}>+ ${props.change}%</Typography>
        {
          props.editing && (
            <UtilityActionButton
              sx={{
                paddingLeft: 1,
                marginLeft: 1,
                color: 'primary.red',
                backgroundColor: 'transparent'
              }}
              icon={<DeleteForeverRoundedIcon sx={{ color: 'primary.red' }} />}
            />
          )
        }
      </Box>
    </Box>
  )
}

WatchlistItem.propTypes = {
  symbol: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  editing: PropTypes.bool,
  onClick: PropTypes.func
}

WatchlistItem.defaultValues = {
  editing: false
}

export default WatchlistItem
