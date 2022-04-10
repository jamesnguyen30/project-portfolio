import React, { useState, useRef } from 'react'
import {
  Divider, Typography, Box, Drawer,
  List, Stack, Collapse
} from '@mui/material'
import WatchlistItem from './WatchlistItem'
import UtilityActionButton from '../../components/buttons/UtilityActionButton'
import PropTypes from 'prop-types'
import LookupSymbolDrawer from './LookupSymbolDrawer'
import CompanyInformationDrawer from './CompanyInformationDrawer'
import { TransitionGroup } from 'react-transition-group'
import DraggableY from '../../utils/Draggable/DraggableY'

// let mockData = data.map(x => ({ date: x.date, close: x.close }))
// mockData = mockData.slice(0, 30)

const mockStickers = [
  { company: 'Apple', symbol: 'AAPL', price: 199.99, change: 0.99 },
  { company: 'Amazon', symbol: 'AMZN', price: 199.99, change: 0.99 },
  { company: 'Google', symbol: 'GOOG', price: 199.99, change: 0.99 }
]

const WatchlistDrawer = props => {
  const [editing, setEditing] = useState(false)
  const [showingCompnay, setShowingCompany] = useState(false)
  const [stickers, setStickers] = useState(mockStickers)
  const drawerRef = useRef()
  const listRef = useRef()

  const startEditing = () => {
    setEditing(true)
  }

  const stopEditing = () => {
    setEditing(false)
  }

  const onAddNewSticker = (sticker) => {
    const result = stickers.find(x => x.symbol === sticker.symbol)
    if (result === undefined) {
      setStickers([...stickers, sticker])
    }
  }

  const onShowCompanyDrawer = () => {
    console.log(showingCompnay)
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

      <CompanyInformationDrawer
        drawerWidth={props.drawerWidth}
        logoHeight={props.logoHeight}
        show={showingCompnay}
        onClose={onCloseCompanyDrawer}
      />

      <LookupSymbolDrawer
        drawerWidth={props.drawerWidth}
        logoHeight={props.logoHeight}
        show={editing}
        onClose={stopEditing}
        handleAdd={onAddNewSticker}
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
        <Divider/>
        <Stack
          direction="row"
          sx={{
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
            }}>Watching symbols</Typography>
          <UtilityActionButton
            onClick={editing ? stopEditing : startEditing}
          >{editing ? 'Done' : 'Edit'}</UtilityActionButton>
        </Stack>
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
                        data={data}
                        symbol={data.symbol}
                        price={data.price}
                        change={data.change}
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
                          symbol={data.symbol}
                          price={data.price}
                          change={data.change}
                          data={data}
                          index={index}
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
