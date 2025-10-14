import React, { useEffect, useState } from "react";
import "./AllUser.css";
import { useNavigate } from "react-router-dom";

const AllUser = () => {

 const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users </h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
       <button className="logout-button" onClick={handleLogout}>logout</button>  
    </div>
   
  );
};

export default AllUser;
