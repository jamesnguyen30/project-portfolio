import { React, useState, useEffect } from 'react'
import {
  Typography, Box, Collapse, Grid, Tabs,
  Tab, Divider, Breadcrumbs, Link, Stack, Chip
} from '@mui/material'
// import { bookDetail } from '../../api/playground/detailBook'
import { getBookById } from '../../api/books'
import { DetailPageStyle } from './styles'
import TabPanel from '../HomePage/TabPanel'
import PostList from '../../components/post/PostList'
import PropTypes from 'prop-types'

const DetailPage = (props) => {
  const { bookid } = props
  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState({})
  const [expand, setExpand] = useState(true)

  const [recapPage, setRecapPage] = useState(0)

  const recapPageChange = (event, newValue) => {
    setRecapPage(newValue)
  }

  const onChipClicked = () => {
    console.log('clicked chip')
  }

  useEffect(() => {
    console.log('rendered')
    if (loading) {
      getBookById(bookid).then(response => {
        const data = {}
        data.title = response.data.volumeInfo.title
        data.subtitle = response.data.volumeInfo.subtitle
        data.arthors = response.data.volumeInfo.authors
        data.categories = response.data.volumeInfo.categories
        data.description = response.data.volumeInfo.description
        data.thumbNailUrl = response.data.volumeInfo.imageLinks.thumbnail
        data.posts = response.data.posts
        console.log(response.data)
        setBook(data)
        setLoading(false)
      }).catch(err => {
        console.log('Error: ' + err)
        // setError('Unknown error')
      })
    }
  }, [])

  return (
    <Box>
      <Typography>
        Detail Page
      </Typography>
      {!loading && (
        <Grid container spacing={1}>
          <Grid item xs = {12}>
            <Box style={DetailPageStyle.BookCoverContainer}>
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px' }}>
                <img src={book.thumbNailUrl}/>
              </Box>
              <Box style={DetailPageStyle.BookInformationContainer}>
                <Typography variant='h6'>
                  <strong>{book.title}</strong>
                </Typography>
                <p>{book.subtitle}</p>
                <p>by {book.arthors}</p>
                <Collapse
                  in ={expand}
                  collapsedSize={0}
                >
                  <p>{book.description}</p>
                </Collapse>
                <button onClick={() => setExpand(!expand)}>Description</button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs = {12}>
            <Divider/>
            <Box>
              <Tabs value={recapPage} onChange={recapPageChange}>
                <Tab label={'Recap'}/>
                <Tab label={'Community'}/>
              </Tabs>
            </Box>

            <TabPanel value={recapPage} index={0}>
              <Stack direction="row" spacing={1} style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '12px' }}><strong>Filter by:</strong></p>
                <Breadcrumbs separator=" | ">
                  <Link underline="hover" color="inherit" active>Best</Link>
                  <Link underline="hover" color="inherit">Most recent</Link>
                  <Link underline="hover" color="inherit">Most comments</Link>
                </Breadcrumbs>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip variant="outlined" label="Chapter 1" onClick={onChipClicked}/>
                <Chip variant="outlined" label="Chapter 2" onClick={onChipClicked}/>
                <Chip variant="outlined" label="Chapter 3" onClick={onChipClicked}/>
                <Chip variant="outlined" label="Chapter 4" onClick={onChipClicked}/>
                <Chip variant="outlined" label="Chapter 5" onClick={onChipClicked}/>
              </Stack>
              <PostList></PostList>
            </TabPanel>
            <TabPanel value={recapPage} index={1}>
              <PostList></PostList>
            </TabPanel>
          </Grid>
        </Grid>

      )}
      {loading && (
        <Typography>
          Loading ...
        </Typography>
      )}
      <Typography>
      </Typography>
    </Box>
  )
}

DetailPage.propTypes = {
  bookid: PropTypes.string.isRequired
}

export default DetailPage
