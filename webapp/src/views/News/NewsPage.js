import { React, useState } from 'react'
import {
  Divider, Stack, Typography, Box,
  Toolbar, Avatar, Menu, MenuItem, Button
} from '@mui/material'
import SearchBox from '../../components/searchBox/SearchBox'
import { styled } from '@mui/material/styles'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AppBar from '../../components/AppBar/AppBar'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'

const THE_ROCK_URL = 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5NjIyODM0ODM2ODc0Mzc3/dwayne-the-rock-johnson-gettyimages-1061959920.jpg'

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
    backgroundColor: theme.palette.secondary.gray
  }
}))

const NewsPage = ({ drawerWidth }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  const testApiCall = (query) => {
    console.log(query)
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve([1, 2, 3, 4, 5]) }, 300)
    })
  }

  const testHandleResult = (result) => {
    console.log(result)
  }

  const testClear = () => {
    console.log('cleared')
  }

  const testError = (error) => {
    console.log(error)
  }

  const testLoading = (toggle) => {
    console.log(`loading = ${toggle}`)
  }

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ marginLeft: `-${drawerWidth}px` }}
        open={true}
        elevation={0}
        >

        <Toolbar>
          <Stack spacing={5} direction="row" style={{ display: 'flex', flex: 1 }}>
            <MyLink active={true}>Headlines</MyLink>
            <MyLink>Latest</MyLink>
            <MyLink>Analysis</MyLink>
            <MyLink>Trends</MyLink>
          </Stack>

          <SearchBox style={{ marginLeft: 50, marginRight: 50 }}
            apiCallback={testApiCall}
            handleResult={testHandleResult}
            handleClear={testClear}
            handleError={testError}
            setLoading={testLoading}
            placeHolder={'Search news ...'}
          ></SearchBox>

          <Stack>
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
        </Toolbar>

        <Divider/>

      </AppBar>

      <ContentBody open={true} marginTop={80} marginLeft={drawerWidth}>
        <Typography >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac. He he he
        </Typography>
      </ContentBody>
    </Box>
  )
}

NewsPage.propTypes = {
  drawerWidth: PropTypes.number
}

NewsPage.defaultProps = {
  drawerWidth: 240
}

export default NewsPage
