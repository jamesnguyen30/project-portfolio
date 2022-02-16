import { React } from 'react'
import NavBar from './components/nav/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './views/Auth/LoginPage'
import SignupPage from './views/Auth/SIgnupPage'
import PlayGround from './views/HomePage/PlayGround'
import ProfilePage from './views/Profile/ProfilePage'
import BookDetailPage from './views/Books/BookDetailPage'
import HomePage from './views/HomePage/HomePage'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<PlayGround />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/home" element={<App />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/book" element={<BookDetailPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
