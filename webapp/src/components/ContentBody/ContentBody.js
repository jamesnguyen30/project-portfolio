import { styled } from '@mui/material/styles'

const ContentBody = styled('main')(({ theme, open, marginTop, marginLeft }) => ({
  flex: 1,
  marginTop: marginTop,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

export default ContentBody
