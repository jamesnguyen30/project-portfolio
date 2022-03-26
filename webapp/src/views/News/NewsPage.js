import { React, useState } from 'react'
import {
  Divider, Stack, Typography, Box,
  Toolbar, Avatar, Menu, MenuItem, Button,
  Grid, Pagination
} from '@mui/material'
import SearchBox from '../../components/searchBox/SearchBox'
import { styled } from '@mui/material/styles'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AppBar from '../../components/AppBar/AppBar'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'

import HeadlineNews from '../../components/News/HeadlineNews'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

import StickerNews from '../../components/News/StickerNews'

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
    backgroundColor: theme.palette.secondary.gray,
    cursor: 'pointer'
  }
}))

const ChangePageButton = ({ nextPage }) => (
  <Button
  sx={{
    height: 'auto',
    width: 'auto',
    color: 'primary.black',
    ':hover': {
      backgroundColor: 'secondary.lightGray'
    },
    ':hover .icon': {
      transform: nextPage ? 'translateX(5px)' : 'translateX(-5px)',
      transition: 'transform 100ms'
    }
  }}
  >
    {
      nextPage && (
        <KeyboardArrowRightRoundedIcon
          className='icon' />
      )
    }
    {
      !nextPage && (
        <KeyboardArrowLeftRoundedIcon
          className='icon'
        />
      )
    }
  </Button>
)

ChangePageButton.propTypes = {
  nextPage: PropTypes.bool
}

ChangePageButton.defaultValues = {
  nextPage: false
}

const NewsPage = (props) => {
  const { drawerWidth } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

  // const testApiCall = (query) => {
  //   console.log(query)
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([
  //         'This is the test news article 1',
  //         'This is the test news article 2',
  //         'This is the test news article 1',
  //         'This is the test news article 1',
  //         'This is the test news article 1'
  //       ])
  //     }, 300)
  //   })
  // }

  // const testHandleResult = (result) => {
  //   console.log(result)
  // }

  // const testClear = () => {
  //   console.log('cleared')
  // }

  // const testError = (error) => {
  //   console.log(error)
  // }

  // const testLoading = (toggle) => {
  //   console.log(`loading = ${toggle}`)
  // }

  // // const setSearchResultAnchor = (target) => {
  // //   console.log(target)
  // //   setSearchBoxAnchor(target)
  // // }

  const onSearchBoxFocus = (event) => {
  }

  // const onSearchBoxBlur = () => {
  //   console.log('on blur')
  // }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', width: `calc(100% - ${drawerWidth}px)` }}>
      <AppBar
        sx={{ marginLeft: `-${drawerWidth}px` }}
        open={true}
        elevation={0}
        drawerWidth={drawerWidth}
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
            onFocus={onSearchBoxFocus}
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
              <MenuItem>
                <Typography>Log out</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>

        <Divider />

      </AppBar>

      <ContentBody open={true} marginTop={80} marginLeft={drawerWidth} style={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Headlines</Typography>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* <IconButton sx={{ height: '50px', width: 'auto' }}><KeyboardArrowLeftRoundedIcon/></IconButton> */}
          <ChangePageButton />
          <Grid container sx={{ marginTop: 1 }} spacing={2}>
            <Grid item lg={6} md={12} sx={{ display: 'flex' }}>
              <HeadlineNews />
            </Grid>
            <Grid item lg={6} md={12} sx={{ display: 'flex' }}>
              <HeadlineNews />
            </Grid>
            <Grid item lg={6} md={12} sx={{ display: 'flex' }}>
              <HeadlineNews />
            </Grid>
            <Grid item lg={6} md={12} sx={{ display: 'flex' }}>
              <HeadlineNews />
            </Grid>
          </Grid>
          <ChangePageButton nextPage />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', margin: 2 }}>
          <Pagination count={5} shape={'rounded'} size={'small'} hideNextButton hidePrevButton />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Watching stickers</Typography>

        <Divider/>
        <StickerNews/>
      </ContentBody>
    </Box>
  )
}

NewsPage.propTypes = {
  drawerWidth: PropTypes.number
}

NewsPage.defaultProps = {
  drawerWidth: 250
}

export default NewsPage
