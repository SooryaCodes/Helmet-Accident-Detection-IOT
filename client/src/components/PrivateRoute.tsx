import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, isLoading } = useUserContext();

  // Show loading message until user data is loaded
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated, show the element; otherwise, redirect to login
  return user ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
