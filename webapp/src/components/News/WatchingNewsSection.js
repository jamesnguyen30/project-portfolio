import React from 'react'
import { Grid, Box } from '@mui/material'
import ImportantNews from './ImportantNews'
import PropTypes from 'prop-types'

const WatchingNewsSection = (props) => {
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
          </Box>
        )
      }
    </Box>
  )
}

WatchingNewsSection.propTypes = {
  onReadMoreClicked: PropTypes.func,
  news: PropTypes.array
}

export default React.memo(WatchingNewsSection)
