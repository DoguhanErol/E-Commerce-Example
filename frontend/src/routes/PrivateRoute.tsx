import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";
// import { useAuthStatus } from "../context/AuthContext";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const {isLoggedIn} = useAuthContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
