import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// import Main from "./Components/Main";
import Home from "./Components/Home";
import AllUser from "./Components/AllUser";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


function App() {
  // Updated ProtectedRoute - now checks for admin token for /users route
  const ProtectedRoute = ({ children, isAdminRoute = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, []);

    return <>{children}</>;
  };

  return (
    <Router>
      <NavBar />
{/* <Main /> */}
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />

  

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                {" "}
                {/* Admin only */}
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
