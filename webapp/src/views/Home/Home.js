// import NavBar from "./components/nav/Nav";
import React, { useState } from 'react'
import {
  Divider, Typography, Box, Drawer,
  List, Stack
} from '@mui/material'
import NewsPage from '../News/NewsPage'
import data from '../../model/mock/aapl'
import WatchlistItem from '../../components/Watchlist/WatchlistItem'

let mockData = data.map(x => ({ date: x.date, close: x.close }))
mockData = mockData.slice(0, 30)

const drawerWidth = 300
const logoHeight = 80

const Home = () => {
  const [page] = useState(0)
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'secondary.white' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >

        <Box sx={{
          height: logoHeight,
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
            marginLeft: '20px',
            marginRight: '20px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Typography
            variant={'h6'}
            sx={{
              fontWeight: 'bold',
              flex: 1
            }}>Watchlist</Typography>
          <Box sx={{
            textAlign: 'right',
            padding: 1,
            borderRadius: 3,
            ':hover': {
              cursor: 'pointer',
              backgroundColor: 'primary.darkGreen',
              color: 'primary.white',
              boxShadow: 3
            },
            ':active': {
              transform: 'translateY(3px)',
              transition: 'transform 50ms',
              boxShadow: 6
            }
          }}>
            <Typography>Edit</Typography>
          </Box>
        </Stack>
        <List>
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
          <WatchlistItem data={mockData} />
        </List>
        <Divider />
      </Drawer>

      {page === 0 && <NewsPage drawerWidth={drawerWidth} />}
      {page === 2 && <div><Typography>Watchlist page in progress</Typography></div>}
      {page === 3 && <div><Typography>Settings page in progress</Typography></div>}
    </Box>
  )
}

export default Home
