import React, { useState, useEffect } from 'react'
import {
  AppBar, Container, Toolbar, Typography, Box,
  IconButton, Tooltip, Avatar, Menu, MenuItem,
  Divider, ListItemIcon, Stack, Paper
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
import NavItem from './NavItem'

export default function NavBar () {
  const [anchorEl, setAnchorEl] = useState(null)
  const [signedin, setSignedin] = useState(false)
  const navigation = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()
  const signInState = useSelector(state => state.authReducer.type)
  console.log('navbar rendered')

  const signOutClicked = () => {
    dispatch(signOutAction())
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

          <Stack direction={'row'} spacing={5} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* <NavItem text={'Profile'} to="/profile"></NavItem> */}
            <NavItem text={'Sign up'} to="/signup" />
            <NavItem text={'Sign in'} to="/signin" />
            <NavItem text={'Home'} to="/home" />
            <NavItem text={'Playground'} to="/playground" />
          </Stack>

          {
            signedin && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="show profile">
                  <IconButton onClick={openProfileMenu} sx={{ p: 0 }}>
                    <Avatar src="https://www.aceshowbiz.com/images/photo/the_rock.jpg" component={Paper} elevation={10} />
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
                  <MenuItem component={Link} to={'/profile'} onClick={() => { setAnchorEl(null) }}>
                    <Typography textAlign={'center'}>Profile</Typography>
                  </MenuItem>

                  <MenuItem>
                    <Typography textAlign={'center'} onClick={() => { setAnchorEl(null) }}>Notifications</Typography>
                  </MenuItem>

                  <MenuItem>
                    <Typography textAlign={'center'} onClick={() => { setAnchorEl(null) }}>Settings</Typography>
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
                    <Avatar src="https://img.icons8.com/stickers/100/000000/human-head.png" />
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
