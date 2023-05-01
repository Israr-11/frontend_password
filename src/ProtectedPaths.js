import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedPaths = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const location = useLocation();

  // If token exists, return an outlet that will render child elements
  // If not, return element that will navigate to login page and pass location state
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedPaths;
