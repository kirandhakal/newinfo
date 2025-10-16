import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isHydrated, setIsHydrated] = useState(false);

  const getAuthStatus = () => {
    const token = sessionStorage.getItem("token");
    return !!token;
  };

  const getAdminStatus = () => {
    const token =  sessionStorage.getItem("token");
    console.log("Admin check, token:", token);
    return token === "admin-token"; //  Check for admin token
  };

  useLayoutEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(getAuthStatus());
      setIsAdmin(getAdminStatus()); //  Set admin status
      setIsHydrated(true);
    };

    checkAuth();

    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [location.pathname]);

  const handleNavbar = () => navigate("/home"); 
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleUsers = () => navigate("/users");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    setIsAdmin(false); //  Reset admin status
    window.dispatchEvent(new Event("authChange"));
    navigate("/login", { replace: true });
  };

  // Skip rendering until we know the real state (no flicker)
  if (!isHydrated) return null;

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={handleNavbar}>
        <h2 className="logo">InfoCare123</h2>
      </div>

      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            {/* 👈 HOME LINK - All logged-in users */}
            <li onClick={handleNavbar}>Home</li>
            
            {/* 👈 USERS LINK - ADMIN ONLY */}
            {/* {isAdmin && <li onClick={handleUsers}>Users</li>} */}
            
            <li onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={handleLogin}>Login</li>
            <li onClick={handleSignup}>Signup</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;