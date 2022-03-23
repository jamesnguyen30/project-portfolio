import { React } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'

const NetworthContainer = styled(Box)(({ theme }) => ({
  padding: theme.sizes.space.xxlarge,
  margin: theme.sizes.space.medium,
  backgroundColor: theme.palette.primary.white,
  borderRadius: theme.sizes.borderRadius.medium,
  width: '500px',
  display: 'flex'
}))

const ChangePercentage = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.darkGreen,
  borderRadius: theme.sizes.borderRadius.medium,
  alignSelf: 'baseline',
  // alignItems: 'center',
  // justifyContent: 'center',
  padding: '2px',
  paddingLeft: theme.sizes.space.tiny,
  paddingRight: theme.sizes.space.tiny
}))

const ChartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'gray',
  width: '100%',
  height: '200px',
  marginTop: theme.sizes.space.medium
}))

const Networth = (props) => {
  return (
    <NetworthContainer sx={{ boxShadow: 2, ':hover': { boxShadow: 5 } }}>
      <Stack style={{ flex: 1 }}>
        <Stack direction="row" spacing={5} style={{ alignItems: 'flex-start' }}>
          <Typography>Total balance:</Typography>
            <Typography variant="h4">$ 999,999,999</Typography>
            <Stack>
              <Typography sx={{ color: 'primary.darkGreen' }}>+$ 99999.99 </Typography>
              <ChangePercentage sx={{ boxShadow: 4 }}>
                <Typography style={{ color: 'white' }}>+99.99% </Typography>
              </ChangePercentage>
            </Stack>
        </Stack>
        <ChartContainer>

        </ChartContainer>
      </Stack>
    </NetworthContainer>
  )
}

Networth.propTypes = {
  props: PropTypes.object
}

Networth.defaultValues = {

}

export default Networth
