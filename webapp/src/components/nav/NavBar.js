import { React, useState, useEffect } from 'react'
import {
  AppBar, Container, Toolbar, Typography, Box,
  IconButton, Button, Tooltip, Avatar, Menu, MenuItem,
  Divider, ListItemIcon, Stack
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  NOT_SIGNED_IN,
  SIGNED_IN
} from '../../redux/actions/index'
import { signOutAction } from '../../redux/actions/authActions'
// import SearchBox from '../searchBox/SearchBox'

export default function NavBar () {
  const [anchorEl, setAnchorEl] = useState(null)
  const [signedin, setSignedin] = useState(false)
  const navigation = useNavigate()
  const location = useLocation()
  // const [navItemsAnchor, setNavItemAnchor] = useState(null)

  const dispatch = useDispatch()
  const signInState = useSelector(state => state.authReducer.type)

  const signOutClicked = () => {
    dispatch(signOutAction())
    console.log('signed out clicked')
    setAnchorEl(null)
    if (location.pathname === '/profile') {
      navigation('/home')
    }
  }

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (signInState === NOT_SIGNED_IN) {
      setSignedin(false)
    } else if (signInState === SIGNED_IN) {
      setSignedin(true)
    }
  }, [signInState])

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

        {
          signedin && (
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
                <MenuItem component={Link} to={'/profile'}>
                  <Typography textAlign={'center'}>Profile</Typography>
                </MenuItem>

                <MenuItem>
                  <Typography textAlign={'center'}>Notifications</Typography>
                </MenuItem>

                <MenuItem>
                  <Typography textAlign={'center'}>Settings</Typography>
                </MenuItem>

                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Logout />
                    <Typography textAlign={'center'} onClick={signOutClicked}>Sign out</Typography>
                  </ListItemIcon>
                </MenuItem>
              </Menu>
            </Box>
          )
        }
        {
          (signedin === false) && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Sign up or login">
                <IconButton onClick={openProfileMenu} sx={{ p: 0 }}>
                  <Avatar src="https://img.icons8.com/doodle/48/000000/user-male-circle.png" />
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
                <MenuItem component={Link} to={'/signin'}>
                  <Typography textAlign={'center'}>Sign in</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign={'center'}>Forgot password</Typography>
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/signup">
                  <Typography textAlign={'center'}>Sign up!</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )
        }

      </Toolbar>
    </Container>
  </AppBar>
  )
}
