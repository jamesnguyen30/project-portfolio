// import NavBar from "./components/nav/Nav";
import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'

const MyLink = styled(Typography)`
  color: white;
  font-size: 24px;
  padding-bottom: 8px;
  &:hover { 
    border-bottom: 6px solid white;
    cursor: pointer;
  }
`

const PlayGround = () => {
  return (
    <div className="App">
        <Typography variant="h5">
        Playground for experiments only
        </Typography>
        <Button color="primary" style={{ borderRadius: '24px', fontSize: 12, fontWeight: 'bold' }} variant="contained">Click</Button>
        <Box sx={{ height: 200, width: 200, backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <MyLink variant="h4">Click</MyLink>
        </Box>
    </div>
  )
}

export default PlayGround
