import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Main from "./Components/Main";
import Home from "./Components/Home";
import AllUser from "./Components/AllUser";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";
import Mainchild from "./Components/Mainchild";
import NotFound from "./Components/NotFound";
import Test from "./Components/Test";
import TestTwo from "./Components/TestTwo";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check session on load
  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    return children;
  };

  return (
    <Router>
      <NavBar />
      <Footer />

      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/nested/*">
          <Route path="test" element={<Test />} />
          <Route path="test2" element={<TestTwo />} />
            <Route path="*" element={<NotFound/>}/>
        </Route>
        
        <Route path="/main/mainchild" element={<Mainchild />} />


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


<Route path="/" element={<Main />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AllUser />
              </ProtectedRoute>
            }
          />
              <Route path="*" element={<NotFound/>}/>
        </Routes>
        
        
        
    </Router>
  );
}

export default App;
