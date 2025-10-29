import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  // Auth checkers
  const getAuthStatus = () => !!sessionStorage.getItem("token");
  const getAdminStatus = () =>
    sessionStorage.getItem("token") === "admin-token";

  useLayoutEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(getAuthStatus());
      setIsAdmin(getAdminStatus());
      setIsHydrated(true);
    };
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [location.pathname]);

  // Language toggle handler
  const toggleLanguage = () => {
    const newLang = language === "en" ? "np" : "en";
    setLanguage(newLang);
    i18next.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  // Navigation handlers
  const handleNavbar = () => navigate("/home");
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleUsers = () => navigate("/users");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login", { replace: true });
  };

  if (!isHydrated) return null;

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={handleNavbar}>
        <h2 className="logo">InfoCare</h2>
      </div>

      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li onClick={handleNavbar}>{t("Home") || "Home"}</li>
            {isAdmin && <li onClick={handleUsers}>{t("users") || "Users"}</li>}
            <li onClick={handleLogout}>{t("logout") || "Logout"}</li>
          </>
        ) : (
          <>
            <li onClick={handleLogin}>{t("login") || "Login"}</li>
            <li onClick={handleSignup}>{t("signup") || "Signup"}</li>
          </>
        )}

        <li>
          <button className="lang-toggle-btn" onClick={toggleLanguage}>
            {language === "en" ? "np" : "en"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
