import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectedRoute;
