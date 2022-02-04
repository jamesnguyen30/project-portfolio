// import NavBar from "./components/nav/Nav";
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="App">
        {/* <NavBar></NavBar> */}
        <h1>Welcome Page. Put something here</h1>

        <Link to="login">Login</Link>
        <br/>
        <Link to="signup">Signup</Link>
    </div>
  );
}

export default HomePage;
