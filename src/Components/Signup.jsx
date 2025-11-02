import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [nepaliName, setNepaliName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---------- form Validation ----------
    // const nameRegex = /^[A-Za-z\s]+$/;
    // if (!nameRegex.test(name)) {
    //   setMessage("Name must contain only letters and spaces!");
    //   setTimeout(() => setMessage(""), 3000);
    //   return;
    // }

    // if (password.length < 6) {
    //   setMessage("Password must be at least 6 characters long!");
    //   setTimeout(() => setMessage(""), 3000);
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match!");
    //   setTimeout(() => setMessage(""), 3000);
    //   return;
    // }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,nepaliName, email, role, password ,confirmPassword}),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.token);
        navigate("/Login");
      } else {
        setMessage(data.message || "Signup failed");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error, please try again later.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Create Account</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-field">
             <label for="fname">enter your full name:</label><br></br>
            <input
              placeholder="Full Name"
              type="text"
              value={name}
              className="form-box"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
{/* -----------------------------------------------neplai name----------------------------------------------- */}
<div className="input-field">
   <label for="fname">nepali name:</label><br></br>
            <input
              placeholder="Full Name nepali"
              type="text"
              value={nepaliName}
              className="form-box"
              onChange={(e) => setNepaliName(e.target.value)}
              required
            />
          </div>
 <label for="fname">enter your email </label><br></br>
          <div className="input-field">
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="form-box"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
 <label for="fname">enter your role </label><br></br>
          <div className="input-field">
            <input
              placeholder="Role"
              type="text"
              value={role}
              className="form-box"
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
 
          {/* Password -----------------------------------------------*/}
          <div className="input-field password-field">
             <label for="fname">First your password</label><br></br>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
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

          {/* Confirm Password */}
          <div className="input-field password-field">
             <label for="fname">Confirm Password</label><br></br>
            <input
              placeholder="Re-enter Password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              className="form-box"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <small
              className="toggle-password"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Hide" : "Show"}
            </small>
          </div>

          {message && <p className="message">{message}</p>}

          <button type="submit" className="login-btn">
            Sign Up
          </button>

          <p className="signup-link">
            Already a user?{" "}
            <span onClick={() => navigate("/Login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;