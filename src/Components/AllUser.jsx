import React, { useEffect, useState } from "react";
import "./AllUser.css";
import { useNavigate } from "react-router-dom";

const AllUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Logout handler
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage( "User deleted successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        // Refresh the list after deletion
        setUsers(users.filter((u) => u.id !== id));
      } else {
        setMessage("Failed to delete user.");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="alluser-container">
      <h2>All Users</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              {/* <td>{u.id}</td> */}
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button className="logout-button" onClick={handleLogout}>
        Logout
      </button> */}
      {message && <p className="action-message">{message}</p>}
    </div>
  );
};

export default AllUser;
