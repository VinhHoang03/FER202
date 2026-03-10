import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const PrivateRoute = ({ children }) => {
  const { state } = useAppContext();
  return state.currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
