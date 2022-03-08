import { React, useState, useEffect } from 'react'
import {
  Grid, Avatar, Paper, Box, Typography,
  Stack, Chip,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
  Link
} from '@mui/material'
import { ProfilePageStyle } from './styles'
import { getProfile } from '../../api/profile'
import { getBooksByIds } from '../../api/books'
import { getDateDifference } from '../../utils/date'

const ProfilePage = () => {
  const [displayName, setDisplayName] = useState('Display name')
  const [email, setEmail] = useState('sample@email.com')
  const [changes, setChanges] = useState(false)
  const [favorites, setFavorites] = useState([])

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

  useEffect(() => {
    getProfile().then(data => {
      if (data.favorites != null && data.favorites.length > 0) {
        getBooksByIds(data.favorites).then(response => {
          for (let i = 0; i < data.favorites.length; i++) {
            data.favorites[i].book = response.data[i]
          }
          setFavorites(data.favorites)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <Grid container>
      <Grid item xs={0} sm={1} md={2} />
      <Grid item sm={10} md={8} sx={{ flex: 1, padding: { xs: '12px' } }}>
        <Box sx={ProfilePageStyle.InfoContainer}>
          <Avatar src="https://www.aceshowbiz.com/images/photo/the_rock.jpg"
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
                      <TableCell>Genre</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Time on shelf</TableCell>
                      <TableCell>Finished?</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      favorites.map((favorite, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <img width="60" src={favorite.book.volumeInfo.imageLinks.smallThumbnail}/>
                          </TableCell>
                          <TableCell>
                            {favorite.book.volumeInfo.title}
                          </TableCell>
                          <TableCell>
                            {favorite.book.volumeInfo.authors}
                          </TableCell>
                          <TableCell>
                            {favorite.book.volumeInfo.categories[0].split('/')[0]}
                          </TableCell>
                          <TableCell>
                            {favorite.book.volumeInfo.averageRating ?? 'No Rating'}
                          </TableCell>
                          <TableCell>
                            {getDateDifference(new Date(favorite.createdOn), new Date())}
                          </TableCell>
                          <TableCell>
                            {favorite.finished ? 'Yes' : 'No'}
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
