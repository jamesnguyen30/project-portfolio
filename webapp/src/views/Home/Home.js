import React, { useEffect, useState } from 'react'
import {
  Typography, Box
} from '@mui/material'
import NewsPage from '../News/NewsPage'
import WatchlistDrawer from '../../components/Watchlist/WatchlistDrawer'
import { useSelector, useDispatch } from 'react-redux'
import {
  NOT_SIGNED_IN,
  SIGNED_IN,
  PROFILE_FETCHED,
  PROFILE_NOT_FETCHED,
  WATCHLIST_FETCHED,
  WATCHLIST_NOT_FETCHED
} from '../../redux/actions/index'
import { getProfileAction } from '../../redux/actions/profileActions'
import { setAuthAction } from '../../redux/actions/authActions'
import { auth } from '../../api/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { saveIdToken } from '../../utils/storage'
import { getWatchlistAction, resetWatchlistState } from '../../redux/actions/watchlistActions'

const drawerWidth = 300
const logoHeight = 80

const Home = props => {
  const [page] = useState(0)

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const authState = useSelector(state => state.authReducer)
  const profileState = useSelector(state => state.profileReducer)
  const watchlistState = useSelector(state => state.watchlistReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    // observe auth state
    const unsubcribe = onAuthStateChanged(auth, user => {
      if (user) {
        saveIdToken(user.accessToken)
        if (authState.type === null || authState.type !== SIGNED_IN) {
          setCheckingAuth(false)
          setIsSignedIn(true)
          dispatch(setAuthAction(user))
        }
        if (profileState.type === null || profileState.type !== PROFILE_FETCHED) {
          dispatch(getProfileAction(user))
        }
        if (watchlistState.type === null || watchlistState.type !== WATCHLIST_FETCHED) {
          console.log('dispatch watchlist action')
          dispatch(getWatchlistAction())
        }
      } else {
        if (authState.type === null || authState.type !== NOT_SIGNED_IN) {
          // user not logged in
          setCheckingAuth(false)
          setIsSignedIn(false)
          dispatch(setAuthAction(user))
        }
        if (profileState.type === null || authState.type !== PROFILE_NOT_FETCHED) {
          dispatch(getProfileAction(user))
        }

        if (watchlistState.type === null || watchlistState.type !== WATCHLIST_NOT_FETCHED) {
          dispatch(resetWatchlistState())
        }
      }
    })
    return function cleanup () {
      unsubcribe()
    }
  }, [authState])

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'secondary.white' }}>
      <WatchlistDrawer drawerWidth={drawerWidth} logoHeight={logoHeight} />
      {page === 0 && <NewsPage drawerWidth={drawerWidth} isCheckingAuth={checkingAuth} isSignedIn={isSignedIn} />}
      {page === 2 && <div><Typography>Watchlist page in progress</Typography></div>}
      {page === 3 && <div><Typography>Settings page in progress</Typography></div>}
    </Box>
  )
}

Home.propTypes = {
}

export default Home
