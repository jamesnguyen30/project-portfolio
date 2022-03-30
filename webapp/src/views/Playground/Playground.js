import { React, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import ClickActiveAnimation from '../../components/Animations/ClickActiveAnimation/ClickActiveAnimation'
import ImportantNews from '../../components/News/ImportantNews'
import CommonNews from '../../components/News/CommonNews'
import StickerHeader from '../../components/News/StickerHeader'

const mockCompany = {
  // companyName: 'Down Jon Industrial',
  // sticker: 'DJI',
  assetFullname: 'APPLE, Inc',
  sticker: 'AAPL',
  price: 9999.9,
  change: 99.9
}

const Playground = () => {
  const [open, setOpen] = useState(false)
  // const [showButton, setShowButton] = useState(true)
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography>Playground</Typography>
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

        <Typography>Sticker News Component</Typography>
        <Box>
          <StickerHeader {...mockCompany}/>
          <ImportantNews/>
        </Box>

        <Box sx={{ marginTop: 3, width: '100%' }}>
          <Box>
            <StickerHeader full {...mockCompany}/>
            <CommonNews/>
          </Box>
        </Box>

    </Container>
  )
}

export default Playground
