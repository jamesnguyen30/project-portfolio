import { React, useState } from 'react'
import {
  Grid, Avatar, Paper, Box, Typography,
  Stack, Chip, Divider,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
  Link
} from '@mui/material'
import { ProfilePageStyle } from './styles'

const books = [
  {
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
    title: 'Memory',
    author: 'Angelina Aludo',
    rating: 4.3,
    yourRecaps: 3,
    timeOnShelf: '12 days',
    finished: true
  },
  {
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
    title: 'Memory',
    author: 'Angelina Aludo',
    rating: 4.3,
    yourRecaps: 3,
    timeOnShelf: '12 days',
    finished: true
  },
  {
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
    title: 'Memory',
    author: 'Angelina Aludo',
    rating: 4.3,
    yourRecaps: 3,
    timeOnShelf: '12 days',
    finished: true
  },
  {
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
    title: 'Memory',
    author: 'Angelina Aludo',
    rating: 4.3,
    yourRecaps: 3,
    timeOnShelf: '12 days',
    finished: true
  },
  {
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
    title: 'Memory',
    author: 'Angelina Aludo',
    rating: 4.3,
    yourRecaps: 3,
    timeOnShelf: '12 days',
    finished: true
  },
  {
    thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564',
    title: 'Memory',
    author: 'Angelina Aludo',
    rating: 4.3,
    yourRecaps: 3,
    timeOnShelf: '12 days',
    finished: true
  }
]

const ProfilePage = () => {
  const [displayName, setDisplayName] = useState('Display name')
  const [email, setEmail] = useState('sample@email.com')
  const [changes, setChanges] = useState(false)

  const updateDisplayName = (value) => {
    console.log(value)
    setDisplayName(value)
    setChanges(true)
  }

  const saveChangesClicked = () => {
    // save changes logic here
    setChanges(false)
  }

  const onEmailChanged = (event) => {
    setEmail(event.target.value)
    setChanges(true)
  }

  return (
    <Grid container>
      <Grid item xs={0} sm={1} md={2} />
      <Grid item sm={10} md={8} sx={{ flex: 1, padding: { xs: '12px' } }}>
        <Box sx={ProfilePageStyle.InfoContainer}>
          <Avatar src="https://avatarfiles.alphacoders.com/952/95227.jpg"
            sx={{ width: 100, height: 100 }} component={Paper} elevation={10}></Avatar>
          <Stack spacing={1} style={ProfilePageStyle.InfoStack}>
            <div>
              <Typography
                variant="h3"
                component="input"
                value={displayName}
                style={{ border: '0px' }}
                onChange={(event) => {
                  updateDisplayName(event.target.value)
                }}
              ></Typography>
            </div>

            <Typography
              variant="body1"
              component="input"
              value={email}
              style={{ border: '0px' }}
              onChange={onEmailChanged}
              ></Typography>

            <div>
              <Chip label="verified" color='success' />
            </div>
            {
              changes && <button onClick={saveChangesClicked}>Save changes</button>
            }
          </Stack>
        </Box>
        <Divider />
        <Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={2}>
              <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>Bookshelf</Typography>
              <Stack sx={{ direction: { sm: 'row', md: 'column' } }}>
                <Typography component={Link} onClick={() => console.log('Cliekd menu 1')} underline={'hover'}>
                  Favorites
                </Typography>
                <Typography component={Link} onClick={() => console.log('Cliekd menu 1')} underline={'hover'}>
                  Wanted
                </Typography>
                <Typography component={Link} onClick={() => console.log('Cliekd menu 1')} underline={'hover'}>
                  My recaps
                </Typography>
                <Typography component={Link} onClick={() => console.log('Cliekd menu 1')} underline={'hover'}>
                  Drafts
                </Typography>
              </Stack>
            </Grid>
            <Grid item sm={12} md={10}>
              <TableContainer>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cover</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Your recaps</TableCell>
                      <TableCell>Time on shelf</TableCell>
                      <TableCell>Finished?</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      books.map((book, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <img width="60" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564" />
                          </TableCell>
                          <TableCell>
                            Memory something book
                          </TableCell>
                          <TableCell>
                            Arthur Morgan
                          </TableCell>
                          <TableCell>
                            4.3
                          </TableCell>
                          <TableCell>
                            3
                          </TableCell>
                          <TableCell>
                            12 day
                          </TableCell>
                          <TableCell>
                            Finished
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>

                </Table>
              </TableContainer>

            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={0} sm={1} md={2} />
    </Grid>)
}

export default ProfilePage
