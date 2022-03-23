import { React } from 'react'
import {
  Divider, Typography, Box,
  Toolbar
} from '@mui/material'
import AppBar from '../../components/AppBar/AppBar'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'
import ProfileButtonGroup from '../../components/Profile/ProfileButtonGroup'

const PortfolioPage = ({ drawerWidth }) => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar
        sx={{ marginLeft: `-${drawerWidth}px` }}
        open={true}
        elevation={0}
        >
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <ProfileButtonGroup/>
        </Toolbar>

        <Divider/>

      </AppBar>

      <ContentBody open={true} marginTop={80} marginLeft={drawerWidth} style={{ flex: 1 }}>
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

PortfolioPage.propTypes = {
  drawerWidth: PropTypes.number
}

PortfolioPage.defaultProps = {
  drawerWidth: 240
}

export default PortfolioPage
