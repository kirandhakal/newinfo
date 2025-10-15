import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 👈 NEW: Admin flag
  const [isHydrated, setIsHydrated] = useState(false);

  const getAuthStatus = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return !!token;
  };

  const getAdminStatus = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token === "admin-token"; // 👈 Check for admin token
  };

  useLayoutEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(getAuthStatus());
      setIsAdmin(getAdminStatus()); // 👈 Set admin status
      setIsHydrated(true);
    };

    checkAuth();

    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [location.pathname]);

  const handleNavbar = () => navigate("/Home"); // 👈 Fixed: Go to /Home, not /
  const handleLogin = () => navigate("/Login");
  const handleSignup = () => navigate("/Signup");
  const handleUsers = () => navigate("/users"); // 👈 NEW: Users link

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    setIsAdmin(false); // 👈 Reset admin status
    window.dispatchEvent(new Event("authChange"));
    navigate("/Login", { replace: true });
  };

  // Skip rendering until we know the real state (no flicker)
  if (!isHydrated) return null;

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={handleNavbar}>
        <h2 className="logo">InfoCare</h2>
      </div>

      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            {/* 👈 HOME LINK - All logged-in users */}
            <li onClick={handleNavbar}>Home</li>
            
            {/* 👈 USERS LINK - ADMIN ONLY */}
            {isAdmin && <li onClick={handleUsers}>Users</li>}
            
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