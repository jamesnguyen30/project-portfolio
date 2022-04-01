// import NavBar from "./components/nav/Nav";
import React, { useEffect, useState } from 'react'
import {
  Divider, Typography, Box, Drawer,
  List, Stack
} from '@mui/material'
import NewsPage from '../News/NewsPage'
import data from '../../model/mock/aapl'
import WatchlistItem from '../../components/Watchlist/WatchlistItem'
import UtilityActionButton from '../../components/buttons/UtilityActionButton'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_SIGNED_IN, SIGNED_IN } from '../../redux/actions/index'
import { checkSignInAction } from '../../redux/actions/authActions'

let mockData = data.map(x => ({ date: x.date, close: x.close }))
mockData = mockData.slice(0, 30)

const drawerWidth = 300
const logoHeight = 80

const Home = props => {
  const [page] = useState(0)

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const authState = useSelector(state => state.authReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (authState.type === null) {
      dispatch(checkSignInAction())
    } else if (authState.type === SIGNED_IN) {
      setCheckingAuth(false)
      setIsSignedIn(true)
    } else if (authState.type === NOT_SIGNED_IN) {
      setCheckingAuth(false)
      setIsSignedIn(false)
    }
  }, [authState])

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
            <UtilityActionButton
            text={'Edit'}
            />
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

      {page === 0 && <NewsPage drawerWidth={drawerWidth} isCheckingAuth={checkingAuth} isSignedIn={isSignedIn}/>}
      {page === 2 && <div><Typography>Watchlist page in progress</Typography></div>}
      {page === 3 && <div><Typography>Settings page in progress</Typography></div>}
    </Box>
  )
}

Home.propTypes = {

}

export default Home
