import NavBar from "./components/nav/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './views/LoginPage/LoginPage';
import SignupPage from './views/SignupPage/SIgnupPage';
import HomePage from './views/HomePage/HomePage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<App />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
