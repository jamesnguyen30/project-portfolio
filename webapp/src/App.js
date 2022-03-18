import { React } from 'react'
// import NavBar from './components/nav/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './views/Auth/LoginPage'
import SignupPage from './views/Auth/SIgnupPage'
import PlayGround from './views/HomePage/PlayGround'
import ProfilePage from './views/Profile/ProfilePage'
import BookDetailPage from './views/Books/BookDetailPage'
import HomePage from './views/HomePage/HomePage'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0080FF',
      green: '#43AA8B',
      red: '#F94144',
      darkBlack: '#303133',
      black: '#3C3D3F',
      white: '#FFFFFF'
    },
    secondary: {
      main: '#F15156',
      green: '#7BD7BB',
      red: '#FF989A',
      black: '#56575B',
      white: '#FAFAFA'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  }
})

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* <NavBar></NavBar> */}
          <Routes>
            <Route path="/" element={<PlayGround />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/book" element={<BookDetailPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/playground" element={<PlayGround />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
