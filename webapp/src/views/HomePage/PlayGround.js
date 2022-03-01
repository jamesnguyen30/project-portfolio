// import NavBar from "./components/nav/Nav";
import React from 'react'
import { Button, Typography } from '@mui/material'

const PlayGround = () => {
  return (
    <div className="App">
        {/* <NavBar></NavBar> */}
        <Typography variant="h5">
        Playground for experiments only
        </Typography>
        <Button color="primary">Click</Button>
    </div>
  )
}

export default PlayGround
