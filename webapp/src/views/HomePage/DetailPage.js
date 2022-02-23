import { React, useState, useEffect } from 'react'
import {
  Typography, Box, Collapse, Grid, Tabs,
  Tab, Divider, Breadcrumbs, Link, Stack, Chip, TextField,
  Button, Modal
} from '@mui/material'
// import { bookDetail } from '../../api/playground/detailBook'
import { getBookById } from '../../api/books'
import { DetailPageStyle } from './styles'
import TabPanel from '../HomePage/TabPanel'
import PostList from '../../components/post/PostList'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { createPost } from '../../api/post'

const DetailPage = (props) => {
  const { bookid } = props
  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState({})
  const [expand, setExpand] = useState(true)
  const [recapPage, setRecapPage] = useState(0)
  const [newPostModal, setNewPostModal] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      chapter: '',
      title: '',
      content: ''
    }
  })

  const onSubmit = data => {
    data.bookid = bookid
    console.log(data)
    createPost(data).then(response => console.log(response))
  }

  const recapPageChange = (event, newValue) => {
    setRecapPage(newValue)
  }

  const onChipClicked = () => {
    console.log('clicked chip')
  }

  useEffect(() => {
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
        console.log(data.posts)
        setBook(data)
        setLoading(false)
      }).catch(err => {
        console.log('Error: ' + err)
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

            <button onClick={() => setNewPostModal(true)}>Create new post</button>

            <Modal
              open={newPostModal}
              onClose={() => setNewPostModal(false)}
              style={DetailPageStyle.NewPostModal}
            >
              <Box style={DetailPageStyle.EditorContainer}>
                <div style={DetailPageStyle.PostEditorContainer}>
                  <form>
                    <h3>New post</h3>
                    <p>{errors.chapter?.message}</p>
                    <p>{errors.title?.message}</p>
                    <p>{errors.content?.message}</p>
                    <div>
                      <Controller
                        name={'chapter'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField onChange={onChange} label="Chapter/Section" style={{ backgroundColor: 'white' }} value={value}></TextField>
                        )}
                      >
                      </Controller>
                    </div>
                    <Stack spacing={1} direction="column">
                      <Controller
                        name={'title'}
                        control={control}
                        rules={{
                          required: 'Title is required'
                        }}
                        render={({ field: { onChange, value } }) => (
                          <TextField onChange={onChange} label="Title" variant='filled' value={value}></TextField>
                        )}
                      >
                      </Controller>
                      <Controller
                        name={'content'}
                        control={control}
                        rules={{
                          required: 'Body text is required'
                        }}
                        render={({ field: { onChange, value } }) => (
                          <TextField label="Body text " multiline rows={5} onChange={onChange}
                          style={{ backgroundColor: 'white' }} value={value}/>
                        )}
                      >
                      </Controller>
                    </Stack>
                    <Button onClick={handleSubmit(onSubmit)}>Post</Button>
                    <Button>Save draft</Button>
                  </form>
                </div>
              </Box>
            </Modal>

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
              {
                (book.posts != null && book.posts.length > 0) && (
                  <PostList posts={book.posts}></PostList>
                )
              }
            </TabPanel>
            <TabPanel value={recapPage} index={1}>
              <PostList posts={book.posts}></PostList>
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
