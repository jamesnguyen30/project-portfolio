// import NavBar from "./components/nav/Nav";
import React, { useState } from 'react'
import {
  Box, Typography, Slide, Button, List
} from '@mui/material'
// import UtilityActionButton from '../../components/buttons/UtilityActionButton'
import PropTypes from 'prop-types'
import SearchBox from '../searchBox/SearchBox'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import UtilityActionButton from '../buttons/UtilityActionButton'

const StickerSearchResult = props => {
  return (
    <Box
    sx={{
      display: 'flex'
    }}>
      <Typography
        key ={props.index}
        sx={{
          marginTop: 1,
          marginBottom: 1,
          flex: 1
        }}
      >{props.name}</Typography>
      <Button onClick={props.onClick}>
        Add
      </Button>

    </Box>
  )
}

StickerSearchResult.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func
}

const SecondaryDrawer = props => {
  const [stickers, setStickers] = useState([])

  const errorApi = false
  const apiCallback = (query) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!errorApi) {
          console.log('Query ' + query)
          resolve([
            { name: 'Title 1' },
            { name: 'Title 2' },
            { name: 'Title 3' },
            { name: 'Title 4' },
            { name: 'Title 5' }
          ])
        } else {
          reject(new Error('Error thrown'))
        }
      })
    })
  }

  const handleResult = result => {
    // console.log(result)
    setStickers(result)
  }

  const handleError = error => {
    console.error(error)
  }

  const handleClear = () => {
    setStickers([])
    // console.log('Search result cleared')
  }

  const handleAdd = (item) => {
    props.handleAdd(item)
  }

  const setLoading = isLoading => {
    console.log(isLoading ? 'Loading ... ' : 'Done loading')
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
            icon={<CloseRoundedIcon/>}
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
          stickers.length > 0 && (
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
                      name={sticker.name}
                    />
                  )
                })
              }
            </List>
          )
        }
        {
          stickers.length === 0 && (
            <Typography>Empty search result</Typography>
          )
        }
      </Box>
    </Slide>
  )
}

SecondaryDrawer.propTypes = {
  drawerWidth: PropTypes.number,
  logoHeight: PropTypes.number,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  handleAdd: PropTypes.func
}

export default SecondaryDrawer
