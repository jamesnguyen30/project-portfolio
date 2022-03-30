import React, { useState } from 'react'
import { Box, Stack, Button, Pagination, Typography, Fade } from '@mui/material'
import ImportantNews from './ImportantNews'
import PropTypes from 'prop-types'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

const ChangePageButton = (props) => (
  <Button
    {...props}
    sx={{
      height: '100%',
      width: 'auto',
      color: 'primary.black',
      ':hover': {
        backgroundColor: 'secondary.lightGray'
      },
      ':hover .icon': {
        transform: props.nextPage ? 'translateX(5px)' : 'translateX(-5px)',
        transition: 'transform 100ms'
      }
    }}
  >
    {
      props.nextPage && (
        <KeyboardArrowRightRoundedIcon
          className='icon' />
      )
    }
    {
      !props.nextPage && (
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

const StickerInfo = (props) => {
  return (
    <Box
      sx={{
        height: 50,
        backgroundColor: 'red'
      }}>
      <Typography>Sticker Information here</Typography>
    </Box>
  )
}

StickerInfo.propTypes = {

}

const HeadlineSection = (props) => {
  const [pageAnimation, setPageAnimation] = useState(true)
  const [page, setPage] = useState(0)
  const [pageCount] = useState(5)

  const startChangePageAnimation = () => {
    setPageAnimation(false)
    setTimeout(() => setPageAnimation(true), 500)
  }

  const nextPage = () => {
    setPage((page + 1) % pageCount)
    startChangePageAnimation()
  }

  const previousPage = () => {
    setPage((page - 1) % pageCount)
    startChangePageAnimation()
  }

  const toPage = (value) => {
    setPage(page)
    startChangePageAnimation()
  }

  return (
    <Box sx={{
      display: 'flex',
      padding: 1,
      width: '100%',
      flex: 1,
      flexDirection: 'column'
    }}>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1
        }}
      >
        <ChangePageButton onClick={nextPage} />
        <Fade
          in={pageAnimation}
        >
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Box>
              <StickerInfo />
              <ImportantNews />
            </Box>
            <Box>
              <StickerInfo />
              <ImportantNews />
            </Box>
            <Box>
              <StickerInfo />
              <ImportantNews />
            </Box>
          </Stack>
        </Fade>
        <ChangePageButton nextPage onClick={previousPage} />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', margin: 2 }}>
        <Pagination
          page={1}
          boundaryCount={pageCount}
          count={pageCount}
          shape={'rounded'}
          size={'small'}
          hideNextButton
          hidePrevButton
          onChange={(event, pageNumber) => toPage(pageNumber)}
          />
      </Box>
    </Box>
  )
}

HeadlineSection.propTypes = {

}

export default HeadlineSection
