import { React } from 'react'
import { AppBar, Toolbar } from '@mui/material'

const SideBar = () => {
  return (
      <AppBar
        position="fixed"
        open={true}>

        <Toolbar>
          <h3>Side Bar</h3>
        </Toolbar>

      </AppBar>
  )
}

export default SideBar
