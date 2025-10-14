import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginsignup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ← initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // save JWT
        // alert('User signed up successfully!');
        navigate("/Login"); // redirect after signup
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <>
    <div className="container">
      <div className="box">
        <h2>signup form</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} className="form-box" onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} className="form-box" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Role" value={role} className="form-box" onChange={e => setRole(e.target.value)} />
        <input placeholder="Password" type="password" value={password} className="form-box" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Signup;
