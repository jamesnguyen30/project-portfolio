import React, { useState } from 'react'
import {
  Divider, Typography, Box, Drawer,
  List, Stack
} from '@mui/material'
import data from '../../model/mock/aapl'
import WatchlistItem from './WatchlistItem'
import UtilityActionButton from '../../components/buttons/UtilityActionButton'
import PropTypes from 'prop-types'
import SecondaryDrawer from '../../components/Watchlist/SecondaryDrawer'

let mockData = data.map(x => ({ date: x.date, close: x.close }))
mockData = mockData.slice(0, 30)

const WatchlistDrawer = props => {
  const [openSecondary, setOpenSecondary] = useState(false)

  const openDrawer = () => {
    console.log('clicked openDrawer')
    setOpenSecondary(true)
  }
  return (
    <Drawer
      sx={{
        display: 'flex',
        width: props.drawerWidth,
        flexDirection: 'row',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: props.drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <SecondaryDrawer
        drawerWidth={props.drawerWidth}
        logoHeight={props.logoHeight}
        show={openSecondary}
        onClose={() => setOpenSecondary(false)} />

      <Box sx={{
        backgroundColor: 'primary.white',
        flex: 1,
        zIndex: 1
      }}>
        <Box sx={{
          height: props.logoHeight,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h3">LOGO</Typography>
        </Box>

        <Stack
          direction="row"
          sx={{
            marginLeft: 2,
            marginRight: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
          <Typography
            variant={'h6'}
            sx={{
              fontWeight: 'bold',
              flex: 1
            }}>Watchlist</Typography>
          <UtilityActionButton
            onClick={openDrawer}
          >Edit</UtilityActionButton>
        </Stack>
        <List sx={{ backgroundColor: 'primary.white' }}>
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
        </List>
        <Divider />

      </Box>

    </Drawer>
  )
}

WatchlistDrawer.propTypes = {
  drawerWidth: PropTypes.number,
  logoHeight: PropTypes.number
}

export default WatchlistDrawer
