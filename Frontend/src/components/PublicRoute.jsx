import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;
