import React from 'react'
import { Grid, Box } from '@mui/material'
// import UtilityActionButton from '../buttons/UtilityActionButton'
import ImportantNews from './ImportantNews'
import PropTypes from 'prop-types'

// import { getNewsByTermAction } from '../../redux/actions/newsActions'
// import { NEWS_FETCHED, NEWS_NOT_FETCHED } from '../../redux/actions'

// import { useSelector, useDispatch } from 'react-redux'

// Render News according to received data
// import { getNewsByTerm } from '../../api/news'

const WatchingNewsSection = (props) => {
  // const [news, setNews] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [news, setNews] = useState([])

  // if (loading) {
  // console.log('fetching ' + props.term)
  // getNewsByTerm(props.term, 10).then(response => {
  //   console.log(response)
  //   setNews(response.data.data)
  //   setLoading(false)
  // })
  // }

  // const newsState = useSelector(state => state.newsReducer)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (newsState.type === null) {
  //     setLoading(true)
  //     setTimeout(() => {
  //       dispatch(getNewsByTermAction(props.term))
  //     }, 2000)
  //   } else if (newsState.type === NEWS_FETCHED) {
  //     setLoading(false)
  //     setNews(newsState.news[props.term])
  //     console.log('News fetched')
  //     console.log(news)
  //   } else if (newsState.type === NEWS_NOT_FETCHED) {
  //     // show error
  //     setLoading(false)
  //   } else {
  //     // show unknown error
  //     setLoading(false)
  //   }
  // })

  return (
    <Box sx={{ margin: 1 }}>
      {
        props.news.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 3, sm: 3, md: 3 }} sx={{ maxWidth: 'lg' }}>
              {

                props.news.slice(0, 6).map((item, index) => {
                  const dateObj = new Date(Date.parse(item.date))
                  const dateStr = dateObj.toDateString()
                  return (
                    <Grid
                    key={index}
                    item xs={4}
                    sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ImportantNews
                        title={item.title}
                        image_url={item.image_url}
                        url={item.url}
                        source={item.source}
                        date={dateStr}
                      />
                    </Grid>
                  )
                }
                )
              }
            </Grid>
            {/* <Box sx={{ display: 'flex', width: '100%', margin: 3, justifyContent: 'center' }}>
              <UtilityActionButton
                sx={{ backgroundColor: 'primary.main' }}
                onClick={() => props.onReadMoreClicked(props.term)}
              >More news about {props.term}</UtilityActionButton>
            </Box> */}
          </Box>
        )
      }
    </Box>
  )
}

WatchingNewsSection.propTypes = {
  // term: PropTypes.string.isRequired,
  onReadMoreClicked: PropTypes.func,
  news: PropTypes.array
}

export default React.memo(WatchingNewsSection)
