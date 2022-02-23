import { React, useState } from 'react'
import {
  AppBar, Container, Toolbar, Typography, Box,
  IconButton, Button, Tooltip, Avatar, Menu, MenuItem,
  Divider, ListItemIcon, Stack
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
// import SearchBox from '../searchBox/SearchBox'

export default function NavBar () {
  const [anchorEl, setAnchorEl] = useState(null)
  // const [navItemsAnchor, setNavItemAnchor] = useState(null)

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  // const openNavItems = (event) => {
  //   setNavItemAnchor(event.currentTarget)
  // }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              // onClick={openNavItems}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component='div'
            sx={{ mr: 2, display: 'flex', justifyContent: { xs: 'center' }, alignItems: { xs: 'center' }, flexGrow: { xs: 1, md: 0 } }}
          >
            BookRecap
          </Typography>

          <Stack direction={'row'} spacing={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/signin">
                Login
              </Button>
            </Typography>

            <Typography>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/signup">
                Sign Up
              </Button>
            </Typography>

            <Typography>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/home">
                Home Page
              </Button>
            </Typography>
            <Typography>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to="/">
                PlayGround
              </Button>
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="show profile">
              <IconButton onClick={openProfileMenu} sx={{ p: 0 }}>
                <Avatar src="https://avatarfiles.alphacoders.com/952/95227.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={closeProfileMenu}
            >
            <MenuItem>
              <Typography textAlign={'center'}>Profile</Typography>
            </MenuItem>

            <MenuItem>
              <Typography textAlign={'center'}>Notifications</Typography>
            </MenuItem>

            <Divider/>
            <MenuItem>
              <ListItemIcon>
                <Logout/>
                <Typography textAlign={'center'}>Sign out</Typography>
              </ListItemIcon>
            </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}
