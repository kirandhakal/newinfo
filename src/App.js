import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import AllUser from './Components/AllUser';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import Main from './Components/Main';


function App() {

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in
  if (!token) {
    return <Navigate to="/Login" />; // redirect to login if not authenticated
  }
  
  return children; // show the page if authenticated
};


  return (



    <Router>
      <NavBar />
      <div className="App">
        <Routes>
       
          <Route path ="/Login" element={<Login />} />
           <Route path ="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
        
 <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <AllUser  />
            </ProtectedRoute>
          } 
        />


          {/* <Route path="/users" element={<AllUser isAdmin={true} />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
