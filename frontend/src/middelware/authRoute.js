import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check if the user has a valid token
  // return token ? element : <Navigate to="/login" />;
  return element;
};

export default AuthRoute;
