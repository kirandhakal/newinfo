import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // ---------------------- LOGIN HANDLER ----------------------
  const handleLogin = async (e) => {
    e.preventDefault();

   
    try {
      // ------------------ Admin login ------------------
      if (email === "admin@gmail.com" && password === "admin") {
        sessionStorage.setItem("token", "admin-token");
        localStorage.setItem("token", "admin-token");

        console.log(" Admin logged in");
        navigate("/users");
        return;
      }

      // ------------------ Normal user login ------------------
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("email", email);
        localStorage.setItem("token", data.token);

        localStorage.setItem("email", email);
        console.log(" User login successful:", data);
        setMessage("Login successful");
        navigate("/home");
      } else {
        setMessage(data.message || "ll-Invalid credentials ");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("login-invalid credentials.");
    }

 

  };

  //-----------------handle Remember Me -----------------
  //  const handleRememberMe = (checked) => {
  //   setRememberMe(checked);
  //   if (!checked) {
  //     // User wants to be remembered → store in localStorage
  //     // localStorage.setItem("token", data.token);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("rememberMe", "true");
  //     console.log(" Remember Me checked - storing email in localStorage");
  //   }
  // };
   useEffect(() => {
    const remembered = localStorage.getItem("rememberMe") === "true";
    setRememberMe(remembered);
    if (remembered) {
      const storedEmail = localStorage.getItem("email") || "";
      setEmail(storedEmail);
    }
  }, []);

  const handleRememberMe = (checked) => {
    setRememberMe(checked);
    if (checked) {
      localStorage.setItem("email", email);
      localStorage.setItem("token", email);
      localStorage.setItem("rememberMe", "true");
      console.log(" Remember Me checked - storing email in localStorage");
    } else {
      localStorage.removeItem("email");
      sessionStorage.setItem("rememberMe", "false");
      console.log(" Remember Me unchecked - removing email from localStorage");
    }
  }


  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Welcome Back </h2>

        <form onSubmit={handleLogin} autoComplete="off">
          {/*  for Email Input */}
          <div className="input-field">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              className="form-box"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/*  for Password Input */}
          <div className="input-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="form-box"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <small
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </small>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => handleRememberMe(!rememberMe)}
            />
            <span>Remember Me</span>
          </label>

          <button type="submit" className="login-btn">
            Sign In
          </button>

          <p className="signup-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/Signup")}>Create one</span>
          </p>

          {/*  for Message  display*/}
          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
