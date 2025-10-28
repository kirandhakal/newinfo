import React, { useEffect, useState } from "react";
import "./Home.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import { useNavigate } from "react-router-dom";

const decodeJWT = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (err) {
    console.error(" Failed to decode token:", err);
    return null;
  }
};

const Home = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (!storedLang) {
      setShowPopup(true);
    } else {
      i18next.changeLanguage(storedLang);
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    i18next.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setShowPopup(false);
  };


  const [user, setUser] = useState({ name: "", email: "", id: "" });

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn(" No token found in localStorage.");
      return;
    }

    const decoded = decodeJWT(token);
    console.log("Decoded JWT data:", decoded);

    if (decoded) {
      setUser({
        id: decoded.id || "",
        name: decoded.name || "",
        email: decoded.email || "",
      });
    }
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-heading">
            {t("welcome")}, {user.name ? user.name : "Admin"} ,{t("team")}
          </h1>
          {user.email && (
            <p className="home-text">
              {t("message") },{<strong>{user.email}</strong> }
              {/* You’re logged in as <strong>{user.email}</strong> */}
            </p>
          )}
          {!user.name && (
            <p className="home-text">
              {/* Please <a href="/login">log in</a> to access your dashboard. */}
            </p>
          )}
          {/* <button className="logout-button" onClick={handleLogout}>logout</button> */}
        </div>
      </div>
    </>
  );
};

export default Home;
