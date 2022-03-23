import { React, useState } from 'react'
import {
  Divider, Stack, Typography,
  Avatar, Menu, MenuItem, Button
} from '@mui/material'
import { styled } from '@mui/material/styles'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

const THE_ROCK_URL = 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5NjIyODM0ODM2ODc0Mzc3/dwayne-the-rock-johnson-gettyimages-1061959920.jpg'

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.black,
  borderRadius: theme.sizes.borderRadius.large,
  ':hover': {
    backgroundColor: theme.palette.secondary.gray,
    cursor: 'pointer'
  }
}))

const ProfileButtonGroup = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  return (
          <Stack >
            {/* <MyLink>My_UserName_And_Avatar</MyLink> */}
            <ProfileButton endIcon={<KeyboardArrowDownRoundedIcon/>}
            startIcon={<Avatar src={THE_ROCK_URL}/>}
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
              <Divider/>
              <MenuItem>
                <Typography>Log out</Typography>
              </MenuItem>
            </Menu>
          </Stack>
  )
}

export default ProfileButtonGroup
