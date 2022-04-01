import React, { useState, useEffect } from 'react'
import {
  Divider, Stack, Typography,
  Toolbar, Avatar, Menu, MenuItem, Button
} from '@mui/material'
import SearchBox from '../../components/searchBox/SearchBox'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

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

const AppBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const navigate = useNavigate()

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  const goTo = (path) => {
    navigate(path)
  }

  useEffect(() => {

  })

  return (
      <AppBarContainer
        sx={{ marginLeft: `-${props.drawerWidth}px` }}
        open={true}
        elevation={0}
        drawerWidth={props.drawerWidth}
      >
        <Toolbar>
          <Stack spacing={5} direction="row" style={{ display: 'flex', flex: 1 }}>
            <MyLink active={true}>Headlines</MyLink>
            <MyLink>Latest</MyLink>
            <MyLink>Analysis</MyLink>
            <MyLink>Trends</MyLink>
          </Stack>

          <SearchBox style={{ marginLeft: 50, marginRight: 50, flex: 1 }}
            placeHolder={'Search news ...'}
            // onFocus={onSearchBoxFocus}
          // apiCallback={testApiCall}
          // handleResult={testHandleResult}
          // handleClear={testClear}
          // handleError={testError}
          // setLoading={testLoading}
          // onFocus={onSearchBoxFocus}
          // onBlur={onSearchBoxBlur}
          />

          <Stack >
            {/* <MyLink>My_UserName_And_Avatar</MyLink> */}
            <ProfileButton endIcon={<KeyboardArrowDownRoundedIcon />}
              startIcon={<Avatar src={THE_ROCK_URL} />}
              onClick={openProfileMenu}
            >
              My_UserName_And_Avatar
            </ProfileButton>

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
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography>Settings</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => goTo('/signin')}>
                <Typography>Sign in</Typography>
              </MenuItem>
              <MenuItem>
                <Typography>Sin up</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>

        <Divider />

      </AppBarContainer>
  )
}

AppBar.propTypes = {
  drawerWidth: PropTypes.number
}

export default AppBar
