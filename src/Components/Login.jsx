import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

     if (email === "admin@gmail.com" && password === "admin") {
  localStorage.setItem("token", "admin-token");
  console.log('hello');
  console.log('hello');
  
  // setIsLoggedIn(true);
  setTimeout(() => navigate("/users"), 100); 
  return;
}


      // Otherwise, go through backend authentication
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
        navigate("/Home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
    <div className="container login-container">
      <div className="box">
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
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
      </form>
    </div>
    </div>
    </>
  );
};

export default Login;