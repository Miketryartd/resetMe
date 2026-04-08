import type { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/Signin" replace />;
  }

  return children;
};

export default ProtectedRoute;