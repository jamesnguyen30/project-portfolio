import React from 'react'
import { Stack, Divider } from '@mui/material'
// import PropTypes from 'prop-types'
import ImportantNews from './ImportantNews'
import CommonNews from './CommonNews'

// Render News according to received data
const WatchingNewsSection = (props) => {
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Stack
          spacing={3}
          direction="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
          <ImportantNews/>
          <Stack spacing={2}>
            <CommonNews />
            <CommonNews />
          </Stack>
          <ImportantNews />
        </Stack>
        <Divider/>
        <Stack
          spacing={3}
          direction="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
          <Stack spacing={2}>
            <CommonNews />
            <CommonNews />
          </Stack>
          <ImportantNews/>
          <ImportantNews />
        </Stack>

      </Stack>
    </React.Fragment>
  )
}

WatchingNewsSection.propTypes = {

}

export default WatchingNewsSection
