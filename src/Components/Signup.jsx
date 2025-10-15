import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---------- form Validation ----------
    const nameRegex = /^[A-Za-z\s]+$/; 

    if (!nameRegex.test(name)) {
      setMessage("Name must contain only letters and spaces — no numbers or symbols!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
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
    <div className="container">
      <div className="box">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            type="text"
            className="form-box"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            type="email"
            className="form-box"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Role"
            value={role}
            className="form-box"
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            className="form-box"
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && <p className="action-message">{message}</p>}

          <button type="submit">Sign Up</button>
          <button
            type="button"
            className="login-button-signup"
            onClick={() => navigate("/Login")}
          >
            Already a user? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
