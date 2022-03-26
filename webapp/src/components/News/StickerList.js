import React from 'react'
import { Stack, Typography } from '@mui/material'
// import PropTypes from 'prop-types'
import StickerNews from './StickerNews'

const StickerList = (props) => {
  return (
    <React.Fragment>
      <Typography sx={{ backgroundColor: 'red' }}>
        Header
      </Typography>
      <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <StickerNews/>
        <StickerNews/>
        <StickerNews/>
      </Stack>
    </React.Fragment>
  )
}

StickerList.propTypes = {

}

export default StickerList
