import React from 'react';
import { Navigate } from 'react-router-dom';
import UnauthorizedAccess from './errorpage'; 

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); 
  return { token, userRole };
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, userRole } = checkAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <UnauthorizedAccess />;
  }

  return children;
};

export default ProtectedRoute;
