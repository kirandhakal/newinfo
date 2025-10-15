import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // 👈 new flag

  const getAuthStatus = () =>
    !!(localStorage.getItem("token") || sessionStorage.getItem("token"));

  useLayoutEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(getAuthStatus());
      setIsHydrated(true); // ✅ now ready to render
    };

    checkAuth(); // run instantly

    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [location.pathname]);

  const handleNavbar = () => navigate("/");
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login", { replace: true });
  };

  // 👇 Skip rendering until we know the real state (no flicker)
  if (!isHydrated) return null;

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={handleNavbar}>
        <h2 className="logo">InfoCare</h2>
      </div>

      <ul className="nav-links">
        {isLoggedIn ? (
          <li onClick={handleLogout}>Logout</li>
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
