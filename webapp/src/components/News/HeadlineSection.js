import React, { useState, useEffect } from 'react'
import { Box, Stack, Button, Pagination, Typography, Fade, CircularProgress } from '@mui/material'
import ImportantNews from './ImportantNews'
import PropTypes from 'prop-types'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
// import StickerHeaderGroup from '../../components/News/StickerHeaderGroup'

import { useSelector, useDispatch } from 'react-redux'
import { getTodayHeadlinesAction } from '../../redux/actions/newsActions'
import { HEADLINES_FETCHED } from '../../redux/actions'

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
  // const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(5)
  const [loadingHeadlines, setLoadingHeadlines] = useState(true)
  const [headlinesPage, setHeadlinesPage] = useState(0)
  const MAX_COUNT_PER_PAGE = 4

  const newsState = useSelector(state => state.newsReducer)

  const dispatch = useDispatch()

  const startChangePageAnimation = () => {
    setPageAnimation(false)
    setTimeout(() => setPageAnimation(true), 250)
  }

  const nextPage = () => {
    // setPage((page + 1) % pageCount)
    if (headlinesPage < pageCount) {
      setHeadlinesPage(headlinesPage + 1)
      startChangePageAnimation()
    }
  }

  const previousPage = () => {
    // setPage((page - 1) % pageCount)
    console.log(headlinesPage)
    if (headlinesPage > 0) {
      setHeadlinesPage(headlinesPage - 1)
      startChangePageAnimation()
    }
  }

  const setPage = (page) => {
    setHeadlinesPage(page)
    startChangePageAnimation()
  }

  const getHeadlinesIndexToShow = () => {
    const count = newsState.headlines.length
    const pages = []

    let page = MAX_COUNT_PER_PAGE * headlinesPage

    for (let i = 0; i < MAX_COUNT_PER_PAGE && page < count; i++) {
      pages.push(page)
      page += 1
    }
    return pages
  }

  useEffect(() => {
    if (newsState.type === null) {
      setLoadingHeadlines(true)
      console.log('fetching headlines')
      setTimeout(() => {
        dispatch(getTodayHeadlinesAction())
      }, 2000)
    } else if (newsState.type === HEADLINES_FETCHED) {
      setLoadingHeadlines(false)
      const headlinesCount = Math.floor(newsState.headlines.length / MAX_COUNT_PER_PAGE) - 1
      setPageCount(headlinesCount)
    }
  })

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
        <ChangePageButton onClick={previousPage} />
        {
          loadingHeadlines && (
            <Box>
              <CircularProgress />
              <Typography>Fetching headlines</Typography>
            </Box>
          )
        }
        {
          !loadingHeadlines && (
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
                  {
                    getHeadlinesIndexToShow().map(index => (
                      <Box key={index}>
                        <ImportantNews
                        title={newsState.headlines[index].title}
                        image_url={newsState.headlines[index].image_url}
                        url={newsState.headlines[index].url}
                        source={newsState.headlines[index].source}
                        summary={newsState.headlines[index].summary}
                        sentiment={newsState.headlines[index].sentiment}
                        />
                      </Box>
                    ))
                  }
              </Stack>
            </Fade>
          )
        }
        <ChangePageButton nextPage onClick={nextPage} />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', margin: 2 }}>
        <Pagination
          page={headlinesPage}
          boundaryCount={pageCount}
          count={pageCount}
          shape={'rounded'}
          size={'small'}
          hideNextButton
          hidePrevButton
          onChange={(event, pageNumber) => setPage(pageNumber)}
        />
      </Box>
    </Box>
  )
}

HeadlineSection.propTypes = {

}

export default HeadlineSection
