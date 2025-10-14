import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AllUser from './Components/AllUser';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (

    <Router>
          <NavBar />
      <div className="App">
        <Routes>
       
          <Route path ="/Login" element={<Login />} />
           <Route path ="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/users" element={<AllUser isAdmin={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
