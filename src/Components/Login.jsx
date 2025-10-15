import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fixed: Redirect based on user type, not to "/"
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (token === "admin-token") {
        navigate("/users"); // Admin goes to users
      } else {
        navigate("/Home"); // Regular user goes to Home
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Admin login
      if (email === "admin@gmail.com" && password === "admin") {
        localStorage.setItem("token", "admin-token");
        console.log("Admin logged in");
        setMessage("Admin login successful");
        navigate("/users");
        return;
      }

      // Normal user login
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        console.log("User login successful:", data);
        setMessage("Login successful");
        navigate("/Home");
      } else {
        setMessage(data.message || "Invalid credentials");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Server error, try again later");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container login-container">
      <div className="box">
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            className="form-box"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            className="form-box"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit">Login</button>
          <button
            className="login-button-signup"
            type="button"
            onClick={() => navigate("/Signup")}
          >
            Create an account
          </button>
        
          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;