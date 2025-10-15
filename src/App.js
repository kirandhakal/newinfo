import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import AllUser from './Components/AllUser';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  // Updated ProtectedRoute - now checks for admin token for /users route
  const ProtectedRoute = ({ children, isAdminRoute = false }) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return <Navigate to="/Login" />;
    }

    // For admin routes, check if token is admin-token
    if (isAdminRoute && token !== "admin-token") {
      return <Navigate to="/Home" />; // Redirect regular users to Home
    }
 
    return children;
  };

  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          
          <Route 
            path="/Home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        
          <Route 
            path="/users" 
            element={
              <ProtectedRoute isAdminRoute={true}> {/* Admin only */}
                <AllUser />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;