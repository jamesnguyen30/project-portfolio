import React from 'react'
import { Stack, Typography } from '@mui/material'
// import PropTypes from 'prop-types'
import ImportantNews from './ImportantNews'
import CommonNews from './CommonNews'

const StickerList = (props) => {
  return (
    <React.Fragment>
      <Typography>
        Header
      </Typography>
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
    </React.Fragment>
  )
}

StickerList.propTypes = {

}

export default StickerList
