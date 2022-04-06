import { React } from 'react'
import { Box, Typography, Divider } from '@mui/material'
import {
  AreaChart,
  Area,
  YAxis,
  ReferenceLine
} from 'recharts'
import _ from 'lodash'
import PropTypes from 'prop-types'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import UtilityActionButton from '../buttons/UtilityActionButton'

// An item in watch list featured a daily stock chart
// @props [] data (required): daily data for a sticker to render chart

const WatchlistItem = (props) => {
  // Just a test variable for a straightline
  // Will use 52-week price instead in production
  const getAverage = _.mean(props.data.map(x => x.close))
  return (
    <Box
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1
      }}>
      {
        props.editing && (
          <UtilityActionButton
            sx={{
              padding: 1,
              marginRight: 1,
              color: 'primary.red',
              backgroundColor: 'transparent'
            }}
            icon={<DeleteForeverRoundedIcon sx={{ color: 'primary.red' }} />}
          />
        )
      }
      <Box sx={{ flex: props.editing ? 1 : 0 }}>
        <Typography style={{ fontWeight: 'bold' }}>AAPL {props.index}</Typography>
        <Typography variant="subtitle1">$190.13</Typography>
      </Box>
      {
        !props.editing && (
          <AreaChart width={120} height={60} data={props.data}>
            <defs>
              <linearGradient id={'areaColor'} x1='0' y1='0' x2='0' y2='1'>
                <stop offset="5%" stopColor="#43AA8B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#43AA8B" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <YAxis width={0} axisLine={false} type="number"
              domain={['dataMin', 'dataMax']} />
            <Area type="monotone" dataKey="close" stroke="#43AA8B" fill="url(#areaColor)" fillOpacity={1} />
            <ReferenceLine y={getAverage} stroke={'#43AA8B'} strokeDasharray="3 3"></ReferenceLine>
          </AreaChart>

        )
      }
      <Box style={{ justifyContent: 'flex-end' }}>
        <Typography sx={{ color: 'primary.darkGreen', fontWeight: 'bold', textAlign: 'right' }}>+$999.9</Typography>
        <Typography variant="subtitle2" sx={{ color: 'primary.darkGreen', textAlign: 'right' }}>$99.9%</Typography>
      </Box>
      {
        props.editing && (
          <Box
            sx={{
              padding: 1,
              marginLeft: 1,
              color: 'primary.black',
              backgroundColor: 'transparent'
            }}>
              <MenuRoundedIcon/>
            </Box>
        )
      }
      <Divider />
    </Box>
  )
}

WatchlistItem.propTypes = {
  data: PropTypes.object.isRequired,
  editing: PropTypes.bool,
  // Testing purpose
  index: PropTypes.number

}

WatchlistItem.defaultValues = {
  data: [],
  editing: false
}

export default WatchlistItem
