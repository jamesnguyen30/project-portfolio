import React from 'react'
import {
  Box, Typography, Stack
} from '@mui/material'
// import {
//   getCandleData
// } from '../../api/market'

import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import PropTypes from 'prop-types'

const CustomTooltip = ({ active, payload }) => {
  if (!active) return null
  const date = new Date(payload[0].payload.date * 1000)
  const dateString = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`

  return (
    <Box sx={{
      backgroundColor: 'primary.white',
      padding: 1,
      boxShadow: 3
    }}>
      <Stack direction="row" spacing={2}>
        <Typography>
          $ {Number(payload[0].payload.close).toFixed(2)}
        </Typography>
        <Typography>
          {dateString}
        </Typography>
      </Stack>
    </Box>
  )
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.objec
}
const axisXTickerFormatter = (tick) => {
  const date = new Date(tick * 1000)
  return `${date.getMonth() + 1}/${date.getDate() + 1}`
}

const axisYTickerFormatter = (tick) => {
  return Math.round(tick)
}

const DetailPriceChart = (props) => {
  console.log(props.data)

  return (
    <Box>
      <AreaChart width={450} height={250} data={props.data}>
        <CartesianGrid strokeDasharray={'4 4'} stroke="#eee"/>
        <linearGradient id={'areaColor'} x1='0' y1='0' x2='0' y2='1'>
          <stop offset="5%" stopColor="#43AA8B" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#43AA8B" stopOpacity={0.05} />
        </linearGradient>
        <XAxis axisLine={false} type="number" dataKey="date" tickFormatter={axisXTickerFormatter} tickCount={5} domain={['dateMin', 'dateMax']}/>
        <YAxis axisLine={false} type="number" tickFormatter={axisYTickerFormatter} domain={['auto', 'auto']}/>
        <Area type="monotone" dataKey="close" stroke="#43AA8B" fill="url(#areaColor)" fillOpacity={1} />
        <Tooltip content={<CustomTooltip/>} position={{ y: 255 }}/>
      </AreaChart>
    </Box>

  )
}

DetailPriceChart.propTypes = {
  data: PropTypes.func
}

export default React.memo(DetailPriceChart)
