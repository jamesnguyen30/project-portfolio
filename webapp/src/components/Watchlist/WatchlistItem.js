import { React } from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import UtilityActionButton from '../buttons/UtilityActionButton'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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
        marginLeft: 1,
        marginRight: 1,
        padding: 1
      }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
      }}>
        {
          props.change > 0 && (
            <ArrowDropUpIcon sx={{ color: 'primary.darkGreen' }}/>
          )
        }
        {
          props.change < 0 && (
            <ArrowDropDownIcon sx={{ color: 'primary.red' }}/>
          )
        }
        <Typography style={{
          fontWeight: 'bold',
          fontSize: '15px',
          flex: 1
        }}>{props.symbol}</Typography>
        <Typography sx={{
          fontSize: '15px',
          fontWeight: 'bold',
          color: props.change > 0 ? 'primary.darkGreen' : 'primary.red'
        }}>${Number.parseFloat(props.price).toFixed(2)}</Typography>
        <Typography sx={{
          marginLeft: 1,
          fontSize: '15px',
          color: props.change > 0 ? 'primary.darkGreen' : 'primary.red',
          textAlign: 'right'
        }}>{props.change > 0 ? '+' : '-'}${Math.abs(Number.parseFloat(props.change).toFixed(2))}</Typography>
        {
          props.editing && (
            <UtilityActionButton
              onClick={() => props.onRemove(props.symbol, props.description)}
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
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  editing: PropTypes.bool,
  onClick: PropTypes.func,
  onRemove: PropTypes.func
}

WatchlistItem.defaultValues = {
  editing: false
}

export default WatchlistItem
