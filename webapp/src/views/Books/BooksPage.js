import { React } from 'react'
import { Grid, Box } from '@mui/material'
// import styles from './styles'
import ListView from '../../components/listView/ListView'

const BooksPage = () => {
  return (
    <Grid container spacing={2} style={{ padding: '12px' }}>
        <Grid item sm={3}>
            <Box style={{ backgroundColor: 'red', height: '200px' }}>
                <h1>Search bar </h1>
                <h1>Trending books </h1>
            </Box>
            <Box style={{ backgroundColor: 'red', height: '200px' }}>
                <h1>Wanted to read (top 5 in list)</h1>
            </Box>
            <Box style={{ backgroundColor: 'red', height: '50px' }}>
                <h1>Additional features</h1>
            </Box>
        </Grid>

        <Grid item sm={7}>
            {/* <Box style={styles.MainFeed}>
                <h3>Notification center</h3>
                <h3>Upcoming events</h3>
                <h3>Updates for following content creator</h3>
            </Box> */}
            <ListView>
            </ListView>
        </Grid>

        <Grid item sm={2}>
            <Box style={{ backgroundColor: 'red', height: '300px' }}>
                <h1>Ads area</h1>
            </Box>
            <Box style={{ backgroundColor: 'red', height: '200px' }}>
                <h1>About me area</h1>
            </Box>
        </Grid>
    </Grid>
  )
}

export default BooksPage
