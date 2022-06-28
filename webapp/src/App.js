import { React } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SigninPage from './views/Auth/SigninPage'
import SignupPage from './views/Auth/SIgnupPage'
// import Playground from './views/Playground/Playground'
// import ProtectedPlayground from './views/Playground/index'
import AboutPage from './views/About/AboutPage'
import Home from './views/Home/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0080FF',
      darkGreen: '#40916c',
      green: '#43AA8B',
      red: '#F94144',
      darkBlack: '#303133',
      black: '#3C3D3F',
      white: '#FFFFFF',
      darkPurple: '#684aff',
      purple: '#9580ff'
    },
    secondary: {
      main: '#F15156',
      green: '#7BD7BB',
      red: '#FF989A',
      black: '#56575B',
      white: '#FAFAFA',
      gray: '#e0e0e0',
      lightGray: '#f0f0f0'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  },
  sizes: {
    space: {
      tiny: '8px',
      small: '10px',
      medium: '12px',
      large: '15px',
      xlarge: '20px',
      xxlarge: '25px',
      xxxlarge: '32px'
    },
    fontSize: {
      tiny: '8pt',
      small: '10pt',
      medium: '12pt',
      large: '14pt',
      xlarge: '16pt',
      xxlarge: '18pt',
      xxxlarge: '24pt'
    },
    borderRadius: {
      tiny: '3px',
      small: '5px',
      medium: '8px',
      large: '12px'
    }
  }
})

function App () {
  console.log('current folder ' + __dirname)
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
