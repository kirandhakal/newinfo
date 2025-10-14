import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // redirects to Home.jsx
  };

const handleNavbar = () => {
  navigate("/");
};
const handleSignup = () => {
  navigate("/signup");
}
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/Home");
  // };
  return (
    <>
      <nav className="navbar">
        <div className="nav-right">
          <button className="nav-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={handleSignup}>
            Signup
          </button>
        </div>
       {/* <div className="nav-right">
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        </div> */}
      
        <div className="nav-left">
           <button className="nav-btn" onClick={handleNavbar}>
            info care
          </button>
        </div> 
      </nav>
      <div className="main-heading">
        <h1>Welcome to Information Care</h1>
      </div>
    </>
  );
};

export default NavBar;
