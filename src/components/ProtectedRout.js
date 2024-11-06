import React from 'react';
import { Navigate } from 'react-router-dom';
import { appTokenLabel } from 'src/api/axiosInstance';
import {jwtDecode} from "jwt-decode";

// Fonction utilitaire pour vérifier si le token est expiré
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
};

// Protection des Routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(appTokenLabel);
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem(appTokenLabel);
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
