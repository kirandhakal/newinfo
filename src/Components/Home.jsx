import React, { useEffect, useState } from "react";
import "./Home.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import NavBar from "./NavBar";
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
 

  const [user, setUser] = useState({ name: "", nepaliName: "", email: "", id: "" });

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn(" No token found in localStorage.");
      return;
    }

const decodeJWT = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    // Decode base64 safely for UTF-8 characters
    const decodedString = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(decodedString);
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};



    const decoded = decodeJWT(token);
    console.log("Decoded JWT data:", decoded);

    if (decoded) {
      setUser({
        id: decoded.id || "",
        name: decoded.name || "",
        nepaliName: decoded.nepaliName || "",
        email: decoded.email || "",
      });
    }
  }, []);


  const currentLanguage = localStorage.getItem("language") || "np";

const displayName =
  currentLanguage === "np"
    ? user.nepaliName || user.name || "Admin"
    : user.name || "Admin";

// const [currentLanguage, setCurrentLanguage] = useState();
// currentLanguage = localStorage.getItem("language")

//   const displayName = currentLanguage === "en"
//     ? user.nepaliName || user.name || "Admin"
//     : user.name || "Admin";


  return (
    <>
      {/* <NavBar /> */}
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-heading">
            {t("welcome")},
            {displayName}
            {/* {user.name ? user.name : "Admin"} */}
             ,{t("team")}
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
          
        </div>
      </div>
    </>
  );
};

export default Home;
