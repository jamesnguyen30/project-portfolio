// import NavBar from "./components/nav/Nav";
import React from 'react'
import { Divider, Stack, Typography, Box, Drawer, Toolbar, List, ListItem } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import SearchBox from '../../components/searchBox/SearchBox'
import { styled } from '@mui/material/styles'

const MyLink = styled(Typography)(({ theme, active }) => ({
  color: theme.palette.primary.darkBlack,
  fontWeight: active ? 'bold' : 'normal',
  ':hover': {
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}))

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
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

const Content = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: logoHeight,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

const drawerWidth = 250
const logoHeight = 80

const PlayGround = () => {
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
    <Box sx={{ display: 'flex' }}>
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
            <MyLink>My_UserName_And_Avatar</MyLink>
          </Stack>
        </Toolbar>

        <Divider/>

      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >

        <Box sx={{ height: logoHeight, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h3">LOGO</Typography>
        </Box>

        <List>
          {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map(x => (
            <ListItem button key={x}>
              {x}
            </ListItem>
          ))}
        </List>

        <Divider/>

      </Drawer>

      <Content open={true}>
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
          sapien faucibus et molestie ac.
        </Typography>

      </Content>

    </Box>
  )
}

export default PlayGround
