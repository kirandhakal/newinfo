import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //------------------------ If users is already logged in, redirect away from /login to localhost:3000/-------
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // const token = sessionStorage.getItem("token");

  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //  ----------------------------Admin login------------
      if (email === "admin@gmail.com" && password === "admin") {
        sessionStorage.setItem("token", "admin-token");
        localStorage.setItem("token", "admin-token");
        console.log("Admin logged in");
        navigate("/users");
        console.log("navigate to users");
        return;
      }

      // ------------------------- Normal user login---------------------
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);
        // sessionStorage.setItem("user", JSON.stringify(data.user));
        console.log("User login successful:", data);
        setMessage("Login successful");
        navigate("/home");
      } else {
        setMessage(data.message || "Invalid credentials");
        setTimeout(() => {
          setMessage("");
        }, 3000); // Clear message after 3 seconds

        // alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Server error, try again later");
      // alert("Server error, try again later");
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
          {/* <button className="remember-me" type="button">
            Remember me
          </button> */}
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
