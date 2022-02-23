import { React } from 'react'
import { Grid, Avatar, Paper, Box, Typography, Stack, Chip } from '@mui/material'
import { ProfilePageStyle } from './styles'

const ProfilePage = () => (
    <Grid container>

        <Grid item xs ={0} sm={1} md={2}/>
        <Grid item sm={10} md={8} sx={{ flex: 1, padding: { xs: '12px' } }}>
            <Box sx={ProfilePageStyle.InfoContainer}>
                <Avatar src="https://avatarfiles.alphacoders.com/952/95227.jpg"
                sx={{ width: 100, height: 100 }} component={Paper} elevation={10}></Avatar>
                <Stack spacing={1} style={ProfilePageStyle.InfoStack}>
                    <Typography variant="h3">Display Name</Typography>
                    <Typography variant="body1">email@email.com</Typography>
                    <div>
                        <Chip label="verified" color='success'/>
                    </div>
                </Stack>
            </Box>

        </Grid>
        <Grid item xs ={0} sm={1} md={2}/>
    </Grid>
)

export default ProfilePage
