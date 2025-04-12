import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userData, loading } = useAuthContext();

  if (loading) {
    return <Loader loading={true} />;
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
