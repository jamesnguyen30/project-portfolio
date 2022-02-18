import { React, useState, useEffect } from 'react'
import { Typography, Box, Collapse, Grid } from '@mui/material'
import { bookDetail } from '../../api/playground/detailBook'
import { DetailPageStyle } from './styles'

const DetailPage = (props) => {
  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState({})
  const [expand, setExpand] = useState(true)
  //   const [error, setError] = useState(null)

  useEffect(() => {
    console.log('rendered')
    if (loading) {
      bookDetail().then(response => {
        const data = {}
        data.title = response.data.volumeInfo.title
        data.subtitle = response.data.volumeInfo.subtitle
        data.arthors = response.data.volumeInfo.authors
        data.categories = response.data.volumeInfo.categories
        data.description = response.data.volumeInfo.description
        data.thumbNailUrl = response.data.volumeInfo.imageLinks.thumbnail
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
            <h4>Best recap section</h4>
            <p>Shows most popular, most recent recaps</p>
          </Grid>
          <Grid item xs = {12}>
            <h4>Community</h4>
            <p>Trending issues and comment with up votes and down votes from community. Use Reddit ranking algorithm</p>
            <p>View can scroll down to the bottom </p>
            <p>Use pagination to simplify the code for now</p>
            <p><strong>1</strong> 2 3 4 5 6 ... 9</p>
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

export default DetailPage
