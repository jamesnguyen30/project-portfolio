// import NavBar from "./components/nav/Nav";
import React, { useEffect } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { styled } from '@mui/system'
import {
  // testPersist,
  signIn,
  signOut,
  checkSignin
} from '../../api/auth'

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
  const signInClicked = () => {
    signIn('a@a.com', 'password').then(response => console.log(response))
  }

  const signOutClicked = () => {
    signOut().then(response => console.log(response))
  }

  useEffect(() => {
    checkSignin().then(response => console.log(response))
      .catch(_ => console.error('not signed in'))
  }, [])

  return (
    <div className="App">
      <Typography variant="h5">
        Playground for experiments only
      </Typography>
      <Button color="primary"
      style={{ borderRadius: '24px', fontSize: 12, fontWeight: 'bold' }}
      variant="contained" onClick={signInClicked}>Sign in</Button>

      <Button color="primary"
      style={{ borderRadius: '24px', fontSize: 12, fontWeight: 'bold' }}
      variant="contained" onClick={signOutClicked}>Sign out</Button>
      <Box>
        <MyLink variant="h4">Click</MyLink>
      </Box>
    </div>
  )
}

export default PlayGround
