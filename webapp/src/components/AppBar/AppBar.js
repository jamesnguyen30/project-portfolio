import React, { useState } from 'react'
import {
  Divider, Stack, Typography,
  Toolbar, Avatar, Menu, MenuItem, Button
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useSelector, useDispatch } from 'react-redux'
import { signOutAction } from '../../redux/actions/authActions'

const AppBarContainer = styled(MuiAppBar)(({ theme, open, drawerWidth = 250 }) => ({
  backgroundColor: 'white',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const MyLink = styled(Typography)(({ theme, active }) => ({
  color: theme.palette.primary.darkBlack,
  fontWeight: active ? 'bold' : 'normal',
  ':hover': {
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.black,
  borderRadius: theme.sizes.borderRadius.large,
  ':hover': {
    backgroundColor: theme.palette.secondary.gray,
    cursor: 'pointer'
  }
}))

const THE_ROCK_URL = 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5NjIyODM0ODM2ODc0Mzc3/dwayne-the-rock-johnson-gettyimages-1061959920.jpg'
const PERSON_ICON = 'https://img.icons8.com/color/452/person-male.png'

const AppBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const profileState = useSelector(state => state.profileReducer)
  const dispatch = useDispatch()

  const userMenu = [
    { title: 'Profile' },
    { title: 'Settings' },
    { type: 'DIVIDER' },
    { title: 'Sign out', onClick: () => signOutClicked() }
  ]

  const anonymousMenu = [
    { title: 'About Me' },
    { type: 'DIVIDER' },
    { title: 'Sign in', onClick: () => goTo('/signin') },
    { title: 'Sign up', onClick: () => goTo('/signup') }
  ]

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  const goTo = (path) => {
    navigate(path)
  }

  const signOutClicked = () => {
    dispatch(signOutAction())
    setAnchorEl(null)
  }

  return (
    <AppBarContainer
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
        backdropFilter: 'blur(20px)'
      }}
      open={true}
      elevation={0}
      drawerWidth={props.drawerWidth}
    >
      <Toolbar>
        <Stack spacing={5} direction="row" style={{ display: 'flex', flex: 1 }}>
          <MyLink active={true} onClick={() => props.onHeadlineClicked()}>News</MyLink>
        </Stack>

        <Stack >
          {
            props.isSignedIn && (
              <ProfileButton endIcon={<KeyboardArrowDownRoundedIcon />}
                startIcon={<Avatar src={profileState.photoURL ? THE_ROCK_URL : PERSON_ICON} />}
                onClick={openProfileMenu}
              >
                {profileState.displayName ? profileState.displayName : 'No_Name_User'}
              </ProfileButton>
            )
          }
          {
            !props.isSignedIn && (
              <ProfileButton endIcon={<KeyboardArrowDownRoundedIcon />}
                startIcon={<Avatar src={PERSON_ICON} />}
                onClick={openProfileMenu}
              >
                Sign in
              </ProfileButton>
            )
          }

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

            {
              props.isSignedIn && (
                userMenu.map((item, index) => {
                  if (item.type === 'DIVIDER') {
                    return (<Divider key={index} />)
                  } else {
                    return (
                      <MenuItem key={index} onClick={item.onClick ?? item.onClick}>
                        <Typography>{item.title}</Typography>
                      </MenuItem>
                    )
                  }
                }))
            }
            {
              !props.isSignedIn && (
                anonymousMenu.map((item, index) => {
                  if (item.type === 'DIVIDER') {
                    return (<Divider key={index} />)
                  } else {
                    return (
                      <MenuItem key={index} onClick={item.onClick ?? item.onClick}>
                        <Typography>{item.title}</Typography>
                      </MenuItem>
                    )
                  }
                }))
            }
          </Menu>
        </Stack>
      </Toolbar>

      <Divider />

    </AppBarContainer>
  )
}

AppBar.propTypes = {
  drawerWidth: PropTypes.number,
  isSignedIn: PropTypes.bool,
  isCheckingAuth: PropTypes.bool,
  onHeadlineClicked: PropTypes.func
}

export default React.memo(AppBar)
