import React, { useState, useRef } from 'react'
import { Container, Typography, Box, List, ListItem } from '@mui/material'
import ClickActiveAnimation from '../../components/Animations/ClickActiveAnimation/ClickActiveAnimation'
import ImportantNews from '../../components/News/ImportantNews'
import CommonNews from '../../components/News/CommonNews'
import StickerHeader from '../../components/News/StickerHeader'
import StickerHeaderGroup from '../../components/News/StickerHeaderGroup'
import DraggableY from '../../utils/Draggable/DraggableY'

import PropTypes from 'prop-types'

const mockCompany = {
  assetFullname: 'APPLE, Inc',
  sticker: 'AAPL',
  price: 9999.9,
  change: 99.9
}

const Playground = props => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([0, 1, 2, 3, 4])
  const boxRef = useRef()
  const listRef = useRef()

  const changeIndex = (oldIdx, newIdx) => {
    // setData(data.map(x => x))
    console.log(`Changed item from ${oldIdx} to ${newIdx} index`)
    const toInsert = data[oldIdx]
    data.splice(oldIdx, 1)
    data.splice(newIdx, 0, toInsert)
    setData([...data])
  }

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

      {/* <Box sx={{ padding: 10, backgroundColor: 'red' }} ref={boxRef}>
        <DraggableY parentRef = {boxRef}>
          <div style={{ backgroundColor: 'green', padding: '10px' }}>
            <p>Draggable component</p>
          </div>
        </DraggableY>
      </Box> */}

      <Typography>
        Reordering list animation
      </Typography>

      <Box ref={boxRef} sx={{ padding: 10, backgroundColor: 'red' }}>
        <List ref={listRef}>
          {
            data.map((x, index) => {
              return (
              <DraggableY parentRef={boxRef} listRef={listRef} key={index} index={index} changeIndex={changeIndex}>
                <ListItem
                  key={index}
                  onMouseDown={() => console.log('mouse down')}
                  onMouseUp={() => console.log('mouse up')}
                  sx={{
                    backgroundColor: 'gray',
                    margin: 1,
                    width: '200px',
                    ':hover': {
                      backgroundColor: 'green'
                    },
                    ':active': {
                      backgroundColor: 'yellow',
                      boxShadow: 3
                    }
                  }}
                >
                  <Typography>Item {x}</Typography>
                </ListItem>
              </DraggableY>
              )
            })
          }

        </List>
      </Box>

      <button onClick={() => props.signInClicked('a@a.com', 'password')}>Sign in test</button>

      <button onClick={() => setOpen(true)}>Click animation</button>
      <ClickActiveAnimation
        in={open}
      >
        <Box sx={{ backgroundColor: 'red', alignSelf: 'baseline', display: 'flex' }}>
          <Typography>Hello World</Typography>
          <button onClick={() => {
            console.log('closed')
            setOpen(false)
          }
          }>Close this</button>
        </Box>
      </ClickActiveAnimation>

      <Box>

        <StickerHeaderGroup />
        <ImportantNews />
      </Box>

      <Box sx={{ marginTop: 3, width: '100%' }}>
        <Box>
          <StickerHeader full {...mockCompany} />
          <CommonNews />
        </Box>
      </Box>

    </Container>
  )
}

Playground.propTypes = {
  signInClicked: PropTypes.func
}

export default Playground
