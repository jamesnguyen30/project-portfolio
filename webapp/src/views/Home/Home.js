import React, { useEffect, useState } from 'react'
import {
  Typography, Box
} from '@mui/material'
import NewsPage from '../News/NewsPage'
import WatchlistDrawer from '../../components/Watchlist/WatchlistDrawer'
// import SecondaryDrawer from '../../components/Watchlist/SecondaryDrawer'
import { useSelector, useDispatch } from 'react-redux'
import { NOT_SIGNED_IN, SIGNED_IN } from '../../redux/actions/index'
import { checkSignInAction } from '../../redux/actions/authActions'

const drawerWidth = 300
const logoHeight = 80

const Home = props => {
  const [page] = useState(0)

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const authState = useSelector(state => state.authReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Checking sign in ')
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
      <WatchlistDrawer drawerWidth={drawerWidth} logoHeight={logoHeight}/>
      {page === 0 && <NewsPage drawerWidth={drawerWidth} isCheckingAuth={checkingAuth} isSignedIn={isSignedIn}/>}
      {page === 2 && <div><Typography>Watchlist page in progress</Typography></div>}
      {page === 3 && <div><Typography>Settings page in progress</Typography></div>}
    </Box>
  )
}

Home.propTypes = {

}

export default Home
