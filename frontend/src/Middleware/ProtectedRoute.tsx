import type { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
 
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/Signin" replace />;
  }


  //I WILL ADD USER TYPE LATER ON FOR NOW ITS LIKE THIS CAUSE IM TOO FUCKING LAZY...//
  const currentPath = window.location.pathname;
  if (currentPath === "/Admin")
  {
    alert ("User not allowed");
    return <Navigate to="/Home" replace />;
  }

  

  return children;
};

export default ProtectedRoute;