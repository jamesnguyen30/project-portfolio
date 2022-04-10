// import NavBar from "./components/nav/Nav";
import React, { useState } from 'react'
import {
  Box, Typography, Slide, Button, List, CircularProgress
} from '@mui/material'
// import UtilityActionButton from '../../components/buttons/UtilityActionButton'
import PropTypes from 'prop-types'
import SearchBox from '../searchBox/SearchBox'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import UtilityActionButton from '../buttons/UtilityActionButton'
import { searchSymbol } from '../../api/market'

// const mockResult = '{"count":22,"result":[{"description":"Apple","displaySymbol":"A3KUT5.DU","symbol":"A3KUT5.DU","type":""},{"description":"Apple","displaySymbol":"APCA.HM","symbol":"APCA.HM","type":""},{"description":"Apple","displaySymbol":"A1Z5RD.MU","symbol":"A1Z5RD.MU","type":""},{"description":"Apple","displaySymbol":"APCU.HM","symbol":"APCU.HM","type":""},{"description":"Apple","displaySymbol":"A2R7JT.BE","symbol":"A2R7JT.BE","type":""},{"description":"Apple","displaySymbol":"A2R7JT.DU","symbol":"A2R7JT.DU","type":""},{"description":"Apple","displaySymbol":"A19C0M.BE","symbol":"A19C0M.BE","type":""},{"description":"Apple","displaySymbol":"A2R7JV.BE","symbol":"A2R7JV.BE","type":""},{"description":"Apple","displaySymbol":"APCT.HA","symbol":"APCT.HA","type":""},{"description":"Apple","displaySymbol":"APC5.MU","symbol":"APC5.MU","type":""},{"description":"Apple","displaySymbol":"APCL.BE","symbol":"APCL.BE","type":""},{"description":"Apple","displaySymbol":"A3KUT3.MU","symbol":"A3KUT3.MU","type":""},{"description":"Apple","displaySymbol":"APCT.HM","symbol":"APCT.HM","type":""},{"description":"Apple","displaySymbol":"APCX.BE","symbol":"APCX.BE","type":""},{"description":"Apple","displaySymbol":"APC5.DU","symbol":"APC5.DU","type":""},{"description":"Apple","displaySymbol":"A19C0M.HM","symbol":"A19C0M.HM","type":""},{"description":"Apple","displaySymbol":"APCT.MU","symbol":"APCT.MU","type":""},{"description":"Apple","displaySymbol":"A1HKKY.DU","symbol":"A1HKKY.DU","type":""},{"description":"Apple","displaySymbol":"APCA.MU","symbol":"APCA.MU","type":""},{"description":"Apple","displaySymbol":"APCU.BE","symbol":"APCU.BE","type":""},{"description":"Apple","displaySymbol":"APCT.BE","symbol":"APCT.BE","type":""},{"description":"Apple","displaySymbol":"A3KUT4.BE","symbol":"A3KUT4.BE","type":""}]}'

const StickerSearchResult = props => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderBottomColor: 'secondary.gray'
      }}>
      <Typography
        key={props.index}
        sx={{
          marginTop: 1,
          marginBottom: 1,
          flex: 1,
          fontSize: '15px',
          fontWeight: 'bold'
        }}
      >{props.name}</Typography>
      <Typography>
        {props.symbol}
      </Typography>
      <Button onClick={props.onClick}>
        Add
      </Button>
    </Box>
  )
}

StickerSearchResult.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func
}

const LookupSymbolDrawer = props => {
  const [stickers, setStickers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // const errorApi = false
  const apiCallback = (query) => {
    return searchSymbol(query)
    // Return mock data
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(JSON.parse(mockResult)), 5000)
    // })
  }

  const handleResult = result => {
    console.log(result)
    // Finnhub data format
    result.result = result.result.slice(0, 15)
    // Since we're using sandbox
    // the return result is bullshit
    // add valid symbols to the result list
    result.result.splice(0, 0, {
      description: 'Apple, Inc',
      symbol: 'AAPL',
      type: 'Common Stock'
    })
    result.result.splice(0, 0, {
      description: 'Amazon Inc',
      symbol: 'AMZN',
      type: 'Common Stock'
    })
    result.result.splice(0, 0, {
      description: 'Tesla Inc',
      symbol: 'TSLA',
      type: 'Common Stock'
    })
    result.result.splice(0, 0, {
      description: 'Google Inc',
      symbol: 'GOOG',
      type: 'Common Stock'
    })
    result.result.splice(0, 0, {
      description: 'Nvidia Inc',
      symbol: 'NVIDIA',
      type: 'Common Stock'
    })

    const stickerResult = result.result.map(x => ({
      company: x.description,
      symbol: x.symbol,
      type: x.type
    }))
    setStickers(stickerResult)
  }

  const handleError = error => {
    console.error(error)
  }

  const handleClear = () => {
    setStickers([])
  }

  const handleAdd = (item) => {
    props.handleAdd(item)
  }

  const setLoading = isLoading => {
    console.log(isLoading ? 'Loading ... ' : 'Done loading')
    setIsLoading(isLoading)
  }

  const searchBoxProps = {
    apiCallback: apiCallback,
    handleResult: handleResult,
    handleClear: handleClear,
    setLoading: setLoading,
    handleError: handleError
  }

  return (
    <Slide in={props.show} direction={'right'}>
      <Box sx={{
        position: 'fixed',
        top: '65px',
        left: `${props.drawerWidth}px`,
        width: `${props.drawerWidth}px`,
        height: '100vh',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: 1,
        borderRightColor: 'secondary.gray',
        padding: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              flex: 1
            }}
          >New sticker to watch list</Typography>
          <UtilityActionButton
            onClick={props.onClose}
            sx={{
              color: 'primary.red',
              backgroundColor: 'primary.white',
              paddingLeft: 1,
              paddingRight: 1,
              ':hover': {
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: 'primary.red',
                color: 'primary.white',
                transition: 'backgroundColor 50ms'
              }
            }}
            icon={<CloseRoundedIcon />}
          >
          </UtilityActionButton>
        </Box>
        <SearchBox
          sx={{
            marginTop: 1,
            marginBottom: 1
          }}
          placeHolder='Search sticker ... '
          autoComplete
          {...searchBoxProps}
        />
        {
          isLoading && (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: '300px'
            }}>
              <CircularProgress sx={{ color: 'primary.darkPurple' }} />
              <Typography>Looking up ...</Typography>
            </Box>
          )
        }
        {
          !isLoading && stickers.length > 0 && (
            <List sx={{
              overflow: 'auto',
              flex: 1
            }}>
              {
                stickers.map((sticker, index) => {
                  return (
                    <StickerSearchResult
                      onClick={() => handleAdd(sticker)}
                      key={index}
                      name={sticker.company}
                      symbol={sticker.symbol}
                    />
                  )
                })
              }
            </List>
          )
        }
        {
          !isLoading && stickers.length === 0 && (
            <Typography>Empty search result</Typography>
          )
        }
      </Box>
    </Slide>
  )
}

LookupSymbolDrawer.propTypes = {
  drawerWidth: PropTypes.number,
  logoHeight: PropTypes.number,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  handleAdd: PropTypes.func
}

export default LookupSymbolDrawer
