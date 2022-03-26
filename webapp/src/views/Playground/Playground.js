import { React, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import ClickActiveAnimation from '../../components/Animations/ClickActiveAnimation/ClickActiveAnimation'

const Playground = () => {
  const [open, setOpen] = useState(false)
  // const [showButton, setShowButton] = useState(true)
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography>Playground</Typography>
      <button onClick={() => setOpen(true)}>Click</button>

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
    </Container>
  )
}

export default Playground
