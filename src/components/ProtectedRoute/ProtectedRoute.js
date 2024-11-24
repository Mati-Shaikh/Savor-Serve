import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("token");
  
  // Redirect to login if token is not present
  return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
