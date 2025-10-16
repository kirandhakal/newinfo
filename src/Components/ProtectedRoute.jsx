import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const token = localStorage.getItem("token");
  // Check if user is not admin
  if (!isAdmin && token !== "admin-token") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
