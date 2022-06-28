import React, { useState } from 'react'
import { Box, Stack, Button, Pagination, Typography, Fade, CircularProgress } from '@mui/material'
import ImportantNews from './ImportantNews'
import PropTypes from 'prop-types'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { getTodayHeadlines } from '../../api/news'
// import StickerHeaderGroup from '../../components/News/StickerHeaderGroup'

// import { useSelector, useDispatch } from 'react-redux'
// import { getTodayHeadlinesAction } from '../../redux/actions/newsActions'
// import { HEADLINES_FETCHED } from '../../redux/actions'

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
  // const [count] = useState(3)
  const [total, setTotal] = useState(5)
  const [loading, setLoading] = useState(true)
  const [headlinesPage, setHeadlinesPage] = useState(0)
  const [news, setNews] = useState([])
  // const [page, setPage]= useState(0)
  const MAX_COUNT_PER_PAGE = 3

  // const newsState = useSelector(state => state.newsReducer)

  // const dispatch = useDispatch()

  const startChangePageAnimation = () => {
    setPageAnimation(false)
    setTimeout(() => setPageAnimation(true), 250)
  }

  const nextPage = () => {
    console.log(Math.floor(total / MAX_COUNT_PER_PAGE))
    if (headlinesPage < total) {
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

  // const getHeadlinesIndexToShow = () => {
  //   // const count = newsState.headlines.length
  //   const pages = []

  //   let page = MAX_COUNT_PER_PAGE * headlinesPage
  //   for (let i = 0; i < MAX_COUNT_PER_PAGE && page < total; i++) {
  //     pages.push(page)
  //     page += 1
  //   }
  //   return pages
  // }

  if (loading) {
    setTimeout(() => {
      getTodayHeadlines().then(response => {
        setTotal(response.total)
        setNews(response.data)
        setLoading(false)
      })
    })
  }

  // useEffect(() => {
  //   if (newsState.type === null) {
  //     setLoadingHeadlines(true)
  //     console.log('fetching headlines')
  //     setTimeout(() => {
  //       dispatch(getTodayHeadlinesAction())
  //     }, 2000)
  //   } else if (newsState.type === HEADLINES_FETCHED) {
  //     setLoadingHeadlines(false)
  //     const headlinesCount = Math.floor(newsState.headlines.length / MAX_COUNT_PER_PAGE) - 1
  //     setPageCount(headlinesCount)
  //   }
  // })

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
          loading && (
            <Box>
              <CircularProgress />
              <Typography>Fetching headlines</Typography>
            </Box>
          )
        }
        {
          !loading && (
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
                    news.slice(headlinesPage * MAX_COUNT_PER_PAGE, headlinesPage * MAX_COUNT_PER_PAGE + MAX_COUNT_PER_PAGE)
                      .map((item, index) => {
                        const dateObj = new Date(Date.parse(item.date))
                        const dateStr = dateObj.toDateString()

                        return (
                      <Box key={index}>
                        <ImportantNews
                        title={item.title}
                        image_url={item.image_url}
                        url={item.url}
                        source= {item.source}
                        date={dateStr}
                        />
                      </Box>
                        )
                      }
                      )
                  }
              </Stack>
            </Fade>
          )
        }
        <ChangePageButton nextPage onClick={nextPage} />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', margin: 2 }}>
        <Pagination
          page={headlinesPage + 1}
          // boundaryCount={total}
          count={Math.ceil(total / 3)}
          shape={'rounded'}
          size={'small'}
          hideNextButton
          hidePrevButto
          onChange={(event, pageNumber) => setPage(pageNumber - 1)}
        />
      </Box>
    </Box>
  )
}

HeadlineSection.propTypes = {

}

export default React.memo(HeadlineSection)
