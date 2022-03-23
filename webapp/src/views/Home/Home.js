// import NavBar from "./components/nav/Nav";
import React, { useState } from 'react'
import {
  Divider, Typography, Box, Drawer,
  List, ListItem, ListItemIcon, ListItemButton, ListItemText
} from '@mui/material'
import { styled } from '@mui/material/styles'
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded'
import PropTypes from 'prop-types'

import NewsPage from '../News/NewsPage'

const DrawerButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.sizes.borderRadius.medium,
  ':hover': {
    backgroundColor: theme.palette.secondary.gray
  }
}))

const DrawerItem = ({ active, title, Icon, onClick }) => {
  return (
    <DrawerButton onClick={onClick} disableRipple>
      <ListItemIcon>
        {/* {active ? <Icon sx={{ color: 'primary.green' }}/> : <Icon />} */}
        <Icon sx={{ color: active ? 'primary.green' : 'secondary.black' }}/>
      </ListItemIcon>
      <ListItemText>
        {title}
      </ListItemText>
    </DrawerButton>
  )
}

DrawerItem.propTypes = {
  active: PropTypes.string,
  title: PropTypes.string,
  Icon: PropTypes.object,
  onClick: PropTypes.func
}

// const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
//   backgroundColor: 'white',
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   })
// }))

// const Content = styled('main')(({ theme, open }) => ({
//   flexGrow: 1,
//   marginTop: logoHeight,
//   paddingLeft: theme.spacing(3),
//   paddingRight: theme.spacing(3),
//   transition: theme.transitions.create(['margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create(['margin'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen
//     }),
//     marginLeft: 0
//   })
// }))

const drawerWidth = 250
const logoHeight = 80

const drawerItems = [
  { title: 'News', icon: ArticleRoundedIcon },
  { title: 'Portfolio', icon: PieChartRoundedIcon },
  { title: 'Watchlist', icon: TimelineRoundedIcon },
  { title: 'Settings', icon: SettingsRoundedIcon }
]

const Home = () => {
  const [page, setPage] = useState(0)
  // const [anchorEl, setAnchorEl] = useState(null)

  const onDrawerItemClicked = (index) => {
    setPage(index)
  }

  console.log('rendered')

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'secondary.white' }}>
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
          {drawerItems.map((x, index) => (
            <ListItem key={x.title}>
              <DrawerItem active={page === index} title={x.title} Icon={x.icon} onClick={() => onDrawerItemClicked(index)}/>
            </ListItem>
          ))}
        </List>

        <Divider/>

      </Drawer>

      <NewsPage/>
    </Box>
  )
}

export default Home
