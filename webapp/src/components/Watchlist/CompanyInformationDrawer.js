// import NavBar from "./components/nav/Nav";
import React from 'react'
import {
  Box,
  Slide,
  Typography,
  Divider,
  Stack
} from '@mui/material'
import PropTypes from 'prop-types'
import DetailPriceChart from './DetailPriceChart'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import UtilityActionButton from '../buttons/UtilityActionButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import tsla from '../../model/mock/tsla'

const company = {
  companyName: 'Snap, Inc',
  symbol: 'SNAP',
  description: 'Snap, Inc. operates as a camera company. Its flagship product, Snapchat, is a camera application that helps people communicate visually with friends and family through short videos and images called Snaps.',
  info: {
    ceo: 'Evan Thomas Spiegel',
    employees: 5131,
    headQuarters: 'Santa Monica, CA',
    founded: 2010
  }
}

const processMockTsla = () => {
  const chartData = []
  for (let i = 0; i < tsla.c.length; i++) {
    chartData.push({
      date: tsla.t[i],
      close: tsla.c[i]
    })
  }
  return chartData
}

const chartData = processMockTsla()

const CompanyInformationDrawer = props => {
  // const [stickers, setStickers] = useState([])

  return (
    <Slide in={props.show} direction={'right'}>
      <Box sx={{
        position: 'fixed',
        top: '65px',
        left: `${props.drawerWidth}px`,
        width: `${props.drawerWidth * 1.5}px`,
        height: '100vh',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: 1,
        borderRightColor: 'secondary.gray',
        padding: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box
          sx={{
            display: 'flex',
            height: 'auto',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <UtilityActionButton
            onClick={props.onClose}
            sx={{
              color: 'primary.red',
              backgroundColor: 'primary.white',
              paddingLeft: 1,
              paddingRight: 1,
              ':hover': {
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: 'primary.red',
                color: 'primary.white',
                transition: 'backgroundColor 50ms'
              }
            }}
            icon={<CloseRoundedIcon />}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 2,
            marginBottom: 2
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              flex: 1
            }}
          >{company.companyName} - ({company.symbol})
          </Typography>

          <UtilityActionButton
            sx={{
              backgroundColor: 'primary.darkGreen'
            }}
            icon={<AddRoundedIcon />}>
            Add to watchlist
          </UtilityActionButton>

        </Box>
        <Box
          sx={{
            flex: 1
          }}
        >
          <DetailPriceChart data={chartData} />
        </Box>
        <Box
          sx={{
            flex: 2,
            marginTop: 3
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            Statistics
          </Typography>
          <p>Add a table of trading info here</p>
          <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: 1
          }}
          >
            Description
          </Typography>
          <Typography>
            {company.description}
          </Typography>
          <Stack direction={'row'} spacing={3}
            sx={{
              marginTop: 3,
              marginBottom: 3
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >CEO</Typography>
              <Typography
                sx={{
                  fontSize: '13px'
                }}
              >{company.info.ceo}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >Employees</Typography>
              <Typography
                sx={{
                  fontSize: '13px'
                }}
              >{company.info.employees}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >Headquarter</Typography>
              <Typography
                sx={{
                  fontSize: '13px'
                }}
              >{company.info.headQuarters}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >Founded</Typography>
              <Typography
                sx={{
                  fontSize: '13px'
                }}
              >{company.info.founded}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

    </Slide>
  )
}

CompanyInformationDrawer.propTypes = {
  drawerWidth: PropTypes.number,
  logoHeight: PropTypes.number,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  handleAdd: PropTypes.func
}

export default CompanyInformationDrawer
