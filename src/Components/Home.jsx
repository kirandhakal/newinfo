import React, { useEffect, useState } from "react";
import "./Home.css"; 


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload(); // Reload to reset state
}




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
  const [user, setUser] = useState({ name: "", email: "", id: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
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
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-heading">
          Hello, {user.name ? user.name : "Guest"} Welcome to the team
        </h1>
        {user.email && (
          <p className="home-text">
            You’re logged in as <strong>{user.email}</strong>
          </p>
        )}
        {!user.name && (
          <p className="home-text">
            Please <a href="/login">log in</a> to access your dashboard.
          </p>
        )}
         <button className="logout-button" onClick={handleLogout}>logout</button>
      </div>
     
    </div>
  );
};

export default Home;
