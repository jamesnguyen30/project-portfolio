import { React } from 'react'
import {
  Divider, Container,
  Toolbar
} from '@mui/material'
import AppBar from '../../components/AppBar/AppBar'
import PropTypes from 'prop-types'
import ContentBody from '../../components/ContentBody/ContentBody'
import ProfileButtonGroup from '../../components/Profile/ProfileButtonGroup'
import Networth from '../../components/Portfolio/Networth'

const PortfolioPage = ({ drawerWidth }) => {
  return (
    <Container style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
        <Container maxWidth='lg' style={{ justifyContent: 'center', height: '800px' }}>
          <Networth/>
        </Container>
      </ContentBody>
    </Container>
  )
}

PortfolioPage.propTypes = {
  drawerWidth: PropTypes.number
}

PortfolioPage.defaultProps = {
  drawerWidth: 240
}

export default PortfolioPage
