// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  // Check if user is not admin
  if (!isAdmin) {
    return <Navigate to="/login" replace />; 
  }

  return children;
};

export default ProtectedRoute;
