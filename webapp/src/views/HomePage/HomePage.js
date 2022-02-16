import { React } from 'react'
import { Typography, Grid, Box, List, ListItem, ImageList, Divider, Link } from '@mui/material'
import styles from './styles'
import ListView from '../../components/listView/ListView'
import SearchBox from '../../components/searchBox/SearchBox'
import constants from '../../constants/styles'

const HomePage = () => {
  const booksDummy = [
    { id: 1, title: 'Book 1', arthur: 'arthur 1' },
    { id: 2, title: 'Book 1', arthur: 'arthur 1' }
  ]

  const imagesDummy = [
    'https://books.google.com/books/content?id=GNnxzQEACAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE73sm8FczIXTFk1NR3ZB2_g6IsvAh4x6fF6w9pH8iHaBvXl_k6qUmmbQKzvxM0-qgF68F23hzKQ_gMOhIk5mg66Uo9n5RTfgsMN_xHwFFNtfgXn0FjuZ_50bD-pzDAsvaZoG9nkg&source=gbs_api',
    'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'http://books.google.com/books/content?id=AVVoPwAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'http://books.google.com/books/content?id=hi6SoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'http://books.google.com/books/content?id=nh0eAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
    'http://books.google.com/books/content?id=sBk9DQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'
  ]

  return (
    <Grid container spacing={2} style={{ padding: '12px' }}>
        <Grid item sm={3}>
            <Box style={styles.CommonContainer}>
                <SearchBox style={styles.SearchBar}></SearchBox>
                <Typography variant="h6">
                    <strong>Trending books (view more button)</strong>
                </Typography>
                <List>
                    {booksDummy.map(book => (
                        <ListItem key={book.id}>
                            <Box style={{ display: 'flex', flexDirection: 'row' }}>
                                <Box style={styles.BookCoverContainer}>
                                    <img
                                    width={80}
                                    src={imagesDummy[0]}/>
                                </Box>
                                <Box style={styles.BookInformationContainer}>
                                    <h3>{book.title} - display popular metric </h3>
                                    <p>{book.arthur}</p>
                                    <p>Book description goes here it may contains 2 lines ... </p>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box style={{ ...styles.CommonContainer, marginTop: constants.space.medium }}>
                <Typography variant='h6'><strong>Wanted list (open list button here)</strong></Typography>
                <ImageList cols={3} rowHeight={150}>
                        {imagesDummy.map(value => (
                            <img key={value} src={value}/>
                        ))}
                </ImageList>
            </Box>
        </Grid>

        <Grid item sm={7}>
            <ListView>
            </ListView>
        </Grid>

        <Grid item sm={2}>
            <Box style={{ backgroundColor: 'red', height: '800px' }}>
                <h1>Ads area</h1>
            </Box>
            <Box style={styles.AboutMeContainer}>
                <Divider/>
                <Typography>
                    <strong>ABOUT ME</strong>
                </Typography>
                <Link href="/#" underline="hover">LinkedIn</Link>
                <Link href="/#" underline="hover">Github</Link>
            </Box>
        </Grid>
    </Grid>
  )
}

export default HomePage
