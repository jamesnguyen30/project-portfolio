import React, { useState, useRef, useEffect } from 'react'
import {
  Divider, Typography, Box, Drawer,
  List, Stack, Collapse, CircularProgress
} from '@mui/material'
import WatchlistItem from './WatchlistItem'
import UtilityActionButton from '../../components/buttons/UtilityActionButton'
import PropTypes from 'prop-types'
import LookupSymbolDrawer from './LookupSymbolDrawer'
import CompanyInformationDrawer from './CompanyInformationDrawer'
import { TransitionGroup } from 'react-transition-group'
import DraggableY from '../../utils/Draggable/DraggableY'
import { useSelector, useDispatch } from 'react-redux'
import {
  // getWatchlistAction,
  addWatchlistAction,
  removeWatchlistAction,
  getWatchlistAction
} from '../../redux/actions/watchlistActions'
import {
  WATCHLIST_FETCHED,
  WATCHLIST_FETCH_FAILED,
  WATCHLIST_UPDATED,
  WATCHLIST_UPDATE_FAILED
} from '../../redux/actions'

const defaultStickers = [
  { name: { description: 'Apple', symbol: 'AAPL' }, c: 199.99, d: 0.99 },
  { name: { description: 'Amazon', symbol: 'AMZN' }, c: 199.99, d: 0.99 },
  { name: { description: 'Google', symbol: 'GOOGL' }, c: 199.99, d: 0.99 }
]

// name(pin):"AAPL"
// c(pin):170.09
// d(pin):-2.05
// dp(pin):-1.1909
// h(pin):171.77
// l(pin):169.22
// o(pin):171.78
// pc(pin):172.14
// t(pin):1649448004

const WatchlistDrawer = props => {
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showingCompany, setShowingCompany] = useState(false)
  const [stickers, setStickers] = useState(defaultStickers)
  const [errorMessage, setErrorMessage] = useState(null)
  const drawerRef = useRef()
  const listRef = useRef()

  const watchlistState = useSelector(state => state.watchlistReducer)
  const dispatch = useDispatch()

  const startEditing = () => {
    setEditing(true)
  }

  const stopEditing = () => {
    setEditing(false)
  }

  const onAddNewSticker = (symbol, description) => {
    console.log(symbol, description)
    const result = stickers.find(x => x.name.symbol === symbol)
    if (result === undefined) {
      dispatch(addWatchlistAction(symbol, description))
    }
  }

  const onRemovedSticker = (symbol, description) => {
    console.log('removing ')
    const result = stickers.find(x => x.name.symbol === symbol)
    if (result !== undefined) {
      console.log('hit api')
      dispatch(removeWatchlistAction(symbol, description))
    }
  }

  const onShowCompanyDrawer = () => {
    console.log(showingCompany)
    setShowingCompany(true)
  }

  const onCloseCompanyDrawer = () => {
    setShowingCompany(false)
  }

  const changeIndex = (oldIdx, newIdx) => {
    const toInsert = stickers[oldIdx]
    stickers.splice(oldIdx, 1)
    stickers.splice(newIdx, 0, toInsert)
    console.log(stickers)
    setStickers([...stickers])
  }

  useEffect(() => {
    setLoading(true)
    if (watchlistState.type === WATCHLIST_UPDATED) {
      dispatch(getWatchlistAction())
    } else if (watchlistState.type === WATCHLIST_FETCHED) {
      console.log('Setting stickers')
      setStickers(watchlistState.watchlist)
      setErrorMessage(null)
      setLoading(false)
    } else if (watchlistState.type === WATCHLIST_FETCH_FAILED) {
      setStickers(defaultStickers)
      setErrorMessage('Oops! error while fetching watchlist')
      setLoading(false)
    } else if (watchlistState.type === WATCHLIST_UPDATE_FAILED) {
      console.error('update watchlist failed')
      setErrorMessage('Oops! error while updating watchlist')
      setLoading(false)
    }
  }, [watchlistState])

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

      <LookupSymbolDrawer
        drawerWidth={props.drawerWidth}
        logoHeight={props.logoHeight}
        show={editing}
        onClose={stopEditing}
        handleAdd={onAddNewSticker}
        onShowCompanyDrawer={onShowCompanyDrawer}
      />

      <CompanyInformationDrawer
        drawerWidth={props.drawerWidth}
        logoHeight={props.logoHeight}
        show={showingCompany}
        onClose={onCloseCompanyDrawer}
      />

      <Box
        ref={drawerRef}
        sx={{
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
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              flex: 1
            }}>Watchlist</Typography>
          <UtilityActionButton
            onClick={editing ? stopEditing : startEditing}
          >{editing ? 'Done' : 'Edit'}</UtilityActionButton>
        </Stack>

        {
          errorMessage && (
            <Box sx={{
              marginLeft: 2,
              marginRight: 2
            }}>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: 'primary.red'
                }}
              >
                {
                  errorMessage
                }
              </Typography>
            </Box>
          )
        }

        {
          loading && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <CircularProgress sx={{ color: 'primary.purple' }} />
              <Typography>Loading ... </Typography>

            </Box>

          )

        }
        <List
          sx={{ backgroundColor: 'primary.white' }}
          ref={listRef}
        >
          <TransitionGroup>
            {
              stickers.map((data, index) => (
                <Collapse key={index}>
                  {
                    !editing && (
                      <WatchlistItem
                        symbol={data.name.symbol}
                        description={data.name.description}
                        price={data.c}
                        change={data.d}
                        editing={editing}
                        onClick={onShowCompanyDrawer} />
                    )
                  }
                  {
                    editing && (
                      <DraggableY
                        parentRef={drawerRef}
                        listRef={listRef}
                        index={index}
                        changeIndex={changeIndex}>
                        <WatchlistItem
                          symbol={data.name.symbol}
                          description={data.name.description}
                          price={data.c}
                          change={data.d}
                          data={data}
                          index={index}
                          onRemove={onRemovedSticker}
                          editing={editing} />
                      </DraggableY>
                    )
                  }
                </Collapse>
              ))
            }
          </TransitionGroup>
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
