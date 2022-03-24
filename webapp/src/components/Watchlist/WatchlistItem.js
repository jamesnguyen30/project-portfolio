import { React } from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  AreaChart,
  Area,
  YAxis,
  ReferenceLine
} from 'recharts'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Container = styled(Box)(({ theme }) => ({
  borderRadius: theme.sizes.borderRadius.medium,
  ':hover': {
    backgroundColor: theme.palette.secondary.lightGray,
    cursor: 'pointer'
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.sizes.space.medium
}))

const WatchlistItem = (props) => {
  const getAverage = _.mean(props.data.map(x => x.close))
  console.log(getAverage)
  return (
    <Container>
      <div>
        <Typography style={{ fontWeight: 'bold' }}>AAPL</Typography>
        <Typography variant="subtitle1">$190.13</Typography>
      </div>
      <AreaChart width={120} height={60} data={props.data}>
        <defs>
          <linearGradient id={'areaColor'} x1='0' y1='0' x2='0' y2='1'>
            <stop offset="5%" stopColor="#43AA8B" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#43AA8B" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <YAxis width={0} axisLine={false} type="number"
        domain={['dataMin', 'dataMax']}/>
        <Area type="monotone" dataKey="close" stroke="#43AA8B" fill="url(#areaColor)" fillOpacity={1}/>
        <ReferenceLine y={getAverage} stroke={'#43AA8B'} strokeDasharray="3 3"></ReferenceLine>
      </AreaChart>
      <Box style={{ justifyContent: 'flex-end' }}>
        <Typography sx={{ color: 'primary.darkGreen', fontWeight: 'bold', textAlign: 'right' }}>+$999.9</Typography>
        <Typography variant="subtitle2" sx={{ color: 'primary.darkGreen', textAlign: 'right' }}>$99.9%</Typography>
      </Box>
    <Divider/>
    </Container>
  )
}

WatchlistItem.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.object,
  height: PropTypes.object
}

WatchlistItem.defaultValues = {
  data: [],
  width: 200,
  height: 100
}

export default WatchlistItem
