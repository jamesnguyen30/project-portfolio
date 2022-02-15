import { React } from 'react'
import NavBar from './components/nav/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './views/Auth/LoginPage'
import SignupPage from './views/Auth/SIgnupPage'
import HomePage from './views/HomePage/HomePage'
import ProfilePage from './views/Profile/ProfilePage'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<App />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
